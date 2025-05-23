// models/userModel.ts
import pool from "../utils/db";
// Importing from utils

// Function to find user by email
export const findUserByEmail = async (email: string) => {
  const result = await pool.query(
    "SELECT * FROM mscustomer WHERE customeremail = $1",
    [email]
  );
  return result.rows[0]; // return the first row (if any)
};
