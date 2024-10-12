'use client'
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import LoadingPage from '../page/LoadingPage';
import { junctionById } from '@/api/utils/queryKeyFactory';
import { getRoute } from '@/api/osrm/getRoute';
import { getIntersections } from '@/api/osrm/parseJunctions';
import ErrorPage from '@/page/ErrorPage';

const DataDisplay = () => {
  const junction = [25.261935,54.731615,25.268297,54.704943]
  const {data, isLoading, isError} = useQuery({queryKey: [junctionById(junction[0], junction[1], junction[2], junction[3])], queryFn: async () => await getRoute(junction[0], junction[1], junction[2], junction[3]) });
  if (isLoading) {
    return <LoadingPage />
  }
  if (isError || data == undefined || data == null) {
    return <ErrorPage />
  }
  console.log(getIntersections(data[0]))
 return (
  <div>Shhoooot</div>
  )
}

export default DataDisplay