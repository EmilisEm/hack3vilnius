import { Compass } from 'lucide-react'
import { Button } from '@/components/ui/button'
import React, { useMemo } from 'react'
import dynamic from 'next/dynamic'

export default function NavigationPage() {
    const Map = useMemo(
        () =>
            dynamic(() => import('@/components/map/'), {
                loading: () => <p>A map is loading</p>,
                ssr: false,
            }),
        []
    )
    return (
        <div className="relative h-full w-full bg-gray-100 overflow-hidden">
            <div className="absolute inset-0 bg-muted">
                <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                    {/* TODO: get user's location */}
                    <Map posix={[54.72976354954342, 25.263490737244734]} />
                </div>
            </div>

            {/* TODO: center to user's location */}
            <div className="absolute top-5 right-4 flex flex-col gap-2 z-10">
                <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-full bg-white shadow-md"
                >
                    <Compass className="h-6 w-6 text-blue-500" />
                </Button>
            </div>

            <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-xl shadow-lg p-4 z-10">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-semibold">
                            Bike to Linkmenų g. 28
                        </h2>
                        <p className="text-sm text-gray-600">Via Ozo g.</p>
                    </div>
                    <div className="text-right">
                        <p className="text-lg font-semibold">10 min</p>
                        <p className="text-sm text-gray-600">1.5 km</p>
                    </div>
                </div>

                {/* TODO: go to end of trip screen for possibility of reporting */}
                <Button className="w-full bg-red-500 hover:bg-red-600 text-white">
                    End trip
                </Button>
            </div>
        </div>
    )
}
