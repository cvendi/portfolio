import { env } from "cloudflare:workers";

export const prerender = false;

export async function POST({ request }) {
  let email, token;
  try {
    ({ email, token } = await request.json());
  } catch {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }

  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "invalid_email" }, { status: 400 });
  }
  if (typeof token !== "string" || token.length === 0) {
    return Response.json({ error: "missing_token" }, { status: 400 });
  }

  // 1. Verify the Turnstile token server-side
  const verify = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: env.TURNSTILE_SECRET_KEY,
        response: token,
        remoteip: request.headers.get("CF-Connecting-IP") ?? "",
      }),
    },
  );

  const outcome = await verify.json<{ success: boolean }>();
  if (!outcome.success) {
    return Response.json({ error: "failed_challenge" }, { status: 403 });
  }

  // 2. Only now send the email
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Portfolio Contact <contact@mail.venditto.dev>",
      to: ["hello@venditto.dev"],
      reply_to: email,
      subject: `New contact request from ${email}`,
      text: `New contact:\n\n${email}`,
    }),
  });

  if (!res.ok) {
    return Response.json({ error: "send_failed" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
