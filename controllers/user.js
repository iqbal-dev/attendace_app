const userService = require("../services/user");
const authService = require("../services/auth");
const error = require("../utils/error");
const getUsers = async (req, res, next) => {
  /**
   * TODO: filter, sort, pagination, select
   */

  try {
    const users = await userService.findUsers();
    return res.status(200).json(users);
  } catch (e) {
    next(e);
  }
};
const getUserById = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await userService.findUserByProperty("_id", userId);
    if (!user) {
      throw error("User not found", 404);
    }
    /**
     * TODO: Remove user password
     */
    return res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};

const postUser = async (req, res, next) => {
  const { name, email, password, roles, accountStatus } = req.body;
  try {
    const user = await authService.registerService({
      name,
      email,
      password,
      roles,
      accountStatus,
    });
    return res.status(201).json(user);
  } catch (e) {
    next(e);
  }
};

const putUser = async (req, res, next) => {
  const { userId } = req.params;
  const { name, email, password, roles, accountStatus } = req.body;
  try {
    const user = await userService.updateUser(userId, {
      name,
      email,
      password,
      roles,
      accountStatus,
    });
    if (!user) {
      throw error("User not found", 404);
    }
    return res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};

const patchUser = async (req, res, next) => {
  const { userId } = req.params;
  const { name, roles, accountStatus } = req.body;
  try {
    const user = await userService.updateUser(userId, {
      name,
      roles,
      accountStatus,
    });
    if (!user) {
      throw error("User not found", 404);
    }
    return res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};
const deleteUserById = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await userService.findUserByProperty("_id", userId);
    if (!user) {
      throw error("User not found", 404);
    }
    await user.remove();
    return res.status(203).json({ message: "User deleted successfully" });
  } catch (e) {
    next(e);
  }
};
module.exports = {
  getUsers,
  getUserById,
  deleteUserById,
  postUser,
  putUser,
  patchUser,
};
