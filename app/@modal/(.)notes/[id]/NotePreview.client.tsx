"use client";

import NotePreview from "../../../../components/NotePreview/NotePreview";
import type { Note } from "../../../../types/note";

export interface NotePreviewClientProps {
  note: Note;
}

const NotePreviewClient = ({ note }: NotePreviewClientProps) => {
  return <NotePreview note={note} />;
};

export default NotePreviewClient;
