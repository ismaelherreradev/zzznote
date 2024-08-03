"use client";

import { Card, CardContent, CardDescription, CardHeader } from "~/components/ui/card";

import { useServerAction } from "zsa-react";
import MagicLinkForm from "./magic-link-form";

import { Separator } from "~/components/ui/separator";
import { produceLoginWithMagicLink } from "~/lib/auth/actions";
import GoogleButton from "./google-button";

export default function AuthContainer() {
  const { isPending, execute, data, error } = useServerAction(produceLoginWithMagicLink);
  const emailSent = data?.emailSend;

  return (
    <Card className="m-4 max-w-sm rounded-2xl bg-notik-cream py-4 text-center">
      {emailSent ? (
        <CheckEmail email={data.email as string} />
      ) : (
        <>
          <CardHeader className="pb-0">
            <h1 className="mb-2 font-extrabold text-2xl">Welcome to Notik</h1>
            <CardDescription className="font-medium text-notikBlack">
              Log In or Register with your email.
            </CardDescription>
            <div className="flex justify-center pt-6">
              <GoogleButton />
            </div>
          </CardHeader>
          <Separator className="mx-auto my-6 w-3/4 bg-black/20" />
          <CardContent>
            <MagicLinkForm execute={execute} isPending={isPending} />
          </CardContent>
        </>
      )}
    </Card>
  );
}

export function CheckEmail({ email }: { email: string }) {
  return (
    <>
      <CardHeader className="pb-0">
        <h1 className="mb-4 font-extrabold text-2xl">Check your email to finish signing in</h1>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <span>We just sent a link to</span>
          <h3 className="font-semibold text-lg">{email}</h3>
        </div>

        <p className="text-notik-cream-foreground">
          If you haven't received it within a few minutes, double check your spam/junk folder.
        </p>
      </CardContent>
    </>
  );
}
