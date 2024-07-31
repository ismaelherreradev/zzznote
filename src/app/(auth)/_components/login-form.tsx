import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import { SparklesIcon } from "lucide-react";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Separator } from "~/components/ui/separator";

export default function LoginForm() {
  return (
    <Card className="mx-4 min-h-[400px] min-w-[380px] rounded-2xl bg-notik-cream py-4 text-center">
      <CardHeader className="pb-0">
        <h1 className="font-extrabold text-2xl">Welcome to Notik</h1>
        <CardDescription className="font-medium text-foreground">
          Log In or Register with your email.
        </CardDescription>
        <div className="pt-6">
          <Button className="space-x-2" size="full">
            <svg
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Google</title>
              <path
                d="M14.5 8.14032C14.5 11.5637 12.1172 14 8.59836 14C5.22459 14 2.5 11.3194 2.5 8C2.5 4.68065 5.22459 2 8.59836 2C10.241 2 11.623 2.59274 12.6877 3.57016L11.0279 5.14032C8.85656 3.07903 4.81885 4.62742 4.81885 8C4.81885 10.0927 6.51803 11.7887 8.59836 11.7887C11.0131 11.7887 11.918 10.0855 12.0607 9.20242H8.59836V7.13871H14.4041C14.4607 7.44597 14.5 7.74113 14.5 8.14032Z"
                fill="white"
              />
            </svg>
            <span>Continue with Google</span>
          </Button>
        </div>
      </CardHeader>
      <Separator className="mx-auto my-6 flex w-3/4 bg-black/20" />
      <CardContent>
        <form className="space-y-4">
          <Input placeholder="Email" className="rounded-xl" />
          <Button variant="notik" size="full">
            Continue
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <p className="flex gap-1 text-sm">
          <SparklesIcon size={"16"} />
          We'll email you a link for a password-free sign up.
        </p>
      </CardFooter>
    </Card>
  );
}
