import shortUrl from "../model/shorturl.model.js";
import User from "../model/user.model.js";

export const findUserByEmail = async (email) => {
   
    
  const user = await User.findOne({email});
//   if (!user) {
//     throw new Error("User not found");
//   }
  return user;
};
export const findUserById = async (id) => {
   
  const user = await User.findById(id);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};
export const createUser = async (userData) => {
  const user = new User(userData);
  const savedUser = await user.save();
  return savedUser;
};

export const getAllUserUrls = async (userId) => {
  const allUrls = await shortUrl.find({ user: userId });
  if (!allUrls) {
    throw new Error("No URLs found for this user");
  }
  return allUrls;
}
