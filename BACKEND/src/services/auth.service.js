import { createUser, findUserByEmail } from "../dao/user.dao.js";
import { ConflictError } from "../utils/errorHandler.js";
import { generateWebToken } from "../utils/helper.js";
export const registerUserService = async (username, email, password) => {
  const user = await findUserByEmail(email);
  if (user) {
    throw new ConflictError("User already exists");
  }
  const newUser = await createUser({
    name: username,
    email,
    password, // In a real application, you should hash the password before saving it
  });
  const token = generateWebToken({ id: newUser._id });
  return token;
};

export const loginUserService = async (email, password) => {
  const user = await findUserByEmail(email);

  if (!user || user.password !== password) {
    throw new ConflictError("Invalid credentials");
  }
  // In a real application, you should verify the password here
  const token = generateWebToken({ id: user._id });
  return {token,user};
};
