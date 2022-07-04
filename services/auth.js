const { createNewUser, findUserByProperty } = require("./user");
const bcrypt = require("bcrypt");
const error = require("../utils/error");
const registerService = async ({ name, email, password }) => {
  let user = await findUserByProperty("email", email);
  if (user) throw error("User is already exist", 400);
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  console.log(hash);
  return createNewUser({ name, email, password: hash });
};
module.exports = { registerService };
