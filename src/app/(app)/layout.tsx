import { Provider } from "jotai";
import Navbar from "./_components/navbar";

export default async function BoardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <Provider>
      <main className="isolate min-h-svh bg-black">
        <Navbar />
        {children}
      </main>
    </Provider>
  );
}
