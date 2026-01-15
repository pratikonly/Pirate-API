import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const pirates = pgTable("pirates", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  bounty: text("bounty").notNull(),
  imageUrl: text("image_url").notNull(),
});

export const insertPirateSchema = createInsertSchema(pirates).omit({ id: true });

export type Pirate = typeof pirates.$inferSelect;
export type InsertPirate = z.infer<typeof insertPirateSchema>;
