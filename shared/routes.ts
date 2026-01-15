import { z } from 'zod';
import { insertPirateSchema, pirates } from './schema';

export const errorSchemas = {
  notFound: z.object({
    message: z.string(),
  }),
};

export const api = {
  pirates: {
    list: {
      method: 'GET' as const,
      path: '/api/pirates',
      responses: {
        200: z.array(z.custom<typeof pirates.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/pirates/:id',
      responses: {
        200: z.custom<typeof pirates.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
    random: {
      method: 'GET' as const,
      path: '/api/pirates/random',
      responses: {
        200: z.custom<typeof pirates.$inferSelect>(),
      },
    },
  },
};
