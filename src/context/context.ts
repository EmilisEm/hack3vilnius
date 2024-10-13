'use client'
import { osrmResponse } from '@/api/osrm/types/osrmResponse'
import { createContext, Dispatch, SetStateAction } from 'react'

export interface AppContextType {
    junctionCoordinates: [number, number][]
    setJunctionCoordinates: Dispatch<SetStateAction<[number, number][]>>
    routeGlobal: osrmResponse | null
    setRouteGlobal: Dispatch<SetStateAction<osrmResponse | null>>
}

export const AppContext = createContext<AppContextType>({
    junctionCoordinates: [],
    setJunctionCoordinates: () => {},
    routeGlobal: null,
    setRouteGlobal: () => {},
})
