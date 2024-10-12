'use client'

import React, { useMemo } from 'react'
import Image from 'next/image'
import { MapPin } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import dynamic from "next/dynamic";

export default function PreviewPage() {
    const imageLoader = ({ src, width, quality }) => {
        return `https://placeholder.co/${width}x${width}?q=${quality || 75}`
    }

    const Map = useMemo(() => dynamic(
        () => import('@/components/map/'),
        {
            loading: () => <p>A map is loading</p>,
            ssr: false
        }
    ), [])

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
                        loader={imageLoader}
                        src="placeholder"
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
                <Button variant="outline" className="w-full">
                    Next Intersection(1/n)
                </Button>
                <Button className="w-full">
                    Navigate
                </Button>
            </div>
        </div>
    )
}