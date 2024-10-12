export type RouteData = {
  code: string;
  routes: Route[];
};

export type Route = {
  geometry: Geometry;
  legs: Leg[];
};

export type Geometry = {
  coordinates: [number, number][];
  type: string;  // should be "LineString"
};

export type Leg = {
  steps: Step[];
  distance: number;
  duration: number;
  weight: number;
};

export type Step = {
  geometry: Geometry;
  maneuver: Maneuver;
  mode: string;  // e.g., "driving"
  driving_side: string;  // e.g., "right"
  name: string;
  intersections: Intersection[];
  weight: number;
  duration: number;
  distance: number;
};

export type Maneuver = {
  bearing_after: number;
  bearing_before: number;
  location: [number, number];  // [longitude, latitude]
  modifier?: string;   // e.g., "right", "left"
  type: string;        // e.g., "depart", "turn", "on ramp"
};

export type Intersection = {
  out: number;
  in?: number;
  entry: boolean[];
  bearings: number[];
  location: [number, number];  // [longitude, latitude]
  lanes?: Lane[];
};

export type Lane = {
  valid: boolean;
  indications: string[];  // e.g., ["left", "straight"]
};
