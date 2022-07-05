const authService = require("../services/auth");
/**
 *
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns new created user
 */
const registerController = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Invalid data" });
  }
  try {
    const user = await authService.registerService({ name, email, password });
    res.status(201).json({ message: "User created Successfully", user });
  } catch (error) {
    next(error);
  }
};
/**
 *
 * @param {object} req
 * @param {object} res
 * @returns token for thi logged in user
 */
const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const token = await authService.loginService({ email, password });
    return res.status(200).json({ message: "Login successfully", token });
  } catch (error) {
    next(error);
  }
};

module.exports = { registerController, loginController };
