const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    let decodedData;
    if (token) {
      decodedData = jwt.verify(token, process.env.SECREAT);
      req.userId = decodedData?.id;
    }
    next();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = auth;
