class AppError extends Error {
  constructor(message, statusCode = 400, details) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;

    Object.setPrototypeOf(this, new.target.prototype);
  }
}

const errorHandler = (err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
      details: err.details || null,
    });
  } else {
    console.error('Unexpected error:', {
      message: err.message,
      stack: err.stack,
      full: err,
    });

    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

export { AppError, errorHandler };
