"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import SearchBox from "../../../../components/SearchBox/SearchBox";
import Pagination from "../../../../components/Pagination/Pagination";
import NoteList from "../../../../components/NoteList/NoteList";
import { fetchNotes } from "../../../../lib/api";
import css from "../../NotesPage.module.css";

const PER_PAGE = 12;

export interface NotesClientProps {
  tag: string;
}

const NotesClient = ({ tag }: NotesClientProps) => {
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    setPage(0);
  }, [tag]);

  const debouncedSetSearch = useDebouncedCallback((value: string) => {
    setDebouncedSearch(value);
    setPage(0);
  }, 500);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    debouncedSetSearch(value);
  };

  const effectiveTag = tag === "all" ? undefined : tag;

  const { data: notesData } = useQuery({
    queryKey: ["notes", tag, page, debouncedSearch],
    queryFn: () =>
      fetchNotes({
        page: page + 1,
        perPage: PER_PAGE,
        search: debouncedSearch || undefined,
        tag: effectiveTag,
      }),
    placeholderData: keepPreviousData,
  });

  const handlePageChange = ({ selected }: { selected: number }) => {
    setPage(selected);
  };

  const notes = notesData?.notes ?? [];
  const pageCount = notesData?.totalPages ?? 0;

  return (
    <main className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchQuery} onChange={handleSearchChange} />
        {pageCount > 1 && (
          <Pagination
            pageCount={pageCount}
            onPageChange={handlePageChange}
            forcePage={page}
          />
        )}
        <Link className={css.button} href="/notes/action/create">
          Create note +
        </Link>
      </header>

      {notes.length > 0 && <NoteList notes={notes} />}
    </main>
  );
};

export default NotesClient;
