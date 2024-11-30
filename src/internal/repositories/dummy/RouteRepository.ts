import { dummies as orsDummies } from './mock/ors';
import { dummies as osrmDummies } from './mock/osrm';

export const getOrsDummy = (name: keyof typeof orsDummies) => orsDummies[name].features[0].geometry.coordinates;
export const getOsrmDummy = (name: keyof typeof osrmDummies) =>
  osrmDummies[name].routes[0].legs[0].steps.map((step: any) => step.maneuver.location);
