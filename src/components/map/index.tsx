import React, { useEffect } from 'react'
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    Polyline,
    useMap,
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { Coordinates } from '@/api/osrm/types/osrmResponse'

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

// Define a custom Leaflet icon
const customIcon = new L.Icon({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
})

interface MapProps {
    posix: [number, number]
    markers: Coordinates[]
    route?: GeoJSON.LineString
}

const FitBounds: React.FC<{
    markers: Coordinates[]
    route?: GeoJSON.LineString
}> = ({ markers, route }) => {
    const map = useMap()

    useEffect(() => {
        if (!map) return

        // Initialize an array to hold all points
        let allPoints: [number, number][] = []

        // Add markers to the points
        markers.forEach((marker) => {
            allPoints.push([marker.lat, marker.lon])
        })

        // Add route coordinates to the points
        if (route) {
            const routeCoords: [number, number][] = route.coordinates.map(
                (coord) => [coord[1], coord[0]]
            )
            allPoints = allPoints.concat(routeCoords)
        }

        if (allPoints.length === 0) return

        // Create a LatLngBounds object
        const bounds = L.latLngBounds(allPoints)

        // Fit the map view to the bounds with padding
        map.fitBounds(bounds, { padding: [50, 50] })
    }, [map, markers, route])

    return null
}

const Map: React.FC<MapProps> = ({ posix, markers, route }) => {
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
            {markers.map((marker, index) => (
                <Marker
                    key={index}
                    position={[marker.lat, marker.lon]}
                    icon={customIcon}
                >
                    <Popup>
                        {index === 0
                            ? 'Start'
                            : index === markers.length - 1
                              ? 'End'
                              : `Stop ${index}`}
                        <br />
                        Lat: {marker.lat.toFixed(6)}, Lon:{' '}
                        {marker.lon.toFixed(6)}
                    </Popup>
                </Marker>
            ))}
            {route && (
                <Polyline
                    positions={routeCoordinates}
                    color="blue"
                    weight={4}
                    opacity={0.7}
                />
            )}
            {/* Fit the map bounds whenever markers or route change */}
            <FitBounds markers={markers} route={route} />
        </MapContainer>
    )
}

export default Map
