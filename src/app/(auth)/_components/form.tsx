import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

import { loginWithMagicLink } from "~/lib/auth/magic-link/action";

import { useActionState } from "react";

export function MagicForm() {
  const [error, submitAction, isPending] = useActionState(
    loginWithMagicLink,
    null,
  );

  return (
    <form action={submitAction} className="space-y-4">
      <Input placeholder="Email" name="email" className="rounded-xl" />
      <Button variant="notik" size="full" disabled={isPending}>
        Continue
      </Button>
      <p>{error?.fieldError?.email}</p>
    </form>
  );
}
