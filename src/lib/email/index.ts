import "server-only";

import { Resend } from "resend";
import { env } from "~/env";

const resend = new Resend(env.RESEND_KEY);

import MagicLinkEmail from "./templates/magic-link";

export async function sendMagicLink(code: string, email: string) {
  const { error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: email,
    subject: "Hello world",
    react: MagicLinkEmail({ loginCode: code }),
  });

  if (error) {
    throw error;
  }
}
