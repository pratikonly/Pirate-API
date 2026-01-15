import { z } from "zod";

export const pirateSchema = z.object({
  id: z.number(),
  name: z.string(),
  role: z.string(),
  bounty: z.string(),
  imagePath: z.string(),
});

export type Pirate = z.infer<typeof pirateSchema>;

export const piratesData: Pirate[] = [
  {
    id: 1,
    name: "Monkey D. Luffy",
    role: "Captain",
    bounty: "3,000,000,000 Berries",
    imagePath: "/images/pirates/luffy.png"
  },
  {
    id: 2,
    name: "Roronoa Zoro",
    role: "Swordsman",
    bounty: "1,111,000,000 Berries",
    imagePath: "/images/pirates/zoro.png"
  },
  {
    id: 3,
    name: "Shanks",
    role: "Captain of the Red Hair Pirates",
    bounty: "4,048,900,000 Berries",
    imagePath: "/images/pirates/shanks.png"
  },
  {
    id: 4,
    name: "Sanji",
    role: "Cook",
    bounty: "1,032,000,000 Berries",
    imagePath: "/images/pirates/sanji.png"
  },
  {
    id: 5,
    name: "Joyboy",
    role: "Legendary Figure",
    bounty: "Unknown",
    imagePath: "/images/pirates/joyboy.png"
  },
  {
    id: 6,
    name: "Monkey D. Garp",
    role: "Marine Vice Admiral",
    bounty: "Unknown",
    imagePath: "/images/pirates/garp.png"
  },
  {
    id: 7,
    name: "Brook",
    role: "Musician",
    bounty: "383,000,000 Berries",
    imagePath: "/images/pirates/brook.png"
  },
  {
    id: 8,
    name: "Donquixote Doflamingo",
    role: "Captain of the Donquixote Pirates",
    bounty: "340,000,000 Berries (Frozen)",
    imagePath: "/images/pirates/doflamingo.png"
  },
  {
    id: 9,
    name: "Jack Sparrow",
    role: "Legendary Captain",
    bounty: "10,001 Guineas",
    imagePath: "/images/pirates/jack_sparrow.png"
  }
];
