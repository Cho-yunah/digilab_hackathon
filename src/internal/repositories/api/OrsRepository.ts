import { createApi } from './core';

const API_BASE = 'https://a2ed-59-8-75-201.ngrok-free.app/api';

const api = createApi(API_BASE);

export const getWheelchairRoutes = async (start: string, end: string) => {
  const res = await api.get('/routes/wheelchair', {
    params: {
      start,
      end,
    },
  });
  const data = await res.json();
  const coords = data.features[0].geometry.coordinates;
  const summary = data.features[0].properties.summary;
  return { coords, summary };
};

export const getFootWalkingRoutes = async (start: string, end: string) => {
  const res = await api.get('/routes/walking', {
    params: {
      start,
      end,
    },
  });
  const data = await res.json();
  const coords = data.features[0].geometry.coordinates;
  const summary = data.features[0].properties.summary;
  return { coords, summary };
};

export const getElevation = async (geometry: string) => {
  const res = await api.get('/routes/elevation', {
    params: { geometry },
  });
  const data = await res.json();
  return data.geometry.coordinates[2];
};
