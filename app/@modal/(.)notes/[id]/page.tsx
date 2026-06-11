import NotePreview from "../../../../components/NotePreview/NotePreview";
import { fetchNoteById } from "../../../../lib/api/serverApi";

export default async function NotePreviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const note = await fetchNoteById(id);

  return <NotePreview note={note} />;
}
