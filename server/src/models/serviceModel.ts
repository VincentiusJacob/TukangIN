import pool from "../utils/db";

export const fetchAllServices = async () => {
  const result = await pool.query("SELECT * FROM services");
  return result.rows;
};
