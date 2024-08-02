import { redirect } from "next/navigation";
import { getCurrentUser } from "~/lib/auth/session";
import AuthContainer from "../_components/auth-container";

export default async function loginPage() {
  const user = await getCurrentUser();

  if (user) {
    redirect("/board");
  }

  return (
    <>
      <AuthContainer />
    </>
  );
}
