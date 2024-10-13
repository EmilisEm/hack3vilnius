import React, { useEffect } from 'react'
import { MapContainer, TileLayer, Polyline, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { LineString } from 'geojson'

interface MapProps {
    posix: [number, number]
    route?: LineString
}

const FitBounds: React.FC<{ route?: LineString }> = ({ route }) => {
    const map = useMap()

    useEffect(() => {
        if (!map) return

        if (route && route.coordinates.length > 0) {
            const routeCoords: [number, number][] = route.coordinates.map(
                (coord) => [coord[1], coord[0]]
            )

            // Create a LatLngBounds object from the route coordinates
            const bounds = L.latLngBounds(routeCoords)

            // Fit the map view to the bounds with padding
            map.fitBounds(bounds, { padding: [50, 50] })
        }
    }, [map, route])

    return null
}

const Map: React.FC<MapProps> = ({ posix, route }) => {
    // Convert route coordinates from [lon, lat] to [lat, lon]
    const routeCoordinates = route
        ? route.coordinates.map(
              (coord) => [coord[1], coord[0]] as [number, number]
          )
        : []

    return (
        <MapContainer
            center={posix}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
        >
            <TileLayer
                attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {route && (
                <Polyline
                    positions={routeCoordinates}
                    color="blue"
                    weight={4}
                    opacity={0.7}
                />
            )}
            {/* Fit the map bounds whenever the route changes */}
            <FitBounds route={route} />
        </MapContainer>
    )
}

export default Map
