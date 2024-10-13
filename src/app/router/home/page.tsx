'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { PlusCircle, MapPin, Bike, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { ScrollArea } from '@/components/ui/scroll-area'
import dynamic from 'next/dynamic'
import Link from 'next/link'

const HomePage = () => {
    const [stops, setStops] = useState(['', ''])
    const [filledStops, setFilledStops] = useState(0)

    useEffect(() => {
        const filled = stops.filter((stop) => stop.trim() !== '').length
        setFilledStops(filled)
    }, [stops])

    const addStop = () => {
        if (stops.length < 5) {
            // Limit to 5 stops for this example
            setStops([...stops, ''])
        }
    }

    const updateStop = (index: number, value: string) => {
        const newStops = [...stops]
        newStops[index] = value
        setStops(newStops)
    }

    const removeStop = (index: number) => {
        if (stops.length > 2) {
            const newStops = stops.filter((_, i) => i !== index)
            setStops(newStops)
        }
    }

    const Map = useMemo(
        () =>
            dynamic(() => import('@/components/map/'), {
                loading: () => <p>A map is loading</p>,
                ssr: false,
            }),
        []
    )

    return (
        <div className="flex flex-col h-full bg-background">
            <main className="flex-1 overflow-hidden flex flex-col relative">
                <div className="border rounded-lg p-4 m-4 space-y-4">
                    <ScrollArea className="h-[15vh] border rounded-md p-2">
                        {stops.map((stop, index) => (
                            <div
                                key={index}
                                className="flex items-center space-x-2 mb-2"
                            >
                                <MapPin className="w-5 h-5 text-primary shrink-0" />
                                <div className="flex w-full items-center space-x-2">
                                    <Input
                                        className="flex-1" // Allow input to take up remaining space
                                        placeholder={
                                            index === 0
                                                ? 'Start'
                                                : index === stops.length - 1
                                                  ? 'End'
                                                  : `Stop ${index}`
                                        }
                                        value={stop}
                                        onChange={(e) =>
                                            updateStop(index, e.target.value)
                                        }
                                    />
                                    {index !== 0 &&
                                        index !== stops.length - 1 && (
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() =>
                                                    removeStop(index)
                                                }
                                                className="shrink-0"
                                            >
                                                <X className="w-4 h-4" />
                                            </Button>
                                        )}
                                </div>
                            </div>
                        ))}
                    </ScrollArea>

                    <div className="space-y-2">
                        <div className="h-10">
                            {filledStops >= 2 && stops.length < 5 ? (
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={addStop}
                                >
                                    <PlusCircle className="w-4 h-4 mr-2" />
                                    Add stop
                                </Button>
                            ) : (
                                // Invisible placeholder keeps layout intact
                                <div className="w-full h-full"></div>
                            )}
                        </div>

                        <div className="flex items-center space-x-2">
                            <Bike className="w-5 h-5 text-primary" />
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select bike type" />
                                </SelectTrigger>
                                <SelectContent className="z-20">
                                    <SelectItem value="road">
                                        Road Bike
                                    </SelectItem>
                                    <SelectItem value="mountain">
                                        Mountain Bike
                                    </SelectItem>
                                    <SelectItem value="electric">
                                        Electric Bike/Scooter
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                <div className="flex-1 w-full py-2">
                    <div className="bg-muted w-full h-full flex items-center justify-center">
                        {/* TODO: get user's location */}
                        <Map posix={[54.72976354954342, 25.263490737244734]} />
                    </div>
                </div>
            </main>

            <div className="px-4 pb-4 pt-1">
                <Button className="w-full" size="lg" disabled={filledStops < 2}>
                    <Link href="/router/preview">Go</Link>
                </Button>
            </div>
        </div>
    )
}

export default HomePage
