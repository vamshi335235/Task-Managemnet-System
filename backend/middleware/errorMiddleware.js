/**
 * Global error handler middleware
 */
const errorHandler = (err, req, res, next) => {
  // If status is 200 but and error occurs, default to 500
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    message: err.message,
    // Hide stack trace in production for security
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = { errorHandler };
