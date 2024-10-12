'use client'
import { createContext, Dispatch, SetStateAction } from 'react'

export interface AppContextType {
    junctionCoordinates: [number, number][]
    setJunctionCoordinates: Dispatch<SetStateAction<[number, number][]>>
}

export const AppContext = createContext<AppContextType>({
    junctionCoordinates: [
        [25.261673, 54.731551],
        [25.261712, 54.732388],
        [25.265382, 54.732177],
        [25.266687, 54.729014],
        [25.266959, 54.728904],
    ],
    setJunctionCoordinates: () => {},
})
