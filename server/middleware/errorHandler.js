export function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Something went wrong on the server',
    // Stack traces are only ever sent in development, never in production.
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  });
}
