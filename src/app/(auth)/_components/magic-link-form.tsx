import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "~/components/ui/form";
import { type TMagicLinkSchema, ZMagicLinkSchema } from "~/lib/auth/validators";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import type { ProduceLoginWithMagicLinkReturnType } from "~/lib/auth/actions";

import { Loader2, SparklesIcon } from "lucide-react";

interface MagicLinkFormProps {
  execute: (values: TMagicLinkSchema) => Promise<ProduceLoginWithMagicLinkReturnType>;
  isPending: boolean;
}

export default function MagicLinkForm({ execute, isPending }: MagicLinkFormProps) {
  const form = useForm<TMagicLinkSchema>({
    resolver: zodResolver(ZMagicLinkSchema),
    defaultValues: {
      email: "",
    },
  });

  const { isValid } = form.formState;

  async function onSubmit(values: TMagicLinkSchema) {
    const [data, err] = await execute(values);
    console.log(data);

    if (err) {
      // show a toast or something
      console.log({ email: err });
      //
      return;
    }

    form.reset({ email: "" });
  }

  return (
    <div className="space-y-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Email</FormLabel>
                <FormControl>
                  <Input className="h-10 rounded-xl" placeholder="Enter your email..." {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button variant="notik" size="full" type="submit">
            {isPending ? <Loader2 className="animate-spin" /> : "Continue"}
          </Button>
        </form>
      </Form>
      <div>
        <p className="flex gap-1 text-notikCream-foreground text-sm">
          <SparklesIcon size={"16"} />
          We'll email you a link for a password-free sign up.
        </p>
      </div>
    </div>
  );
}
