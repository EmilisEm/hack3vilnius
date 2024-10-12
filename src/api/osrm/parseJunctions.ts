import { Intersection, RouteData, Step } from './types/osrmResponse'

export function getMultiLaneStreetIntersections(data: RouteData) {
    if (data && data.routes && data.routes.length > 0) {
        const steps = data.routes[0].legs[0].steps

        // Extract intersections that cross multiLaneStreet
        const multiLaneStreetIntersections: [number, number][] = []
        steps.forEach((step: Step) => {
            step.intersections.forEach((intersection: Intersection) => {
                if (intersection.classes && intersection.classes.includes('multiLaneStreet')) {
                    multiLaneStreetIntersections.push(intersection.location)
                }
            })
        })

        return multiLaneStreetIntersections
    }

    return null
}
