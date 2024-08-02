export default async function BoardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <main className="isolate h-screen bg-black">{children}</main>;
}
