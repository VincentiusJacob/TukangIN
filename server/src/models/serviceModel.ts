import pool from "../utils/db";

export const fetchAllServices = async () => {
  const result = await pool.query("SELECT * FROM ms_service");
  return result.rows;
};
