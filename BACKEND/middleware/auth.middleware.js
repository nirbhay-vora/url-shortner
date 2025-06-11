import { verifyWebToken } from "../src/utils/helper.js";

export const authMiddleware = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized access, please login",
    });
  }

  try {
    const decoded = verifyWebToken(token);
    const user = decoded;
    if (!user)
      return res.status(403).json({
        success: false,
        message: "Invalid token, please login again",
      });
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: "Invalid token, please login again",
    });
  }
};
