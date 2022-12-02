module.exports = (fn) => (req, res, next) => {
    fn(req, res, next).catch((err)=> res.send(err.message));
  };
  