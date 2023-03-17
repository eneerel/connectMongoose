const logger = (req, res, next) => {
  console.log("middleware");
  req.miniiner = "Azure baina";
  next();
};

module.exports = logger;
