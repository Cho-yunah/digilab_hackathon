import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import markerIcon from '@/assets/svg/marker.svg';
import pinDifficultIcon from '@/assets/svg/pin_difficult.svg';
import pinEasyIcon from '@/assets/svg/pin_easy.svg';
import pinNormalIcon from '@/assets/svg/pin_normal.svg';
import { getOrsDummy } from '../../internal/repositories/dummy/RouteRepository';
import { RecommendationRouteList } from '../searchBar/RecommendationRouteList';
import { getWheelchairRoutes } from '@/internal/repositories/api/OrsRepository';
import BottomSheet from '../BottomSheet/BottomSheet';
import { LocationsContext } from '@/services/context';
import { MapHeader } from './MapHeader';
import InfoCard from '../infoCard/InfoCard';
import { cn } from '@/lib/utils';
import { SearchList } from '../searchBar/SearchList';

const PIN = {
  '상': pinDifficultIcon,
  '중': pinNormalIcon,
  '하': pinEasyIcon,
}

declare global {
  interface Window {
    naver: typeof naver;
  }
}

interface StaticMapProps {
  width?: number;
  height?: number;
  level?: number;
}

const createLocationPoint = (title: string, address: string, lat: number, lng: number) => {
  return {
    title,
    address,
    lat,
    lng,
  };
};

export const Map: React.FC<StaticMapProps> = ({ level = 16 }) => {
  const API_KEY = process.env.VITE_NAVER_MAP_CLIENT_ID;
  const mapSrc = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${API_KEY}&callback=initMap`;
  const [map, setMap] = useState<any>(null);
  const [currentLoc, setCurrentLoc] = useState<any>(null);

  // 경로 탐색 지점 선택
  const [routePoints, setRoutePoints] = useState<[any, any]>([null, null]);

  const { locations, setMarkers, isRouteSearchMode } = useContext(LocationsContext);

  const showCard = (loc: any) => {
    setCurrentLoc(loc);
  };

  useLayoutEffect(() => {
    const script = document.createElement('script');
    script.src = mapSrc;
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const { naver } = window;
      const { LatLng, Polyline, Map } = naver.maps;
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
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (map && locations.length > 0) {
      const { Marker, Size, Event } = naver.maps;
      const newMarkers = locations.map((loc: any) => {
        const m = new Marker({
          map,
          position: new naver.maps.LatLng(loc.lat, loc.lon),
          icon: { url: PIN[loc['접근성'] as '하'], size: new Size(56, 56), scaledSize: new Size(56, 56) },
          title: loc.title,
        });
        Event.addListener(m, 'click', function (e) {
          map.setCenter(e.coord);
          showCard(loc);
        });
        return m;
      });
      setMarkers((prev: any[]) => {
        prev.forEach((p: any) => p.setMap(null));
        return newMarkers;
      });
    }
  }, [locations]);

  useEffect(() => {
    if (!routePoints[0] || !routePoints[1]) return;
    getWheelchairRoutes(
      `${routePoints[0].lat},${routePoints[0].lng}`,
      `${routePoints[1].lat},${routePoints[1].lng}`
    ).then((res) => {
      console.log(res);
    });
  }, [routePoints]);

  useEffect(() => {
    if (!map) return;
    const { Size, Marker } = naver.maps;
    naver.maps.Event.addListener(map, 'click', function (e: any) {
      console.log('지도 클릭:', e.coord, e.overlay);
    });
    naver.maps.Event.addListener(map, 'dragend', function () {
      setCurrentLoc(null);
    });
    naver.maps.Event.addListener(map, 'rightclick', function (e: any) {
      console.log('지도 우클릭:', e.coord.x, e.coosrd.y, e.overlay);
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
      });
    });
  }, [map]);

  return (
    <div className="relative">
      <div id="map" style={{ width: '100%', height: '100vh', overflow: 'hidden', borderRadius: '10px' }} />
      {isRouteSearchMode && (
        <div className="absolute w-full h-screen top-0 left-0 pt-[108px] z-[1000] bg-white">
          <div className="relative h-full">
            <SearchList />
          </div>
        </div>
      )}
      <MapHeader />
      <div>{/* 플로팅 액션 버튼 */}</div>
      <BottomSheet />

      <div className={cn('absolute bottom-0 left-0 w-full p-4', { hidden: !currentLoc })}>
        <InfoCard data={currentLoc} onClose={() => setCurrentLoc(null)} />
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
