import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get(api.pirates.list.path, async (req, res) => {
    const pirates = await storage.getPirates();
    res.json(pirates);
  });

  app.get(api.pirates.random.path, async (req, res) => {
    const pirate = await storage.getRandomPirate();
    if (!pirate) {
      return res.status(404).json({ message: "No pirates found" });
    }
    res.json(pirate);
  });

  app.get(api.pirates.get.path, async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }
    const pirate = await storage.getPirate(id);
    if (!pirate) {
      return res.status(404).json({ message: "Pirate not found" });
    }
    res.json(pirate);
  });

  return httpServer;
}
