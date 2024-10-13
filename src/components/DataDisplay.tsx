'use client'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import LoadingPage from '../pages/LoadingPage'
import { junctionById } from '@/api/utils/queryKeyFactory'
import { getStreetImageUrl } from '@/api/mapillary/getImage'
import { getRoute } from '@/api/osrm/getRoute'
import { getIntersections } from '@/api/osrm/parseJunctions'

const DataDisplay = () => {
    const junction = [25.261935, 54.731615, 25.268297, 54.704943]
    const { data, isLoading, isError } = useQuery({
        queryKey: [
            junctionById(junction[0], junction[1], junction[2], junction[3]),
        ],
        queryFn: async () =>
            await getRoute(junction[0], junction[1], junction[2], junction[3]),
    })
    if (isLoading) {
        return <LoadingPage />
    }

    if (isError || !data) {
        return <LoadingPage />
    }

    return <div>j</div>
}

export default DataDisplay
