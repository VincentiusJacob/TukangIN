// src/routes/serviceRoute.ts
import express from "express";
import { fetchServices } from "../controllers/serviceController";

const router = express.Router();

router.get("/services", fetchServices);

export default router;
