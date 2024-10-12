'use client'

import { Header } from "../components/header";
import HomePage from "../components/home-page";
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
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 overflow-hidden">
        <HomePage />
      </div>
    </div>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary errorComponent={ErrorPage}>
        <div>
          <DataDisplay />
        </div>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}
