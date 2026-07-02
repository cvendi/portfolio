import { defineAction, ActionError } from "astro:actions";
import { z } from "astro/zod";
import { env } from "cloudflare:workers";

export const server = {
  submitContact: defineAction({
    accept: "form",
    input: z.object({
      email: z.email(),
      "cf-turnstile-response": z.string(),
    }),
    handler: async (input, context) => {
      const verify = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            secret: env.TURNSTILE_SECRET_KEY,
            response: input["cf-turnstile-response"],
            remoteip: context.request.headers.get("CF-Connecting-IP") ?? "",
          }),
        },
      );
      const verifyResult = await verify.json();

      if (!verifyResult.success) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: "Turnstile verification failed.",
        });
      }

      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Portfolio Contact <contact@mail.venditto.dev>",
          to: ["cody@venditto.dev"],
          reply_to: input.email,
          subject: `New contact request from ${input.email}`,
          text: `A portfolio visitor has submitted a contact request:\n\nEmail: ${input.email}`,
        }),
      });

      if (!res.ok) {
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to send email.",
        });
      }

      return { success: true };
    },
  }),
};
