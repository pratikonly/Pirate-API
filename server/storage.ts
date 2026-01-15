import { pirates, type InsertPirate, type Pirate } from "@shared/schema";
import { db } from "./db";
import { eq, sql } from "drizzle-orm";

export interface IStorage {
  getPirates(): Promise<Pirate[]>;
  getPirate(id: number): Promise<Pirate | undefined>;
  getRandomPirate(): Promise<Pirate | undefined>;
  createPirate(pirate: InsertPirate): Promise<Pirate>;
  seedPirates(): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getPirates(): Promise<Pirate[]> {
    return await db.select().from(pirates);
  }

  async getPirate(id: number): Promise<Pirate | undefined> {
    const [pirate] = await db.select().from(pirates).where(eq(pirates.id, id));
    return pirate;
  }

  async getRandomPirate(): Promise<Pirate | undefined> {
    const [pirate] = await db
      .select()
      .from(pirates)
      .orderBy(sql`RANDOM()`)
      .limit(1);
    return pirate;
  }

  async createPirate(insertPirate: InsertPirate): Promise<Pirate> {
    const [pirate] = await db.insert(pirates).values(insertPirate).returning();
    return pirate;
  }

  async seedPirates(): Promise<void> {
    const count = await db.select({ count: sql<number>`count(*)` }).from(pirates);
    if (Number(count[0].count) > 0) return;

    const seedData: InsertPirate[] = [
      {
        name: "Monkey D. Luffy",
        role: "Captain",
        bounty: "3,000,000,000 Berries",
        imageUrl: "https://static.wikia.nocookie.net/onepiece/images/6/6d/Monkey_D._Luffy_Anime_Post_Timeskip_Infobox.png"
      },
      {
        name: "Roronoa Zoro",
        role: "Swordsman",
        bounty: "1,111,000,000 Berries",
        imageUrl: "https://static.wikia.nocookie.net/onepiece/images/3/33/Roronoa_Zoro_Anime_Post_Timeskip_Infobox.png"
      },
      {
        name: "Nami",
        role: "Navigator",
        bounty: "366,000,000 Berries",
        imageUrl: "https://static.wikia.nocookie.net/onepiece/images/f/f4/Nami_Anime_Post_Timeskip_Infobox.png"
      },
      {
        name: "Usopp",
        role: "Sniper",
        bounty: "500,000,000 Berries",
        imageUrl: "https://static.wikia.nocookie.net/onepiece/images/5/5d/Usopp_Anime_Post_Timeskip_Infobox.png"
      },
      {
        name: "Sanji",
        role: "Cook",
        bounty: "1,032,000,000 Berries",
        imageUrl: "https://static.wikia.nocookie.net/onepiece/images/5/53/Vinsmoke_Sanji_Anime_Post_Timeskip_Infobox.png"
      },
      {
        name: "Tony Tony Chopper",
        role: "Doctor",
        bounty: "1,000 Berries",
        imageUrl: "https://static.wikia.nocookie.net/onepiece/images/b/bb/Tony_Tony_Chopper_Anime_Post_Timeskip_Infobox.png"
      },
      {
        name: "Nico Robin",
        role: "Archaeologist",
        bounty: "930,000,000 Berries",
        imageUrl: "https://static.wikia.nocookie.net/onepiece/images/5/51/Nico_Robin_Anime_Post_Timeskip_Infobox.png"
      },
      {
        name: "Franky",
        role: "Shipwright",
        bounty: "394,000,000 Berries",
        imageUrl: "https://static.wikia.nocookie.net/onepiece/images/c/ce/Franky_Anime_Post_Timeskip_Infobox.png"
      },
      {
        name: "Brook",
        role: "Musician",
        bounty: "383,000,000 Berries",
        imageUrl: "https://static.wikia.nocookie.net/onepiece/images/e/e8/Brook_Anime_Post_Timeskip_Infobox.png"
      },
      {
        name: "Jinbe",
        role: "Helmsman",
        bounty: "1,100,000,000 Berries",
        imageUrl: "https://static.wikia.nocookie.net/onepiece/images/6/6c/Jinbe_Anime_Post_Timeskip_Infobox.png"
      }
    ];

    await db.insert(pirates).values(seedData);
  }
}

export const storage = new DatabaseStorage();
