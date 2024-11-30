import React, { useEffect, useLayoutEffect, useState } from 'react';
import markerIcon from '@/assets/svg/marker.svg';
import { getOrsDummy } from '../../internal/repositories/dummy/RouteRepository';
import SearchRoute from '../searchBar/SearchRoute';
import { RecommendationRouteList } from '../searchBar/RecommendationRouteList';
import { getWheelchairRoutes } from '@/internal/repositories/api/OrsRepository';


declare global {
  interface Window {
    naver: any;
  }
}

interface StaticMapProps {
  width?: number;
  height?: number;
  level?: number;
}

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

const createLocationPoint = (title: string, address: string, lat: number, lng: number) => {
  return {
    title,
    address,
    lat,
    lng,
  }
}

export const Map: React.FC<StaticMapProps> = ({ width = 440, level = 16 }) => {
  const API_KEY = process.env.VITE_NAVER_MAP_CLIENT_ID;
  const mapSrc = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${API_KEY}&callback=initMap`;
  const [map, setMap] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const [currentPosition, setCurrentPosition] = useState<GeolocationCoordinates>();
  
  // 경로 탐색 지점 선택
  const [routePoints, setRoutePoints] = useState<[any, any]>([null, null]);
  const [routes, setRoutes] = useState<any[]>([]);


  useEffect(() => {
    if (map && currentPosition) {
      const { LatLng } = window.naver.maps;
      map.setCenter(new LatLng(currentPosition.latitude, currentPosition.longitude));
      console.log('set center');
    }
  }, [currentPosition, map])

  useLayoutEffect(() => {
    const script = document.createElement('script');
    script.src = mapSrc;
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const { naver } = window;
      const { LatLng, Polyline, Map, Size, Marker } = naver.maps;
      const map = new Map('map', {
        center: new LatLng(33.4498632234159, 126.918168422686),
        zoom: level,
      });
      setMap(map);

      const path = getOrsDummy('footWalking').map((geo) => new LatLng(geo[1], geo[0]));

      new Polyline({
        map,
        path: path.slice(0, 4),
        strokeColor: '#ffffff',
        strokeWeight: 18,
        strokeLineCap: 'round',
      });
      new Polyline({
        map,
        path: path.slice(3, 8),
        strokeColor: '#ffffff',
        strokeWeight: 18,
        strokeLineCap: 'round',
      });
      new Polyline({
        map,
        path: path.slice(7),
        strokeColor: '#ffffff',
        strokeWeight: 18,
        strokeLineCap: 'round',
      });
      new Polyline({
        map,
        path: path.slice(0, 4),
        strokeColor: '#ff3030',
        strokeWeight: 12,
        strokeLineCap: 'round',
      });
      new Polyline({
        map,
        path: path.slice(3, 8),
        strokeColor: '#00ae3a',
        strokeWeight: 12,
        strokeLineCap: 'round',
      });
      new Polyline({
        map,
        path: path.slice(7),
        strokeColor: '#ff9b30',
        strokeWeight: 12,
        strokeLineCap: 'round',
      });

      // 지도 클릭 이벤트
      
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    console.log(routePoints);
    if (!routePoints[0] || !routePoints[1]) return;
    getWheelchairRoutes(`${routePoints[0].lat},${routePoints[0].lng}`, `${routePoints[1].lat},${routePoints[1].lng}`).then((res) => {
      console.log(res);
    });
  }, [routePoints]);

  useEffect(() => {
    if (!map) return;
    const { Size, Marker } = window.naver.maps;
    naver.maps.Event.addListener(map, 'click', function (e: any) {
      console.log('지도 클릭:', e.coord, e.overlay);
    });
    naver.maps.Event.addListener(map, 'rightclick', function (e: any) {
      console.log('지도 우클릭:', e.coord.x, e.coord.y, e.overlay);
      const marker = new Marker({
        map,
        position: e.coord,
        icon: { url: markerIcon, size: new Size(28, 28), scaledSize: new Size(28, 28) },
        clickable: true,
      });
      naver.maps.Event.addListener(marker, 'click', function () {
        marker.setMap(null);
      });
      setRoutePoints(([start, end]) => {
        if (!start) return [createLocationPoint('start point', '', e.coord.lat(), e.coord.lng()), null];
        if (!end) return [start, createLocationPoint('end point', '', e.coord.lat(), e.coord.lng())];
        if (start && end) return [null, null];
        return [start, end];
      })
    });
  }, [map])

  useEffect(() => {
    loadCurrentGeoLocation().then((pos) => {
      setCurrentPosition(pos.coords);
    });
  }, []);

  return (
    <div className="relative">
      <div id="map" style={{ width, height: '100vh', overflow: 'hidden', borderRadius: '10px' }} />
      {/* <div className='absolute m-2'>
        <SearchBar />
      </div> */}
      <div className="absolute top-0 left-0 w-full">
        <SearchRoute start={routePoints[0]} end={routePoints[1]} />
      </div>
      <div className="absolute bottom-0 left-0 w-full p-4 overflow-x-auto">
        <RecommendationRouteList
          routes={[
            {
              name: '느린걸음',
              duration: 12 * 60,
              distance: '423m',
              hint: '노약자, 임산부 등',
            },
            {
              name: '휠체어',
              duration: 24 * 60,
              distance: '423m',
              hint: '수동 휠체어',
            },
            {
              name: '목발',
              duration: 36 * 60,
              distance: '423m',
              hint: '목발 사용자',
            },
          ]}
        />
      </div>
    </div>
  );
};
