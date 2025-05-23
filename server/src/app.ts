import express from "express";
import serviceRoutes from "./routes/serviceRoutes";
import cors from "cors";

const app = express();
app.use(cors()); // 👈 wajib

// middleware lainnya
app.use(express.json());

app.get("/", (req, res) => {
  res.send("TukangIN API is running!");
});

app.use("/api", serviceRoutes);
export default app;
