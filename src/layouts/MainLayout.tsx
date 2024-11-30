import { getLocations } from '@/internal/repositories/dummy/ApiDummyRepository';
import { LocationsContext } from '@/services/context';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
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
    setHeaderStatus('route');
  }, []);
  useLayoutEffect(() => {
    loadCurrentGeoLocation().then((pos) => {
      setCurrentPosition(pos.coords);
      getLocations({ lat: `${pos.coords.latitude}`, lon: `${pos.coords.longitude}`, radius: '10' }).then((data) => {
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
