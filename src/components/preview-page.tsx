'use client'

import React, { useContext, useMemo, useState } from 'react'
import Image from 'next/image'
import { MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import dynamic from 'next/dynamic'
import { AppContext } from '@/context/context'
import { useQueries } from '@tanstack/react-query'
import { junctionById } from '@/api/utils/queryKeyFactory'
import { getStreetImageUrl } from '@/api/mapillary/getImage'
import LoadingPage from '@/page/LoadingPage'
import ErrorPage from '@/page/ErrorPage'

const getOffsetCoordinates = (long: number, lat: number) => {
    return [long - 0.001, lat - 0.001, long + 0.001, lat + 0.001]
}

export default function PreviewPage() {
    const { junctionCoordinates } = useContext(AppContext)
    const [currentJunctionIndex, setCurrentJunctionIndex] = useState(0)
    const Map = useMemo(
        () =>
            dynamic(() => import('@/components/map/'), {
                loading: () => <p>A map is loading</p>,
                ssr: false,
            }),
        []
    )
    const allUrls = useQueries({
        queries:
            junctionCoordinates?.map((it) => {
                const [smallLong, smallLat, bigLong, bigLat] =
                    getOffsetCoordinates(it[0], it[1])

                return {
                    queryKey: [
                        junctionById(smallLong, smallLat, bigLong, bigLat),
                    ],
                    queryFn: async () =>
                        await getStreetImageUrl(
                            smallLong,
                            smallLat,
                            bigLong,
                            bigLat
                        ),
                }
            }) ?? [],
    })
    const nextJunction = () => {
        if (currentJunctionIndex + 1 >= allUrls.length) {
            setCurrentJunctionIndex(0)
        }

        setCurrentJunctionIndex((it) => it + 1)
    }

    if (allUrls.some((it) => it.isLoading)) {
        return <LoadingPage />
    }

    if (allUrls.some((it) => it.isError)) {
        return <ErrorPage />
    }

    return (
        <div className="flex flex-col h-full bg-background">
            <Card className="mx-2 mb-2">
                <CardContent className="p-2">
                    <h2 className="text-2xl font-bold flex items-center">
                        <MapPin className="w-6 h-6 mr-2 text-primary" />
                        <span>#1: Main Street & Broadway</span>
                    </h2>
                </CardContent>
            </Card>

            <main className="flex-1 overflow-hidden flex flex-col">
                <div className="relative w-full flex-1 border-b-4 ">
                    <Image
                        loader={({ src }) => src}
                        src={`${allUrls[currentJunctionIndex].data}`}
                        alt="Intersection of Main Street and Broadway"
                        layout="fill"
                        objectFit="cover"
                        quality={80}
                    />
                </div>

                <div className="relative w-full flex-1">
                    <div className="bg-muted w-full h-full flex items-center justify-center">
                        {/* TODO: get user's location */}
                        <Map posix={[54.72976354954342, 25.263490737244734]} />
                    </div>
                </div>
            </main>

            <div className="px-4 py-2 grid grid-cols-2 gap-4 bg-background">
                <Button
                    variant="outline"
                    className="w-full"
                    onClick={nextJunction}
                >
                    Next Intersection({currentJunctionIndex + 1}/
                    {allUrls.length})
                </Button>
                <Button className="w-full">Navigate</Button>
            </div>
        </div>
    )
}
