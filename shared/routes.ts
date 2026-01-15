import { z } from 'zod';
import { pirateSchema } from './schema.js';

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
        200: z.array(pirateSchema),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/pirates/:id',
      responses: {
        200: pirateSchema,
        404: errorSchemas.notFound,
      },
    },
    random: {
      method: 'GET' as const,
      path: '/api/pirates/random',
      responses: {
        200: pirateSchema,
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
