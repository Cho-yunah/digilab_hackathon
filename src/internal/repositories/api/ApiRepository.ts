import { createApi } from "./core";

const API_BASE = 'http://43.202.62.146/api';

const api = createApi(API_BASE);

export async function getWheelchairRoutes(start: string, end: string) {
  return api.get('/routes/wheelchair', {
    params: {
      start,
      end,
    },
  });
}

export async function getWalkingRoutes(start: string, end: string) {
  return api.get('/routes/walking', {
    params: {
      start,
      end,
    },
  });
}

export async function exchangeElevation(start: string, end: string) {
  return api.get('/routes/elevation', {
    params: {
      start,
      end,
    },
  });
}


type Param = {
  category?: string;
  userType?: string;
  title?: string;
  lat?: string;
  lon?: string;
  radius?: string;
}

export async function getLocations(param: Param) {
  const locations = await api.get('/accessibility/filter', {
    params: param,
  });
  const data = await locations.json();
  return data;
}
