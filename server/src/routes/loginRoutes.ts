// src/routes/loginRoutes.ts
import express, { Request, Response } from "express"; // Import types for Request and Response
import { login } from "../controllers/authController"; // Importing the login controller

const router = express.Router();

// Define the POST route for login
router.post("/login", async (req: Request, res: Response) => {
  try {
    await login(req, res); // Call the login controller asynchronously
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
