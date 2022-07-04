const { registerService } = require("../services/auth");
const registerController = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Invalid data" });
  }
  try {
    const user = await registerService({ name, email, password });
    res.status(201).json({ message: "User created Successfully", user });
  } catch (error) {
    next(error);
  }
};

module.exports = { registerController };
