import { env } from "cloudflare:workers";

export const prerender = false;

export async function POST({ request }) {
  let email;
  try {
    ({ email } = await request.json());
  } catch {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }

  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "invalid_email" }, { status: 400 });
  }

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
