// src/controllers/serviceController.ts
import { Request, Response } from "express";
import { fetchAllServices } from "../models/serviceModel";

export const fetchServices = async (req: Request, res: Response) => {
  try {
    const services = await fetchAllServices();
    res.json(services);
  } catch (error: any) {
    console.error("Error fetching services:", error.message);
    res
      .status(500)
      .json({ message: "Failed to fetch services", detail: error.message });
  }
};
