'use client'
import { osrmResponse, RouteData } from '@/api/osrm/types/osrmResponse'
import { createContext, Dispatch, SetStateAction } from 'react'

export interface AppContextType {
    junctionCoordinates: [number, number][]
    setJunctionCoordinates: Dispatch<SetStateAction<[number, number][]>>
    routeGlobal: RouteData | null
    setRouteGlobal: Dispatch<SetStateAction<RouteData | null>>
}

export const AppContext = createContext<AppContextType>({
    junctionCoordinates: [],
    setJunctionCoordinates: () => {},
    routeGlobal: null,
    setRouteGlobal: () => {},
})
