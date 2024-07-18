const jwt = require("jsonwebtoken");

const authenticateUser = async (req, res, next) => {
  const { t: token } = req.cookies;
  if (!token) {
    return res.status(401).json({ msg: "authentication invalid" });
  }
  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { _id };
    next();
  } catch (err) {
    return res.status(401).json({ msg: "authentication invalid" });
  }
};

module.exports = authenticateUser;
