"use client";

import { Card, CardContent, CardDescription, CardHeader } from "~/components/ui/card";

import { useServerAction } from "zsa-react";
import MagicLinkForm from "./magic-link-form";

import { Separator } from "~/components/ui/separator";
import { produceLoginWithMagicLink } from "~/lib/auth/magic-link/action";
import GoogleButton from "./google-button";

export default function AuthContainer() {
  const { isPending, execute, data, error } = useServerAction(produceLoginWithMagicLink);

  return (
    <Card className="m-4 max-w-sm rounded-2xl bg-notik-cream py-4 text-center">
      {!data?.emailSend ? (
        <>
          <CardHeader className="pb-0">
            <h1 className="font-extrabold text-2xl">Welcome to Notik</h1>
            <CardDescription className="font-medium text-foreground">
              Log In or Register with your email.
            </CardDescription>
            <div className="pt-6">
              <GoogleButton />
            </div>
          </CardHeader>
          <Separator className="mx-auto my-6 flex w-3/4 bg-black/20" />
          <CardContent>
            <MagicLinkForm execute={execute} isPending={isPending} />
          </CardContent>
        </>
      ) : (
        <CheckEmail email={data?.email as string} />
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

        <p className="text-muted-foreground">
          If you haven't received it within a few minutes, double check your spam/junk folder.
        </p>
      </CardContent>
    </>
  );
}
