'use client'
import { Header } from '@/components/header'
import AppContextProvider from '@/context/ContextProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { useState } from 'react'

export const RouteLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode
}>) => {
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
                <div className="flex flex-col h-screen">
                    <Header />
                    <div className="flex-1 overflow-hidden">{children}</div>
                </div>
            </QueryClientProvider>
        </AppContextProvider>
    )
}

export default RouteLayout
