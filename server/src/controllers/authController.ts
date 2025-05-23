// controllers/authController.ts
import { Request, Response } from "express";
import { findUserByEmail } from "../models/userModel";
import { generateToken } from "../utils/authUtils"; // Importing the utility function
import { comparePassword } from "../utils/passwordUtils";

// Login controller
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await findUserByEmail(email);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    // Compare the provided password with the hashed password stored in the DB
    const isMatch = await comparePassword(password, user.customerpw);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    // Generate JWT token using the utility function
    const token = generateToken(user.customerid);

    // Send the response with the token and user data (exclude sensitive data like password)
    res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        customerid: user.customerid,
        customername: user.customername,
        customeremail: user.customeremail,
        customerdob: user.customerdob,
        customergender: user.customergender,
        customeraddress: user.customeraddress,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
