import { cookieConfig } from "../config/config.js";
import { loginUserService, registerUserService } from "../services/auth.service.js";
import { asyncHandler } from "../utils/tryCatchHandler.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const token = await registerUserService(name, email, password);
  res.cookie("accessToken", token, { cookieConfig });
  return res.status(201).json({
    success: true,
    message: "User registered successfully",
  });
});

export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const {token,user} = await loginUserService(email, password);
    res.cookie("accessToken", token, { ...cookieConfig });
    req.user = user; // Store user in request object for further use
    return res.status(200).json({
        success: true,
        message: "User logged in successfully",
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        },
    });
});

export const logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie("accessToken", { ...cookieConfig });
    return res.status(200).json({
        success: true,
        message: "User logged out successfully",
    });
});

export const getCurrentUser = asyncHandler(async (req, res) => {
    const user = req.user; // User is attached to the request object by auth middleware
    return res.status(200).json({
        success: true,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        },
    });
})
