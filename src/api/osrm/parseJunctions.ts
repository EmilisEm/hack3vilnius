import { Intersection, RouteData, Step } from "./types/osrmResponse";

export function getIntersections(data: RouteData) {
    if (data && data.routes && data.routes.length > 0) {
      const steps = data.routes[0].legs[0].steps;
      
      // Extract intersection coordinates
      const intersections: [number, number][] = [];
      steps.forEach((step: Step) => {
        step.intersections.forEach((intersection: Intersection) => {
            let entryTrueCount = 0;
            intersection.entry.forEach(e => entryTrueCount += e ? 1 : 0);
            if (entryTrueCount >= 3) {
                intersections.push(intersection.location);
            }
        });
      });
      
      return intersections;
    }

    return null;
}