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
    name: "Usopp",
    role: "Sniper",
    bounty: "500,000,000 Berries",
    imagePath: "/images/pirates/usopp.png"
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
    name: "Tony Tony Chopper",
    role: "Doctor",
    bounty: "1,000 Berries",
    imagePath: "/images/pirates/chopper.png"
  },
  {
    id: 6,
    name: "Franky",
    role: "Shipwright",
    bounty: "394,000,000 Berries",
    imagePath: "/images/pirates/franky.png"
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
    name: "Jinbe",
    role: "Helmsman",
    bounty: "1,100,000,000 Berries",
    imagePath: "/images/pirates/jinbe.png"
  },
  {
    id: 9,
    name: "Jack Sparrow",
    role: "Legendary Captain",
    bounty: "10,001 Guineas",
    imagePath: "/images/pirates/jack_sparrow.png"
  }
];
