import { loginWithMagicLink } from "~/lib/auth/magic-link/action";

export default async function loginPage() {
  return (
    <form action={loginWithMagicLink}>
      <input type="email" name="email" />
      <button type="submit">Update</button>
    </form>
  );
}
