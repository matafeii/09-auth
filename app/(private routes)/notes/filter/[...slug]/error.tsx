"use client";

import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <main style={{ padding: 16 }}>
      <p>Something went wrong.</p>
      <button type="button" onClick={reset}>
        Try again
      </button>
    </main>
  );
}
