const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/userSchema");

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const isUserExist = await User.findOne({ email });
    if (!isUserExist)
      return res.status(400).json({ message: "User not exist!!" });
    const isPasswdRight = await bcrypt.compare(password, isUserExist.password);
    if (!isPasswdRight)
      return res.status(400).json({ message: "Invalid Credentials" });
    const token = jwt.sign(
      { email: isUserExist.email, id: isUserExist._id },
      process.env.SECREAT,
      { expiresIn: "4hr" }
    );
    res.status(200).json({ result: isUserExist, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong " });
  }
};

exports.signup = async (req, res) => {
  const { fname, lname, email, password, confirm_Passwd } = req.body;
  try {
    const isUserExist = await User.findOne({ email });
    if (isUserExist)
      return res.status(400).json({ message: "User already exist!!" });
    if (password != confirm_Passwd)
      res.status(400).json({ message: "Password does't match" });
    const hashedPasswd = await bcrypt.hash(password, 12);
    const result = await User.create({
      name: `${fname} ${lname}`,
      email,
      password: hashedPasswd,
    });
    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.SECREAT,
      { expiresIn: "4hr" }
    );
    res.status(200).json({ result, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong " + err.message });
  }
};
