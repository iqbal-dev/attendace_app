const User = require("../models/User");
const error = require("../utils/error");
const findUser = () => {
  return User.find();
};
const findUserByProperty = (key, value) => {
  if (key === "_id") {
    return User.findById(value);
  }
  return User.findOne({ [key]: value });
};

const createNewUser = ({ name, email, password, roles, accountStatus }) => {
  const user = new User({
    name,
    email,
    password,
    roles: roles ?? ["STUDENT"],
    accountStatus: accountStatus ?? "PENDING",
  });
  return user.save();
};
const updateUser = async (id, data) => {
  try {
    let user = await findUserByProperty("_id", id);
    if (!user) {
      throw error("User not found", 404);
    }
    return User.findByIdAndUpdate(id, { ...data }, { new: true });
  } catch (error) {}
};

module.exports = { findUserByProperty, createNewUser, findUser, updateUser };
