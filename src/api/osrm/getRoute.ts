import axios from 'axios'
import { RouteData } from './types/osrmResponse'

export const getRoute = async (
    minLong: number,
    minLat: number,
    maxLong: number,
    maxLat: number
): Promise<RouteData> => {
    const pathResponse = await axios.get(
        `https://jorislisas.com/osrm/route/v1/bike/${minLong},${minLat};${maxLong},${maxLat}?steps=true&geometries=geojson&annotations=true`
    )

    const parsedData = pathResponse.data as RouteData
    return parsedData
}
