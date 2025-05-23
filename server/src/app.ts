// app.ts
import express from "express";
import serviceRoutes from "./routes/serviceRoutes";
import loginRoutes from "./routes/loginRoutes"; // Import loginRoutes
import cors from "cors";

const app = express();
app.use(cors()); // Allow cross-origin requests

// Middleware to parse incoming JSON
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("TukangIN API is running!");
});

// Use the loginRoutes for login-related requests
app.use("/api", loginRoutes); // Login route is now correctly under /api/login

// Use serviceRoutes for service-related requests
app.use("/api", serviceRoutes);

export default app;
