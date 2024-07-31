export default async function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="isolate grid min-h-svh place-items-center bg-black">
      {children}
    </main>
  );
}
