import { getCurrentUser } from "~/lib/auth/session";

export default async function boardPage() {
  const user = await getCurrentUser();
  if (!user) {
    console.log("no user");
  }
  console.log(user);
  return <div>board</div>;
}
