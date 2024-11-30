import { createApi } from './core';

const API_BASE = 'https://api.openrouteservice.org';
const API_KEY = '5b3ce3597851110001cf6248bd822f9d75cd474caa73195bb0970318';

const api = createApi(API_BASE, { headers: { Authorization: API_KEY } });

export const getWheelchairRoutes = async (start: string, end: string) => {
  return api.get('/v2/directions/wheelchair', {
    params: {
      start,
      end,
      api_key: API_KEY,
    },
  });
};

export const getFootWalkingRoutes = async (start: string, end: string) => {
  return api.get('/v2/directions/foot-walking', {
    params: {
      start,
      end,
      api_key: API_KEY,
    },
  });
};

export const getElevation = async (geometry: string) => {
  return api.get('/elevation/point', {
    params: { api_key: API_KEY, geometry, format_out: 'point', dataset: 'strm' },
  });
};
