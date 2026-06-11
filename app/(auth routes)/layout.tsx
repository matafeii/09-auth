export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header>{/* TODO: Add auth header */}</header>
      {children}
    </div>
  );
}
