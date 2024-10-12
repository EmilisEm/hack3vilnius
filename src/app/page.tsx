'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import DataDisplay from "./components/DataDisplay";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import ErrorPage from "./pages/ErrorPage";

export default function Home() {
  const [queryClient] = useState(() => new QueryClient({defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    }
  }}))

  return (
        <QueryClientProvider client={queryClient}>
          <ErrorBoundary errorComponent={ErrorPage}>
          <div>
            <DataDisplay />
          </div>
          </ErrorBoundary>
        </QueryClientProvider>
  );
}
