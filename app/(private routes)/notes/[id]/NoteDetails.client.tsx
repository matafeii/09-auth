"use client";

import type { Note } from "../../../../types/note";
import css from "./NotePage.module.css";

export interface NoteDetailsClientProps {
  note: Note;
}

const NoteDetailsClient = ({ note }: NoteDetailsClientProps) => {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <article className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
            <span className={css.tag}>{note.tag}</span>
          </div>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>
            {new Date(note.createdAt).toLocaleString()}
          </p>
        </article>
      </div>
    </main>
  );
};

export default NoteDetailsClient;
