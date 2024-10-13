import React, { ReactNode, useState } from 'react'
import { AppContext } from './context'
import { RouteData } from '@/api/osrm/types/osrmResponse'

const AppContextProvider = ({ children }: { children: ReactNode }) => {
    const [junctionCoordinates, setJunctionCoordinates] = useState<
        [number, number][]
    >([
        [25.261673, 54.731551],
        [25.261712, 54.732388],
        [25.265382, 54.732177],
        [25.266687, 54.729014],
        [25.266959, 54.728904],
    ])

    const [globalRoute, setGlobalRoute] = useState<RouteData | null>(null)
    return (
        <AppContext.Provider
            value={{
                junctionCoordinates,
                setJunctionCoordinates,
                routeGlobal: globalRoute,
                setRouteGlobal: setGlobalRoute,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider
