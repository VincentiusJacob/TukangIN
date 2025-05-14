import { Request, Response } from "express";
import { fetchAllServices } from "../models/serviceModel";

export const getAllServices = async (req: Request, res: Response) => {
  try {
    const services = await fetchAllServices();
    res.json(services);
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({ error: "Failed to fetch services" });
  }
};
