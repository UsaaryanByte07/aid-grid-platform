import dotenv from 'dotenv';
dotenv.config();
console.log("Loaded Gemini key:", process.env.GEMINI_API_KEY ? "YES" : "NO");

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const app = express();
const PORT = 5500;

app.use(cors());
app.use(bodyParser.json());

// SQLite DB setup
let db;
(async () => {
  db = await open({
    filename: './aidgrid.db',
    driver: sqlite3.Database
  });

  // Create tables if not exist
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE,
      password TEXT,
      type TEXT,
      bloodGroup TEXT,
      verified INTEGER,
      avatar TEXT,
      location TEXT,
      lastDonation TEXT,
      hospitalName TEXT,
      licenseNumber TEXT
    );
    CREATE TABLE IF NOT EXISTS requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      hospitalId INTEGER,
      bloodGroup TEXT,
      urgency TEXT,
      patientInfo TEXT,
      unitsNeeded INTEGER,
      description TEXT,
      timePosted TEXT,
      status TEXT,
      FOREIGN KEY(hospitalId) REFERENCES users(id)
    );
    CREATE TABLE IF NOT EXISTS bootcamps (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      hospitalId INTEGER NOT NULL,
      title TEXT NOT NULL,
      date TEXT NOT NULL,
      time TEXT NOT NULL,
      venue TEXT NOT NULL,
      expectedDonors INTEGER DEFAULT 0,
      status TEXT DEFAULT 'Planning',
      createdAt TEXT,
      FOREIGN KEY(hospitalId) REFERENCES users(id)
    );
    CREATE TABLE IF NOT EXISTS responses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      requestId INTEGER NOT NULL,
      donorId INTEGER NOT NULL,
      message TEXT,
      status TEXT DEFAULT 'Pending',
      createdAt TEXT,
      FOREIGN KEY(requestId) REFERENCES requests(id),
      FOREIGN KEY(donorId) REFERENCES users(id)
    );
    CREATE TABLE IF NOT EXISTS bootcamp_registrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      campId INTEGER NOT NULL,
      donorId INTEGER NOT NULL,
      createdAt TEXT,
      UNIQUE(campId, donorId),
      FOREIGN KEY(campId) REFERENCES bootcamps(id),
      FOREIGN KEY(donorId) REFERENCES users(id)
    );
    CREATE TABLE IF NOT EXISTS appointments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      hospitalId INTEGER NOT NULL,
      donorId INTEGER NOT NULL,
      date TEXT NOT NULL,
      time TEXT NOT NULL,
      notes TEXT,
      status TEXT DEFAULT 'Booked',
      createdAt TEXT,
      FOREIGN KEY(hospitalId) REFERENCES users(id),
      FOREIGN KEY(donorId) REFERENCES users(id)
    );
  `);
})();

app.get('/', (req, res) => {
  res.send('AidGrid Backend Running');
});

// Register endpoint (already working, but make sure passwords are hashed)
app.post('/api/register', async (req, res) => {
  const { name, email, password, type, bloodGroup, location, hospitalName, licenseNumber } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.run(
      `INSERT INTO users (name, email, password, type, bloodGroup, verified, avatar, location, lastDonation, hospitalName, licenseNumber)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name || hospitalName,
        email,
        hashedPassword,
        type,
        bloodGroup || null,
        0,
        '', // avatar can be set by frontend
        location || '',
        null,
        hospitalName || null,
        licenseNumber || null
      ]
    );
    res.status(201).json({ message: 'User registered', userId: result.lastID });
  } catch (err) {
    res.status(400).json({ error: 'Email already exists or invalid data.' });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { email, password, type } = req.body;
  try {
    const user = await db.get('SELECT * FROM users WHERE email = ? AND type = ?', [email, type]);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    // Create JWT token
    const token = jwt.sign({ id: user.id, type: user.type }, 'your_jwt_secret', { expiresIn: '1d' });
    // Remove password before sending user object
    const { password: _, ...userData } = user;
    res.json({ token, user: userData });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});


// Get donor dashboard data
app.get('/api/donor/:id/dashboard', async (req, res) => {
  const userId = req.params.id;
  try {
    // Example: get user info and donation stats
    const user = await db.get('SELECT * FROM users WHERE id = ? AND type = ?', [userId, 'donor']);
    if (!user) return res.status(404).json({ error: 'Donor not found' });
    // Example: count donations (for now, just a placeholder)
    // You can add a donations table for real tracking
    res.json({
      user,
      stats: {
        totalDonations: 0,
        livesSaved: 0,
        points: 0
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get hospital dashboard data
app.get('/api/hospital/:id/dashboard', async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await db.get('SELECT * FROM users WHERE id = ? AND type = ?', [userId, 'hospital']);
    if (!user) return res.status(404).json({ error: 'Hospital not found' });
    // Get requests made by this hospital with responses count
    const requests = await db.all(`
      SELECT r.*, (
        SELECT COUNT(*) FROM responses resp WHERE resp.requestId = r.id
      ) as responses
      FROM requests r
      WHERE r.hospitalId = ?
      ORDER BY CASE r.status WHEN 'Active' THEN 0 WHEN 'Partially Fulfilled' THEN 1 ELSE 2 END, r.timePosted DESC
    `, [userId]);
    res.json({
      user,
      requests
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create a new blood request (hospital only)
app.post('/api/requests', async (req, res) => {
  const { hospitalId, bloodGroup, urgency, patientInfo, unitsNeeded, description, status } = req.body;
  try {
    const now = new Date().toISOString();
    const result = await db.run(
      `INSERT INTO requests (hospitalId, bloodGroup, urgency, patientInfo, unitsNeeded, description, timePosted, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)` ,
      [hospitalId, bloodGroup, urgency, patientInfo, unitsNeeded, description, now, status || 'Active']
    );
    res.status(201).json({ message: 'Request created', requestId: result.lastID });
  } catch (err) {
    res.status(400).json({ error: 'Invalid data' });
  }
});

// Get all live requests (for donors to view)
app.get('/api/requests', async (req, res) => {
  try {
    const requests = await db.all('SELECT * FROM requests WHERE status = ? OR status = ?', ['Active', 'Partially Fulfilled']);
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get a single request by ID
app.get('/api/requests/:id', async (req, res) => {
  try {
    const request = await db.get('SELECT * FROM requests WHERE id = ?', [req.params.id]);
    if (!request) return res.status(404).json({ error: 'Request not found' });
    res.json(request);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update a request (hospital edits fields or status)
app.patch('/api/requests/:id', async (req, res) => {
  const { id } = req.params;
  const { bloodGroup, urgency, patientInfo, unitsNeeded, description, status } = req.body;
  try {
    const existing = await db.get('SELECT * FROM requests WHERE id = ?', [id]);
    if (!existing) return res.status(404).json({ error: 'Request not found' });
    const updated = {
      bloodGroup: bloodGroup ?? existing.bloodGroup,
      urgency: urgency ?? existing.urgency,
      patientInfo: patientInfo ?? existing.patientInfo,
      unitsNeeded: unitsNeeded ?? existing.unitsNeeded,
      description: description ?? existing.description,
      status: status ?? existing.status,
    };
    await db.run(
      `UPDATE requests SET bloodGroup = ?, urgency = ?, patientInfo = ?, unitsNeeded = ?, description = ?, status = ? WHERE id = ?`,
      [updated.bloodGroup, updated.urgency, updated.patientInfo, updated.unitsNeeded, updated.description, updated.status, id]
    );
    const row = await db.get('SELECT * FROM requests WHERE id = ?', [id]);
    res.json(row);
  } catch (err) {
    console.error('Error updating request', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Donor responds to a request
app.post('/api/requests/:id/respond', async (req, res) => {
  const { id } = req.params;
  const { donorId, message } = req.body;
  if (!donorId) return res.status(400).json({ error: 'Missing donorId' });
  try {
    const now = new Date().toISOString();
    const result = await db.run(
      `INSERT INTO responses (requestId, donorId, message, createdAt) VALUES (?, ?, ?, ?)`,
      [id, donorId, message || 'I can donate', now]
    );
    const row = await db.get('SELECT * FROM responses WHERE id = ?', [result.lastID]);
    res.status(201).json(row);
  } catch (err) {
    console.error('Error creating response', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update a user's profile
app.patch('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const existing = await db.get('SELECT * FROM users WHERE id = ?', [id]);
    if (!existing) return res.status(404).json({ error: 'User not found' });
    const { name, email, location, bloodGroup, lastDonation, avatar } = req.body;
    const updated = {
      name: name ?? existing.name,
      email: email ?? existing.email,
      location: location ?? existing.location,
      bloodGroup: bloodGroup ?? existing.bloodGroup,
      lastDonation: lastDonation ?? existing.lastDonation,
      avatar: avatar ?? existing.avatar,
    };
    await db.run(
      `UPDATE users SET name = ?, email = ?, location = ?, bloodGroup = ?, lastDonation = ?, avatar = ? WHERE id = ?`,
      [updated.name, updated.email, updated.location, updated.bloodGroup, updated.lastDonation, updated.avatar, id]
    );
    const row = await db.get('SELECT * FROM users WHERE id = ?', [id]);
    if (!row) return res.status(404).json({ error: 'User not found after update' });
    const { password: _pw, ...userSafe } = row;
    res.json(userSafe);
  } catch (err) {
    console.error('Error updating user', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// List responses for a request
app.get('/api/requests/:id/responses', async (req, res) => {
  const { id } = req.params;
  try {
    const rows = await db.all(
      `SELECT resp.*, u.name as donorName, u.bloodGroup as donorBloodGroup, u.location as donorLocation
       FROM responses resp JOIN users u ON u.id = resp.donorId
       WHERE resp.requestId = ? ORDER BY resp.createdAt DESC`,
      [id]
    );
    res.json(rows);
  } catch (err) {
    console.error('Error listing responses', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Public stats for home page
app.get('/api/stats', async (req, res) => {
  try {
    const donorsRow = await db.get(`SELECT COUNT(*) as c FROM users WHERE type = 'donor'`);
    const requestsRow = await db.get(`SELECT COUNT(*) as c FROM requests WHERE status = 'Active' OR status = 'Partially Fulfilled'`);
    const campsRow = await db.get(`SELECT COUNT(*) as c FROM bootcamps`);
    // Lives saved is derived (units fulfilled x factor) - simple placeholder
    const livesSaved = (await db.get(`SELECT COALESCE(SUM(CASE WHEN status = 'Fulfilled' THEN unitsNeeded ELSE 0 END), 0) as s FROM requests`)).s * 3;
    res.json({
      activeDonors: donorsRow.c,
      ongoingRequests: requestsRow.c,
      bloodCamps: campsRow.c,
      livesSaved: livesSaved || 0
    });
  } catch (err) {
    console.error('Error fetching stats', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Public list of bootcamps (all upcoming)
app.get('/api/bootcamps', async (req, res) => {
  try {
    const rows = await db.all(`SELECT * FROM bootcamps ORDER BY date ASC, time ASC`);
    res.json(rows);
  } catch (err) {
    console.error('Error fetching bootcamps', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update bootcamp
app.patch('/api/bootcamps/:id', async (req, res) => {
  const { id } = req.params;
  const existing = await db.get('SELECT * FROM bootcamps WHERE id = ?', [id]);
  if (!existing) return res.status(404).json({ error: 'Bootcamp not found' });
  const { title, date, time, venue, expectedDonors, status } = req.body;
  const updated = {
    title: title ?? existing.title,
    date: date ?? existing.date,
    time: time ?? existing.time,
    venue: venue ?? existing.venue,
    expectedDonors: (expectedDonors ?? existing.expectedDonors),
    status: status ?? existing.status,
  };
  try {
    await db.run(
      `UPDATE bootcamps SET title = ?, date = ?, time = ?, venue = ?, expectedDonors = ?, status = ? WHERE id = ?`,
      [updated.title, updated.date, updated.time, updated.venue, updated.expectedDonors, updated.status, id]
    );
    const row = await db.get('SELECT * FROM bootcamps WHERE id = ?', [id]);
    res.json(row);
  } catch (err) {
    console.error('Error updating bootcamp', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete bootcamp
app.delete('/api/bootcamps/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.run('DELETE FROM bootcamps WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (err) {
    console.error('Error deleting bootcamp', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Register a donor for a camp
app.post('/api/bootcamps/:id/register', async (req, res) => {
  const { id } = req.params;
  const { donorId } = req.body;
  if (!donorId) return res.status(400).json({ error: 'Missing donorId' });
  try {
    const now = new Date().toISOString();
    await db.run(
      `INSERT OR IGNORE INTO bootcamp_registrations (campId, donorId, createdAt) VALUES (?, ?, ?)`,
      [id, donorId, now]
    );
    res.status(201).json({ success: true });
  } catch (err) {
    console.error('Error registering camp', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Simple search endpoints
app.get('/api/donors', async (req, res) => {
  const { q, bloodGroup, location } = req.query;
  let sql = `SELECT id, name, email, bloodGroup, location, lastDonation, avatar FROM users WHERE type = 'donor'`;
  const params = [];
  if (bloodGroup) { sql += ' AND bloodGroup = ?'; params.push(bloodGroup); }
  if (location) { sql += ' AND LOWER(location) LIKE ?'; params.push(`%${String(location).toLowerCase()}%`); }
  if (q) { sql += ' AND (LOWER(name) LIKE ? OR LOWER(email) LIKE ?)'; params.push(`%${String(q).toLowerCase()}%`, `%${String(q).toLowerCase()}%`); }
  try {
    const rows = await db.all(sql, params);
    res.json(rows);
  } catch (err) {
    console.error('Error searching donors', err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/hospitals', async (req, res) => {
  const { q, location } = req.query;
  let sql = `SELECT id, name, email, location, hospitalName, licenseNumber FROM users WHERE type = 'hospital'`;
  const params = [];
  if (location) { sql += ' AND LOWER(location) LIKE ?'; params.push(`%${String(location).toLowerCase()}%`); }
  if (q) { sql += ' AND (LOWER(name) LIKE ? OR LOWER(email) LIKE ? OR LOWER(hospitalName) LIKE ?)'; params.push(`%${String(q).toLowerCase()}%`, `%${String(q).toLowerCase()}%`, `%${String(q).toLowerCase()}%`); }
  try {
    const rows = await db.all(sql, params);
    res.json(rows);
  } catch (err) {
    console.error('Error searching hospitals', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Appointments
app.post('/api/appointments', async (req, res) => {
  const { hospitalId, donorId, date, time, notes } = req.body;
  if (!hospitalId || !donorId || !date || !time) return res.status(400).json({ error: 'Missing required fields' });
  try {
    const now = new Date().toISOString();
    const result = await db.run(
      `INSERT INTO appointments (hospitalId, donorId, date, time, notes, createdAt) VALUES (?, ?, ?, ?, ?, ?)`,
      [hospitalId, donorId, date, time, notes || '', now]
    );
    const appt = await db.get('SELECT * FROM appointments WHERE id = ?', [result.lastID]);
    res.status(201).json(appt);
  } catch (err) {
    console.error('Error creating appointment', err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/donor/:id/appointments', async (req, res) => {
  try {
    const rows = await db.all('SELECT * FROM appointments WHERE donorId = ? ORDER BY date ASC, time ASC', [req.params.id]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/hospital/:id/appointments', async (req, res) => {
  try {
    const rows = await db.all('SELECT * FROM appointments WHERE hospitalId = ? ORDER BY date ASC, time ASC', [req.params.id]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Bootcamps: list all for a hospital
app.get('/api/hospital/:id/bootcamps', async (req, res) => {
  const { id } = req.params;
  try {
    const camps = await db.all(
      'SELECT * FROM bootcamps WHERE hospitalId = ? ORDER BY date ASC, time ASC',
      [id]
    );
    res.json(camps);
  } catch (err) {
    console.error('Error fetching bootcamps:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Bootcamps: create new camp
app.post('/api/bootcamps', async (req, res) => {
  const { hospitalId, title, date, time, venue, expectedDonors, status } = req.body;
  if (!hospitalId || !title || !date || !time || !venue) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    const createdAt = new Date().toISOString();
    const result = await db.run(
      `INSERT INTO bootcamps (hospitalId, title, date, time, venue, expectedDonors, status, createdAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [hospitalId, title, date, time, venue, expectedDonors ?? 0, status || 'Planning', createdAt]
    );
    const newCamp = await db.get('SELECT * FROM bootcamps WHERE id = ?', [result.lastID]);
    res.status(201).json(newCamp);
  } catch (err) {
    console.error('Error creating bootcamp:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'No message provided' });

  try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent([message]);
    const aiReply = result.response.text();
    console.log("Gemini raw response:", aiReply);
    if (!aiReply || aiReply.trim() === "") {
      res.json({ reply: "Sorry, Gemini could not generate a response." });
    } else {
      res.json({ reply: aiReply });
    }
  } catch (err) {
    console.error("Gemini API error:", err);
    res.status(500).json({ error: 'AI service error', details: err.message });
  }
});



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
