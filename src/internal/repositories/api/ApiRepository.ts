import { createApi } from "./core";

const API_BASE = 'http://43.202.62.146/api';

const api = createApi(API_BASE);

export function getWheelchairRoutes(start: string, end: string) {
  return api.get('/routes/accessible', {
    params: {
      start,
      end,
    },
  });
}

export function getWalkingRoutes(start: string, end: string) {
  return api.get('/routes/accessible', {
    params: {
      start,
      end,
    },
  });
}
