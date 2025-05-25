import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Pool } from "pg";
import dotenv from "dotenv";
import cors from "cors";
import { env } from "process";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// DB Connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// JWT Secret
const JWT_SECRET =
  "gGH1/XVzLFnAX981fi4ZAfOgDpBH+b1BatXiyAzU05onojeMnXXU272PjicJ19eEdcLZUscIi3NB7eyZBGSQdQ=="; // Ensure to store securely in an env variable

// Utility Functions
const generateToken = (userId: string) => {
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

// Controllers
const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM mscustomer WHERE customeremail = $1",
      [email]
    );
    const user = result.rows[0];

    if (!user) {
      res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
      return; // Make sure to return here to avoid further code execution
    }

    const isMatch = await comparePassword(password, user.customerpw);
    if (!isMatch) {
      res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
      return; // Again, return to end the function here
    }

    const token = generateToken(user.customerid);

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

const fetchServices = async (req: Request, res: Response): Promise<void> => {
  try {
    const servicesResult = await pool.query("SELECT * FROM ms_service");
    const services = servicesResult.rows;
    res.json(services);
  } catch (error: any) {
    console.error("Error fetching services:", error.message);
    res
      .status(500)
      .json({ message: "Failed to fetch services", detail: error.message });
  }
};

const generateCustomerId = async (): Promise<string> => {
  const result = await pool.query(
    "SELECT customerid FROM mscustomer ORDER BY customerid DESC LIMIT 1"
  );
  const lastCustomerId = result.rows[0]?.customerid || "CU000"; // If no record exists, start with CU000
  const newCustomerIdNumber = parseInt(lastCustomerId.replace("CU", "")) + 1;
  const newCustomerId = `CU${newCustomerIdNumber.toString().padStart(3, "0")}`;
  return newCustomerId;
};

// Register customer API
app.post(
  "/api/register",
  async (req: Request, res: Response): Promise<void> => {
    const { customername, customeremail, customerphone, customerpw } = req.body;

    try {
      // Generate a new customer ID
      const customerId = await generateCustomerId();

      // Insert new customer into the database
      const result = await pool.query(
        "INSERT INTO mscustomer (customerid, customername, customeremail, customerphone, customerpw) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [customerId, customername, customeremail, customerphone, customerpw]
      );

      // Respond with the result
      const newCustomer = result.rows[0];
      res.json({
        success: true,
        message: "Account created successfully!",
        customer: {
          customerid: newCustomer.customerid,
          customername: newCustomer.customername,
          customeremail: newCustomer.customeremail,
          customerphone: newCustomer.customerphone,
        },
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Error creating account" });
    }
  }
);

// Routes
app.post("/api/login", login);
app.get("/api/services", fetchServices);

// Test route
app.get("/", (req, res) => {
  res.send("TukangIN API is running!");
});

export default app;
