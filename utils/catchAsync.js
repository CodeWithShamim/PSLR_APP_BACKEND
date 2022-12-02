module.exports = (fn) => (req, res, next) => {
  fn(req, res, next).catch((err) => res.send({ success: false, message: err.message })
  );
};
