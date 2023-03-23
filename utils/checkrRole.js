const jwt = require("jsonwebtoken");

const checkRole = (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(401).json({ message: "ta token oo ywuulaagui baina " });
  }
  const token = req.headers.authorization.split(" ")[1];
  const user = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
  if (user.role !== "Admin") {
    res.status(400).json({ message: "Ene uildliig hiih bolomjgui baina." });
  }
  next();
};

module.exports = checkRole;
