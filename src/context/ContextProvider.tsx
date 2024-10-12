import React, { ReactNode, useState } from 'react'
import { AppContext } from './context'

const AppContextProvider = ({children}: {children: ReactNode}) => {
    const [junctionCoordinates, setJunctionCoordinates] = useState<[number, number] | null>(null)
  return (
    <AppContext.Provider value={{junctionCoordinates, setJunctionCoordinates}}>
        {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider