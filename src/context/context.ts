'use client'
import { createContext, Dispatch, SetStateAction } from "react"

export interface AppContextType {
    junctionCoordinates: [number, number] | null,
    setJunctionCoordinates: Dispatch<SetStateAction<[number, number] | null>>
}

export const AppContext = createContext<AppContextType | null>(null);