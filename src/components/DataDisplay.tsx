'use client'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import LoadingPage from '../page/LoadingPage'
import { junctionById } from '@/api/utils/queryKeyFactory'
import { getStreetImageUrl } from '@/api/mapillary/getImage'

const DataDisplay = () => {
    const junction = [25.277, 54.679, 25.297, 54.699]
    const { data, isLoading } = useQuery({
        queryKey: [
            junctionById(junction[0], junction[1], junction[2], junction[3]),
        ],
        queryFn: async () =>
            await getStreetImageUrl(
                junction[0],
                junction[1],
                junction[2],
                junction[3]
            ),
    })
    if (isLoading) {
        ;<LoadingPage />
    }

    return <img src={data} alt="image of street" />
}

export default DataDisplay
