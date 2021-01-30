module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500
  err.status = err.status || 'error'

  res.status(err.statusCode).json({
    msg: err.message,
    status: err.status,
    stack: err.stack.split("\n"),
    err: err
  })

}