import { fetchNoteById } from "../../../../lib/api/serverApi";
import NotePreviewClient from "./NotePreview.client";

export default async function NotePreviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const note = await fetchNoteById(id);

  return <NotePreviewClient note={note} />;
}
