'use client'
import { allSpells } from '@/api/utils/queryKeyFactory'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import LoadingPage from '../../page/LoadingPage'
import { getLuciferQuote } from '@/api/lucifer/getSpells'

const DataDisplay = () => {
    const { data, isLoading } = useQuery({
        queryKey: [allSpells],
        queryFn: getLuciferQuote,
    })
    if (isLoading) {
        ;<LoadingPage />
    }

    return <div>{`${data}`}</div>
}

export default DataDisplay
