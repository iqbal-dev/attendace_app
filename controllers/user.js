const userService = require("../services/user");
const getUsers = async (_, res, next) => {
  try {
    const users = await userService.findUser();
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
module.exports = { getUsers };
