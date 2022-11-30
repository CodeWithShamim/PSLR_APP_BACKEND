const AppError = require("../utils/appError");


const sendErrorDev = (error, res) => {
  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
    stack: error.stack,
    error,
  });
};
const sendErrorProd = (error, res) => {
  // Non-Operational error: programming error
  if (!error.isOperational) {
    console.log('ERROR 💥', error);
    error.statusCode = 500;
    error.status = 'error';
    error.message = 'SOmething Went wrong! terribly!';
  }
  //else Operational error: trusted error: let client know whats wrong
  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
  });
};

const handleCastError = (error) =>
  new AppError(`Invalid ${error.path} : ${error.value}`, 400);
const handleDuplicateError = (error) => {
  const value = error.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
  return new AppError(
    `Duplicate field value ${value}. Please use another value!`,
    400
  );
};
const handleValidationError = (error) => {
  const value = Object.values(error.errors)
    .map((el) => el.message)
    .join('. ');
  return new AppError(value, 400);
};
const handleInvalidJWTError = () =>
  new AppError('Invalid token! Please login again!', 401);
const handleJWTExpiredError = () =>
  new AppError('Your token has expired! Please login again!', 401);

module.exports = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || 'error';
  const ENV = process.env.NODE_ENV;
  if (ENV === 'development') {
    sendErrorDev(error, res);
  } else if (ENV === 'production') {
    let err = error;
    if (err.name === 'CastError') err = handleCastError(err);
    if (err.code === 11000) err = handleDuplicateError(err);
    if (err.name === 'ValidationError') err = handleValidationError(err);
    if (err.name === 'JsonWebTokenError') err = handleInvalidJWTError();
    if (err.name === 'TokenExpiredError') err = handleJWTExpiredError();
    sendErrorProd(err, res);
  }
};
