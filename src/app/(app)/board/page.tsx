import { redirect } from "next/navigation";
import { getCurrentUser } from "~/lib/auth/session";

export default async function boardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return <div>board</div>;
}
