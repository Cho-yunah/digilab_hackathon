import { getFootWalkingRoutes, getWheelchairRoutes } from '@/internal/repositories/api/OrsRepository';
import { getLocations } from '@/internal/repositories/dummy/ApiDummyRepository';
import { LocationsContext } from '@/services/context';
import { useCallback, useLayoutEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

type HeaderStatus = 'map' | 'search' | 'route' | 'detail';

async function loadCurrentGeoLocation(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      function (e) {
        resolve(e);
      },
      function (e) {
        reject(e);
      },
      {
        enableHighAccuracy: true,
        timeout: 60 * 60 * 1000,
        maximumAge: 0,
      }
    );
  });
}

const getDuration = (duration: number) => {
  const min = Math.round(duration / 60);
  if (min < 1) return '1분 미만';
  return `${min}분`;
};

const MainLayout = () => {
  const [locations, setLocations] = useState<any[]>([]);
  const [sites, setSites] = useState<any[]>([]);
  const [query, setQuery] = useState<any>({});
  const [routePoints, setRoutePoints] = useState<[any, any]>([null, null]);
  const [headerStatus, setHeaderStatus] = useState<HeaderStatus>('map');
  const [markers, setMarkers] = useState<any[]>([]);
  const [currentPosition, setCurrentPosition] = useState<GeolocationCoordinates>();
  const [routes, setRoutes] = useState<any[]>([]);
  const [isRouteSearchMode, setIsRouteSearchMode] = useState(false);
  const loadCurrentData = useCallback((coords: any) => {
    getLocations({ lat: `${coords.lat}`, lon: `${coords.lng}`, radius: '1000' }).then((data) => {
      setLocations(data);
    });
  }, []);
  const setCurrentToDestination = useCallback(async (destination: any) => {
    const geo = await loadCurrentGeoLocation();
    setCurrentPosition(geo.coords);
    setRoutePoints([
      {
        title: '현재 위치',
        address: '',
        lat: geo.coords.latitude,
        lng: geo.coords.longitude,
      },
      destination,
    ]);
  }, []);
  const findRoute = useCallback(async (locData: any) => {
    
    let start = routePoints[0];
    if (!start) {
      const geo = await loadCurrentGeoLocation();
      start = {
        title: '현재 위치',
        address: '',
        lat: geo.coords.latitude,
        lng: geo.coords.longitude,
      }
    }
    const end = routePoints[1] || locData;
    setRoutePoints([start, end]);
    if (start && end) {
      Promise.all([
        getWheelchairRoutes(
          `${start.lng},${start.lat}`,
          `${end.lng},${end.lat}`
        ),
        getFootWalkingRoutes(
          `${start.lng},${start.lat}`,
          `${end.lng},${end.lat}`
        ),
      ]).then(([wheelchair, walking]: [any, any]) => {
        setRoutes([
          {
            name: '느린걸음',
            duration: `${getDuration(Math.round(walking.summary.duration))}`,
            distance: `${Math.round(walking.summary.distance)}m`,
            hint: '노약자, 임산부 등',
            coords: walking.coords,
          },
          {
            name: '휠체어',
            duration: `${getDuration(Math.round(wheelchair.summary.duration))}`,
            distance: `${Math.round(wheelchair.summary.distance)}m`,
            hint: '수동 휠체어',
            coords: wheelchair.coords,
          },
          {
            name: '목발',
            duration: `${getDuration(Math.round(walking.summary.duration))}`,
            distance: `${Math.round(walking.summary.distance)}m`,
            hint: '목발 사용자',
            coords: walking.coords,
          },
        ]);
      });
    }
    setHeaderStatus('route');
  }, [setCurrentToDestination]);
  

  useLayoutEffect(() => {
    loadCurrentGeoLocation().then((pos) => {
      setCurrentPosition(pos.coords);
      getLocations({ lat: `${pos.coords.latitude}`, lon: `${pos.coords.longitude}`, radius: '1000' }).then((data) => {
        setLocations(data);
        setSites(data.slice(0, 10));
      });
    });
  }, []);
  return (
    <LocationsContext.Provider
      value={{
        locations,
        setLocations,
        markers,
        setMarkers,
        query,
        setQuery,
        routePoints,
        setRoutePoints,
        sites,
        setSites,
        headerStatus,
        setHeaderStatus,
        setCurrentToDestination,
        currentPosition,
        setCurrentPosition,
        routes,
        setRoutes,
        isRouteSearchMode,
        setIsRouteSearchMode,
        findRoute,
        loadCurrentData,
      }}
    >
      <div className="relative layout-container">
        <main className="overflow-auto">
          <Outlet />
        </main>
      </div>
    </LocationsContext.Provider>
  );
};

export default MainLayout;
