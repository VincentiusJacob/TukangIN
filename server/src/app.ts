import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Pool } from "pg";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const JWT_SECRET = process.env.JWT_SECRET || "";

// Utility
const generateToken = (userId: number) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });
};

const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

const comparePassword = async (
  plainPassword: string,
  hashedPassword: string
) => {
  return bcrypt.compare(plainPassword, hashedPassword);
};

function catchAsync(fn: Function) {
  return function (req: Request, res: Response, next: any) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

// Register Route (User - customer/tukang)
app.post(
  "/api/register/customer",
  catchAsync(async (req: Request, res: Response) => {
    const { name, phone, email, password } = req.body;

    try {
      // Hash password
      const hashedPassword = await hashPassword(password);

      // Insert new user
      const insertResult = await pool.query(
        `INSERT INTO users (name, phone, email, password_hash, role)
       VALUES ($1, $2, $3, $4, $5) RETURNING user_id, name, phone, email, role`,
        [name, phone, email, hashedPassword, "customer"]
      );

      const newUser = insertResult.rows[0];
      return res.json({
        success: true,
        message: "Account created successfully!",
        user: newUser,
      });
    } catch (error: any) {
      if (error.code === "23505") {
        return res
          .status(400)
          .json({ success: false, message: "Email already registered" });
      }
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Error creating account" });
    }
  })
);

app.post(
  "/api/register/tukang",
  catchAsync(async (req: Request, res: Response) => {
    const { name, phone, email, password } = req.body;

    try {
      // Hash password
      const hashedPassword = await hashPassword(password);

      // Insert new user
      const insertResult = await pool.query(
        `INSERT INTO users (name, phone, email, password_hash, role)
       VALUES ($1, $2, $3, $4, $5) RETURNING user_id, name, phone, email, role`,
        [name, phone, email, hashedPassword, "tukang"]
      );

      const newUser = insertResult.rows[0];
      return res.json({
        success: true,
        message: "Account created successfully!",
        user: newUser,
      });
    } catch (error: any) {
      if (error.code === "23505") {
        return res
          .status(400)
          .json({ success: false, message: "Email already registered" });
      }
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Error creating account" });
    }
  })
);
// Login Route
app.post(
  "/api/login",
  catchAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      const result = await pool.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);
      const user = result.rows[0];
      if (!user) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid email or password" });
      }

      const isMatch = await comparePassword(password, user.password_hash);
      if (!isMatch) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid email or password" });
      }

      const token = generateToken(user.user_id);

      return res.json({
        success: true,
        message: "Login successful",
        token,
        user: {
          user_id: user.user_id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          dob: user.dob,
          gender: user.gender,
          address: user.address,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  })
);

// Get User Data
app.get(
  "/user/:id",
  catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const result = await pool.query(
        "SELECT * FROM users WHERE user_id = $1",
        [id]
      );
      const user = result.rows[0];
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }
      return res.json({
        success: true,
        message: "User data fetched successfully",
        user,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  })
);

// Order History Route
app.get(
  "/order-history/:id",
  catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      // Join dengan tabel lain supaya data order lebih informatif
      const result = await pool.query(
        `SELECT o.order_id, o.order_title, o.order_date, o.duration, o.price, o.status,
              s.service_name, s.category, t.name as tukang_name, p.payment_status
         FROM orders o
    LEFT JOIN services s ON o.service_id = s.service_id
    LEFT JOIN users t ON o.tukang_id = t.user_id
    LEFT JOIN payments p ON o.order_id = p.order_id
        WHERE o.customer_id = $1
        ORDER BY o.order_date DESC`,
        [id]
      );
      const orders = result.rows;

      if (orders.length === 0) {
        return res
          .status(404)
          .json({ success: false, message: "No orders found for this user" });
      }

      return res.json({
        success: true,
        message: "Order history fetched successfully",
        orders,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  })
);

// Test Route
app.get("/", (req, res) => {
  res.send("TukangIN API is running!");
});

export default app;
