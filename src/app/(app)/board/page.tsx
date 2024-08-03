import { redirect } from "next/navigation";
import { getCurrentUser } from "~/lib/auth/session";

// import dynamic from "next/dynamic";
import BoardNav from "./_components/board-nav";

// const Editor = dynamic(() => import("~/components/block-note/editor"), {
//   ssr: false,
//   loading: () => <p className="text-red-200">Loading...</p>,
// });

export default async function boardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/signin");

  return (
    <section className="container">
      <BoardNav />
      {/* <Editor /> */}
    </section>
  );
}
