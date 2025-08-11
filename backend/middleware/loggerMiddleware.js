const Log = require('../models/Log');

exports.logTransaction = async (req, res, next) => {
  // Log only POST requests to track changes for auditing
  if (req.method === 'POST') {
    try {
      const logEntry = new Log({
        user: req.user._id,
        route: req.originalUrl,
        method: req.method,
        body: req.body,
        timestamp: new Date(),
      });
      await logEntry.save();
    } catch (error) {
      console.error('Error saving log:', error);
      // Continue even if logging fails
    }
  }
  next();
};






