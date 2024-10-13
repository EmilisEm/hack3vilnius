'use client'

import React, { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import dynamic from 'next/dynamic'
import { getRoute } from '@/api/osrm/getRoute'
import { LineString } from 'geojson'
import { Coordinates } from '@/api/osrm/types/osrmResponse'
import Link from 'next/link'

export default function HomePage() {
    // Fixed stops: Start and End
    const [stops, setStops] = useState<string[]>(['', ''])
    const [coordinates, setCoordinates] = useState<(Coordinates | null)[]>([
        null,
        null,
    ])
    const [loadingStates, setLoadingStates] = useState<boolean[]>([
        false,
        false,
    ])
    const [errors, setErrors] = useState<(string | null)[]>([null, null])

    // State variables for route
    const [route, setRoute] = useState<LineString | null>(null)
    const [routeLoading, setRouteLoading] = useState<boolean>(false)
    const [routeError, setRouteError] = useState<string | null>(null)

    // Dynamically import Map component
    const Map = useMemo(
        () =>
            dynamic(() => import('@/components/map/'), {
                loading: () => <p>A map is loading</p>,
                ssr: false,
            }),
        []
    )

    // Function to fetch coordinates for a single address
    const fetchCoordinates = async (
        address: string,
        index: number
    ): Promise<void> => {
        const encodedAddress = encodeURIComponent(address)
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}&limit=1&addressdetails=1`

        // Update loading state
        const newLoadingStates = [...loadingStates]
        newLoadingStates[index] = true
        setLoadingStates(newLoadingStates)

        // Clear previous errors
        const newErrors = [...errors]
        newErrors[index] = null
        setErrors(newErrors)

        try {
            const response = await fetch(url, {
                headers: {
                    'Accept-Language': 'en', // Optional: Specify language
                    'User-Agent': 'YourAppName/1.0 (your.email@example.com)', // **Important:** Replace with your app name and contact info
                },
            })

            if (!response.ok) {
                throw new Error(`Error fetching data: ${response.statusText}`)
            }

            const data = await response.json()

            if (data.length === 0) {
                // No results found
                const updatedCoordinates = [...coordinates]
                updatedCoordinates[index] = null
                setCoordinates(updatedCoordinates)

                const updatedErrors = [...errors]
                updatedErrors[index] = 'Coordinates not found.'
                setErrors(updatedErrors)
            } else {
                const coord: Coordinates = {
                    lat: parseFloat(data[0].lat),
                    lon: parseFloat(data[0].lon),
                }

                const updatedCoordinates = [...coordinates]
                updatedCoordinates[index] = coord
                setCoordinates(updatedCoordinates)
            }
        } catch (err) {
            console.error(err)
            const updatedErrors = [...errors]
            updatedErrors[index] = 'Failed to fetch coordinates.'
            setErrors(updatedErrors)
        } finally {
            // Update loading state
            const updatedLoadingStates = [...loadingStates]
            updatedLoadingStates[index] = false
            setLoadingStates(updatedLoadingStates)
        }
    }

    // Function to update stop address
    const updateStop = (index: number, value: string) => {
        const newStops = [...stops]
        newStops[index] = value
        setStops(newStops)
    }

    // Function to fetch the route
    const fetchRoute = async () => {
        if (!coordinates[0] || !coordinates[1]) {
            setRouteError('Start and End coordinates are required.')
            return
        }

        const start = coordinates[0]
        const end = coordinates[1]

        if (!start || !end) {
            setRouteError('Invalid coordinates.')
            return
        }

        setRouteLoading(true)
        setRouteError(null)
        setRoute(null) // Clear previous route

        try {
            const routeData = await getRoute(
                start.lon,
                start.lat,
                end.lon,
                end.lat
            )

            // Debugging: Log the received routeData
            console.log('Received Route Data:', routeData)

            if (routeData.code !== 'Ok' || routeData.routes.length === 0) {
                throw new Error('No route found.')
            }

            // Assuming routeData.routes[0].geometry is a GeoJSON LineString
            const routeGeometry: LineString = routeData.routes[0]
                .geometry as LineString
            setRoute(routeGeometry)
        } catch (error: unknown) {
            console.error(error)
            if (error instanceof Error) {
                setRouteError(error.message || 'Failed to fetch route.')
            } else {
                setRouteError('An unknown error occurred.')
            }
        } finally {
            setRouteLoading(false)
        }
    }

    // Determine start coordinates for centering the map
    const startCoordinates = coordinates[0] || {
        lat: 54.731549,
        lon: 25.261934,
    } // Default to sample start

    const getButton = () => {
        console.log(routeLoading, coordinates)
        if (routeLoading) {
            return <span>Fetching Route...</span>
        } else if (!coordinates[0] || !coordinates[1]) {
            return <span>Fetch route</span>
        } else if (route) {
            return <Link href="/router/preview">Preview route</Link>
        }
    }

    return (
        <div className="flex flex-col h-full bg-background relative">
            <main className="flex-1 overflow-hidden flex flex-col relative">
                <div className="border rounded-lg p-4 m-4 space-y-4">
                    <ScrollArea className="h-[15vh] border rounded-md p-2 overflow-auto">
                        {stops.map((stop, index) => (
                            <div key={index} className="flex flex-col mb-4">
                                <div className="flex items-center space-x-2">
                                    {/* Removed MapPin icon */}
                                    <div className="flex w-full items-center space-x-2">
                                        <Input
                                            className="flex-1"
                                            placeholder={
                                                index === 0 ? 'Start' : 'End'
                                            }
                                            value={stop}
                                            onChange={(e) =>
                                                updateStop(
                                                    index,
                                                    e.target.value
                                                )
                                            }
                                            onBlur={() => {
                                                if (stop.trim() !== '') {
                                                    fetchCoordinates(
                                                        stop,
                                                        index
                                                    )
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                                {/* Removed Coordinates Display */}
                            </div>
                        ))}
                    </ScrollArea>

                    {/* Removed "Add Stop" Button and bikeType Select */}
                </div>

                {/* Display Route Error */}
                {routeError && (
                    <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-red-500 text-white p-2 rounded shadow-lg z-50">
                        {routeError}
                    </div>
                )}
            </main>

            {/* Map Display */}
            <div className="flex-1 w-full py-2">
                <div className="bg-muted w-full h-full flex items-center justify-center">
                    {route ? (
                        <Map
                            posix={[startCoordinates.lat, startCoordinates.lon]}
                            route={route}
                        />
                    ) : (
                        <p>No route to display.</p>
                    )}
                </div>
            </div>
            {/* "Go" Button */}
            <div className="px-4 pb-4 pt-1">
                <Button
                    className="w-full"
                    size="lg"
                    disabled={
                        !stops[0].trim() ||
                        !stops[1].trim() ||
                        loadingStates.some((loading) => loading) ||
                        errors.some((error) => error !== null) ||
                        routeLoading
                    }
                    onClick={!!coordinates ? fetchRoute : () => null}
                >
                    {getButton()}
                </Button>
            </div>
        </div>
    )
}
