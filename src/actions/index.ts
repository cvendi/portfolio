import { defineAction } from "astro:actions";
import { z } from "astro/zod";

export const server = {
  submitContact: defineAction({
    input: z.object({
      email: z.string().email(),
      turnstileToken: z.string(),
    }),
    handler: async (input) => {
      return { success: true };
    },
  }),
};
