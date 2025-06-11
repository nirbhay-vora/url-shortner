import { findUserById } from "../dao/user.dao.js";
import { verifyWebToken } from "../utils/helper.js";

export const authMiddleware =async  (req, res, next) => {
  const token = req.cookies.accessToken
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized access, please login first",
    });

  }

  try {
    // Verify the token and extract user information
    const decode = verifyWebToken(token);
    const user = await findUserById(decode.id); // Assuming decode.id contains the user ID
    if (!user) {
      return res.status(403).json({
        success: false,
        message: "Invalid token, please login again",
      });
    }
    req.user = user; // Attach user to request object for further use
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: "Invalid token, please login again",
    });
  }
}