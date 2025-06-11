export const cookieConfig = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // Use secure cookies in production
  sameSite: "lax", // Adjust as needed (Lax, Strict, None)
  maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
};
  