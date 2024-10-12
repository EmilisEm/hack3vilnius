'use client'

import { Header } from '../components/header'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { ErrorBoundary } from 'next/dist/client/components/error-boundary'
import ErrorPage from '../page/ErrorPage'
import AppContextProvider from '@/context/ContextProvider'
import DataDisplay from '@/components/DataDisplay'
import PreviewPage from '@/components/preview-page'

export default function Home() {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 60 * 1000,
                    },
                },
            })
    )

    return (
        <AppContextProvider>
            <QueryClientProvider client={queryClient}>
                <ErrorBoundary errorComponent={ErrorPage}>
                    <div className="flex flex-col h-screen">
                        <Header />
                        <div className="flex-1 overflow-hidden">
                            <PreviewPage />
                        </div>
                    </div>
                </ErrorBoundary>
            </QueryClientProvider>
        </AppContextProvider>
    )
}
