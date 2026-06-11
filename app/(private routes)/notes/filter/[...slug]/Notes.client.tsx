"use client";

import App from "../../../../../components/App/App";
import type { NoteTag } from "../../../../../types/note";

export interface NotesClientProps {
  tag?: NoteTag;
}

const NotesClient = ({ tag }: NotesClientProps) => {
  return <App tag={tag} />;
};

export default NotesClient;
