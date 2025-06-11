import { nanoid } from "nanoid";
import { cookieConfig } from "../config/config.js";
import jwt from "jsonwebtoken";

export const generateNanoId = (length) => {
  return nanoid(length);
};

export const generateWebToken =  (payload) => {
  return jwt.sign(payload , process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

export const verifyWebToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid token");
  }
}
