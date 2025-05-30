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

app.get(
  "/api/services",
  catchAsync(async (req: Request, res: Response) => {
    try {
      const result = await pool.query("SELECT * FROM services");
      return res.json({
        success: true,
        message: "Services fetched successfully",
        services: result.rows,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  })
);

app.get(
  "/services/by-location",
  catchAsync(async (req: Request, res: Response) => {
    const { city } = req.query;

    if (!city) {
      return res.status(400).json({ error: "City parameter is required" });
    }

    try {
      const result = await pool.query(
        "SELECT * FROM services WHERE location_coverage ILIKE $1",
        [city]
      );
      res.json(result.rows);
    } catch (err) {
      console.error("Error fetching services by location:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  })
);

app.post(
  "/api/register/customer",
  catchAsync(async (req: Request, res: Response) => {
    const { name, phone, email, password } = req.body;

    try {
      const hashedPassword = await hashPassword(password);

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
      const hashedPassword = await hashPassword(password);

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

app.get(
  "/order-history/:id",
  catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
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

app.get(
  "/service/search/:name",
  catchAsync(async (req: Request, res: Response) => {
    const { name } = req.params;
    try {
      const result = await pool.query(
        `SELECT * FROM services WHERE service_name ILIKE '%' || $1 || '%' LIMIT 1`,
        [name]
      );

      if (result.rows.length === 0) {
        return res
          .status(404)
          .json({ success: false, message: "Service not found" });
      }

      return res.json({
        success: true,
        message: "Service fetched successfully",
        service: result.rows[0],
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  })
);

app.post(
  "/order",
  catchAsync(async (req: Request, res: Response) => {
    const client = await pool.connect();
    try {
      const {
        user_id,
        service_id,
        booking_date,
        duration_minutes,
        subtotal,
        service_name,
      } = req.body;

      const currentDate = new Date();

      const orderResult = await client.query(
        `INSERT INTO orders (customer_id, service_id, order_date, duration, price, status, order_title)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         RETURNING order_id`,
        [
          user_id,
          service_id,
          booking_date,
          duration_minutes,
          subtotal,
          "pending",
          service_name,
        ]
      );

      res.json({
        success: true,
        message: "Order is processed",
        order_id: orderResult.rows[0].order_id,
      });
    } catch (error) {
      console.error("Order process went wrong: ", error);
      res.status(500).json({
        success: false,
      });
    } finally {
      client.release();
    }
  })
);

app.post(
  "/payment",
  catchAsync(async (req: Request, res: Response) => {
    const client = await pool.connect();
    const { order_id, method, amount } = req.body;
    const currentDate = new Date();

    try {
      const orderResult = await client.query(
        `INSERT INTO payments (order_id, payment_date, payment_method, payment_price, payment_status)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING order_id`,
        [order_id, currentDate, method, amount, "Completed"]
      );

      res.json({
        success: true,
        message: "Payment successful",
      });
    } catch (error) {
      console.error("Payment process failed: ", error);

      try {
        await client.query(
          `INSERT INTO payments (order_id, payment_date, payment_method, payment_price, payment_status)
           VALUES ($1, $2, $3, $4, $5)`,
          [order_id, currentDate, method, amount, "Cancelled"]
        );
      } catch (cancelError) {
        console.error("Failed to record cancelled payment:", cancelError);
      }

      res.status(500).json({
        success: false,
        message: "Payment failed, status set to Cancelled",
      });
    } finally {
      client.release();
    }
  })
);

app.get(
  "/service/search/:name",
  catchAsync(async (req: Request, res: Response) => {
    const { name } = req.params;
    try {
      const result = await pool.query(
        `SELECT * FROM services WHERE service_name ILIKE $1 LIMIT 1`,
        [`%${name}%`]
      );

      if (result.rows.length === 0) {
        return res
          .status(404)
          .json({ success: false, message: "Layanan tidak ditemukan." });
      }

      res.json({ success: true, service: result.rows[0] });
    } catch (error) {
      console.error("Error saat mencari layanan:", error);
      res.status(500).json({
        success: false,
        message: "Terjadi kesalahan saat mencari layanan.",
      });
    }
  })
);

app.get("/history/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await pool.query(
      `SELECT 
        o.order_title AS title,
        TO_CHAR(o.order_date, 'DD/MM/YYYY') AS date,
        o.duration,
        o.price,
        s.category
      FROM Orders o
      JOIN Services s ON o.service_id = s.service_id
      WHERE o.customer_id = $1
      ORDER BY o.order_date DESC`,
      [userId]
    );
    res.json({ history: result.rows });
  } catch (error) {
    console.error("Error fetching order history:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/dashboard/ratings/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await pool.query(
      `SELECT 
        TO_CHAR(order_date, 'Mon') AS date,
        ROUND(AVG(rating), 2) AS rating
      FROM orders
      WHERE tukang_id = $1 AND rating IS NOT NULL
      GROUP BY date
      ORDER BY MIN(order_date)`,
      [userId]
    );
    res.json({ ratings: result.rows });
  } catch (error) {
    console.error("Error fetching ratings:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/dashboard/services/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await pool.query(
      `SELECT 
        s.service_name AS name,
        COUNT(*) AS value
      FROM orders o
      JOIN services s ON o.service_id = s.service_id
      WHERE o.tukang_id = $1
      GROUP BY s.service_name
      ORDER BY value DESC`,
      [userId]
    );
    res.json({ services: result.rows });
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/dashboard/revenue/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await pool.query(
      `SELECT 
        TO_CHAR(order_date, 'Mon') AS month,
        SUM(price) AS revenue
      FROM orders
      WHERE tukang_id = $1
      GROUP BY month
      ORDER BY MIN(order_date)`,
      [userId]
    );
    res.json({ revenue: result.rows });
  } catch (error) {
    console.error("Error fetching revenue:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/dashboard/weekly-orders/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await pool.query(
      `SELECT 
        'Week ' || EXTRACT(WEEK FROM order_date)::int AS week,
        COUNT(*) AS orders
      FROM orders
      WHERE tukang_id = $1
      GROUP BY week
      ORDER BY MIN(order_date)`,
      [userId]
    );
    res.json({ weeklyOrders: result.rows });
  } catch (error) {
    console.error("Error fetching weekly orders:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get(
  "/dashboard/orders/:userId",
  catchAsync(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    if (!userId) {
      return res.status(400).json({ error: "Missing userId" });
    }

    try {
      const countResult = await pool.query(
        `SELECT COUNT(*) FROM orders
         WHERE tukang_id = $1 AND status = 'completed'`,
        [userId]
      );
      const total = parseInt(countResult.rows[0].count);

      const result = await pool.query(
        `SELECT 
           o.order_id,
           u.name AS customer_name,
           s.service_name,
           TO_CHAR(o.order_date, 'YYYY-MM-DD') AS order_date,
           o.status,
           o.price AS total_price
         FROM orders o
         JOIN users u ON o.customer_id = u.user_id
         JOIN services s ON o.service_id = s.service_id
         WHERE o.tukang_id = $1 AND o.status = 'completed'
         ORDER BY o.order_date DESC
         LIMIT $2 OFFSET $3`,
        [userId, limit, offset]
      );

      res.json({
        total,
        orders: result.rows,
      });
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
);

app.get("/orders/pending", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT o.order_id, u.name AS customer_name, s.service_name, o.order_date, o.price
      FROM orders o
      JOIN users u ON o.customer_id = u.user_id
      JOIN services s ON o.service_id = s.service_id
      WHERE o.status = 'pending' AND o.tukang_id IS NULL
    `);
    res.json({ success: true, orders: result.rows });
  } catch (err) {
    console.error("Error fetching pending orders", err);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

app.post(
  "/orders/claim",
  catchAsync(async (req: Request, res: Response) => {
    const { order_id, tukang_id } = req.body;

    try {
      const result = await pool.query(
        `
      UPDATE orders
      SET tukang_id = $1, status = 'completed'
      WHERE order_id = $2 AND status = 'pending' AND tukang_id IS NULL
      RETURNING *
    `,
        [tukang_id, order_id]
      );

      if (result.rowCount === 0) {
        return res.status(400).json({
          success: false,
          message: "Order sudah diambil atau tidak tersedia.",
        });
      }

      res.json({ success: true, order: result.rows[0] });
    } catch (err) {
      console.error("Error claiming order", err);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  })
);

app.get("/dashboard/completion-time/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await pool.query(
      `
      SELECT 
      TO_CHAR(order_date, 'YYYY-MM-DD') AS date,
      AVG(CAST(duration AS INTEGER)) AS avg_duration_minutes
      FROM orders
      WHERE tukang_id = $1 AND status = 'completed'
      GROUP BY date
      ORDER BY date
    `,
      [userId]
    );

    res.json({ completionTime: result.rows });
  } catch (err) {
    console.error("Error fetching completion time:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/", (req, res) => {
  res.send("TukangIN API is running!");
});

export default app;
