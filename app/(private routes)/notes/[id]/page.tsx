export default async function NotePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div>
      <h1>Note {id}</h1>
      {/* TODO: Display note content */}
    </div>
  );
}
