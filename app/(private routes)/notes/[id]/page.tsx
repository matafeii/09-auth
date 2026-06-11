import { fetchNoteById } from "../../../../lib/api/serverApi";
import NoteDetailsClient from "./NoteDetails.client";

export default async function NotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const note = await fetchNoteById(id);

  return <NoteDetailsClient note={note} />;
}
