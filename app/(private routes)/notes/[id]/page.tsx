import { fetchNoteById } from "../../../../lib/api/serverApi";
import css from "./NotePage.module.css";

export default async function NotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const note = await fetchNoteById(id);

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
}
