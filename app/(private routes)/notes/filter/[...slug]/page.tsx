import App from "../../../../../components/App/App";
import type { NoteTag } from "../../../../../types/note";

const tags: NoteTag[] = [
  "Work",
  "Personal",
  "Meeting",
  "Shopping",
  "Ideas",
  "Travel",
  "Finance",
  "Health",
  "Important",
  "Todo",
];

const normalizeTag = (value: string | undefined) => {
  if (!value || value.toLowerCase() === "all") {
    return undefined;
  }

  return tags.find((tag) => tag.toLowerCase() === value.toLowerCase());
};

export default async function NotesFilterSlugPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const tag = normalizeTag(slug?.[0]);

  return <App tag={tag} />;
}
