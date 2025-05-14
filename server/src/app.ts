import express from "express";
import serviceRoutes from "./routes/serviceRoutes";
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("TukangIN API is running!");
});

app.get("/api/services", serviceRoutes);
export default app;
