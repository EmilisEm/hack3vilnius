'use client'

import React, {
    useState,
    useMemo,
    useEffect,
    useCallback,
    useContext,
} from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import dynamic from 'next/dynamic'
import { getRoute } from '@/api/osrm/getRoute'
import { LineString } from 'geojson'
import { Coordinates } from '@/api/osrm/types/osrmResponse'
import Link from 'next/link'
import { Bike } from 'lucide-react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { AppContext } from '@/context/context'
import { getMultiLaneStreetIntersections } from '@/api/osrm/parseJunctions'

export default function HomePage() {
    // Fixed stops: Start and End
    const { setJunctionCoordinates, setRouteGlobal } = useContext(AppContext)
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

    // Focus state variables
    const [isStartFocused, setIsStartFocused] = useState<boolean>(false)
    const [isEndFocused, setIsEndFocused] = useState<boolean>(false)

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
    const fetchRoute = useCallback(async () => {
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

            setJunctionCoordinates(
                getMultiLaneStreetIntersections(routeData) || []
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
            setRouteGlobal(routeData)
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
    }, [coordinates])

    // useEffect to automatically fetch route when both coordinates are fetched and inputs are unfocused
    useEffect(() => {
        const areCoordinatesFetched = coordinates[0] && coordinates[1]
        const areInputsUnfocused = !isStartFocused && !isEndFocused

        if (areCoordinatesFetched && areInputsUnfocused) {
            fetchRoute()
        }
    }, [
        coordinates,
        isStartFocused,
        isEndFocused,
        fetchRoute,
        setJunctionCoordinates,
        setRouteGlobal,
    ])

    // Determine start coordinates for centering the map
    const startCoordinates = coordinates[0] || {
        lat: 54.731549,
        lon: 25.261934,
    } // Default to sample start

    return (
        <div className="flex flex-col h-full bg-background relative">
            <main
                id="shiza1"
                className="overflow-hidden flex flex-col relative"
            >
                <div id="shiza" className="border rounded-lg p-4 m-4">
                    <div className="mb-8">
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
                                            onFocus={() => {
                                                if (index === 0)
                                                    setIsStartFocused(true)
                                                else setIsEndFocused(true)
                                            }}
                                            onBlur={() => {
                                                if (index === 0)
                                                    setIsStartFocused(false)
                                                else setIsEndFocused(false)
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
                    </div>

                    {/* Removed "Add Stop" Button and bikeType Select */}

                    <div className="flex items-center space-x-2">
                        <Bike className="w-5 h-5 text-primary" />
                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select bike type" />
                            </SelectTrigger>
                            <SelectContent className="z-20">
                                <SelectItem value="road">Road Bike</SelectItem>
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

            {/* Optional: Remove or Retain the "Go" Button */}
            {/* If you choose to retain it, adjust its disabled state and content accordingly */}
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
                >
                    <Link href="/router/preview">Preview route</Link>
                </Button>
            </div>
        </div>
    )
}
