// API Response helpers
export const sendResponse = (res, statusCode, success, message, data = null, meta = null) => {
  const response = {
    success,
    message,
    ...(data && { data }),
    ...(meta && { meta })
  };

  res.status(statusCode).json(response);
};

export const sendSuccess = (res, message, data = null, statusCode = 200, meta = null) => {
  sendResponse(res, statusCode, true, message, data, meta);
};

export const sendError = (res, message, statusCode = 400, errors = null) => {
  const response = {
    success: false,
    message,
    ...(errors && { errors })
  };

  res.status(statusCode).json(response);
};

// Pagination helper
export const getPagination = (page = 1, limit = 10) => {
  const pageNumber = Math.max(1, parseInt(page));
  const limitNumber = Math.min(100, Math.max(1, parseInt(limit))); // Max 100 items per page
  const skip = (pageNumber - 1) * limitNumber;

  return {
    page: pageNumber,
    limit: limitNumber,
    skip
  };
};

export const getPaginationMeta = (total, page, limit) => {
  const totalPages = Math.ceil(total / limit);
  
  return {
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
      nextPage: page < totalPages ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null
    }
  };
};

// Filter and sort helpers
export const buildFilter = (query) => {
  const filter = {};
  
  // Status filter
  if (query.status) {
    filter.status = query.status;
  }
  
  // Category filter
  if (query.category) {
    filter.category = query.category;
  }
  
  // Urgency filter
  if (query.urgency) {
    filter.urgency = query.urgency;
  }
  
  // Location filters
  if (query.city) {
    filter['location.city'] = new RegExp(query.city, 'i');
  }
  
  if (query.state) {
    filter['location.state'] = new RegExp(query.state, 'i');
  }
  
  // Search in title and description
  if (query.search) {
    filter.$or = [
      { title: new RegExp(query.search, 'i') },
      { description: new RegExp(query.search, 'i') }
    ];
  }
  
  // Date range filter
  if (query.dateFrom || query.dateTo) {
    filter.createdAt = {};
    if (query.dateFrom) {
      filter.createdAt.$gte = new Date(query.dateFrom);
    }
    if (query.dateTo) {
      filter.createdAt.$lte = new Date(query.dateTo);
    }
  }
  
  return filter;
};

export const buildSort = (sortBy = 'createdAt', order = 'desc') => {
  const validSortFields = ['createdAt', 'updatedAt', 'title', 'urgency', 'deadline', 'targetAmount'];
  const validOrders = ['asc', 'desc'];
  
  const sortField = validSortFields.includes(sortBy) ? sortBy : 'createdAt';
  const sortOrder = validOrders.includes(order) ? order : 'desc';
  
  return { [sortField]: sortOrder === 'desc' ? -1 : 1 };
};