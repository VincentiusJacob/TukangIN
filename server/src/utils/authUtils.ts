// utils/authUtils.ts
import jwt from "jsonwebtoken";

const JWT_SECRET = "your-jwt-secret"; // Make sure to store this securely in an environment variable

// Function to generate a JWT token
export const generateToken = (userId: string) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });
};
