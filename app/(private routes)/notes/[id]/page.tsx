export default function NotePage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Note {params.id}</h1>
      {/* TODO: Display note content */}
    </div>
  );
}
