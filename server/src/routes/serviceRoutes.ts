import express from "express";
import { getAllServices } from "../controllers/serviceController";

const router = express.Router();

// GET /api/services
router.get("/", getAllServices);

export default router;
