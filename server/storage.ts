import { type Pirate, piratesData } from "@shared/schema.js";

export interface IStorage {
  getPirates(): Promise<Pirate[]>;
  getPirate(id: number): Promise<Pirate | undefined>;
  getRandomPirate(): Promise<Pirate | undefined>;
}

export class FileStorage implements IStorage {
  async getPirates(): Promise<Pirate[]> {
    return piratesData;
  }

  async getPirate(id: number): Promise<Pirate | undefined> {
    return piratesData.find(p => p.id === id);
  }

  async getRandomPirate(): Promise<Pirate | undefined> {
    if (piratesData.length === 0) return undefined;
    const randomIndex = Math.floor(Math.random() * piratesData.length);
    return piratesData[randomIndex];
  }
}

export const storage = new FileStorage();
