import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import markerIcon from '@/assets/svg/marker.svg';
import pinDifficultIcon from '@/assets/svg/pin_difficult.svg';
import pinEasyIcon from '@/assets/svg/pin_easy.svg';
import pinNormalIcon from '@/assets/svg/pin_normal.svg';
import pinDestIcon from '@/assets/svg/destination.svg';
import pinPointIcon from '@/assets/svg/point.svg';
import { RecommendationRouteList } from '../searchBar/RecommendationRouteList';
import { getElevation } from '@/internal/repositories/api/OrsRepository';
import BottomSheet from '../BottomSheet/BottomSheet';
import { LocationsContext } from '@/services/context';
import { MapHeader } from './MapHeader';
import InfoCard from '../infoCard/InfoCard';
import { cn } from '@/lib/utils';
import { SearchList } from '../searchBar/SearchList';

const PIN = {
  상: pinDifficultIcon,
  중: pinNormalIcon,
  하: pinEasyIcon,
};

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

const GROUP_SIZE = 7;

export const Map: React.FC<StaticMapProps> = ({ level = 16 }) => {
  const API_KEY = process.env.VITE_NAVER_MAP_CLIENT_ID;
  const mapSrc = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${API_KEY}&callback=initMap`;
  const [map, setMap] = useState<any>(null);
  const [currentLoc, setCurrentLoc] = useState<any>(null);
  const [polyLines, setPolyLines] = useState<any[]>([]);
  const [_, setRouteMakrers] = useState<any[]>([]);

  const { locations, setMarkers, headerStatus, isRouteSearchMode, routes } = useContext(LocationsContext);

  const showCard = (loc: any) => {
    setCurrentLoc(loc);
  };

  const selectRoute = async (route: any) => {
    const { Polyline, LatLng } = naver.maps;

    const path = route.coords.map((geo: any) => new LatLng(geo[1], geo[0]));

    const colorMap = {
      difficult: '#ff3030',
      normal: '#ff9b30',
      easy: '#00ae3a',
    };

    polyLines.forEach((poly) => poly.setMap(null));

    const elevations = await Promise.all(
      route.coords
        .filter((_: any, i: number) => i % GROUP_SIZE === 0)
        .map((geo: any) => getElevation(`${geo[0]},${geo[1]}`))
    );
    const lines: any[] = [];

    const bgPoly = new Polyline({
      map,
      path: path,
      strokeColor: '#ffffff',
      strokeWeight: 18,
      strokeLineCap: 'round',
    });

    lines.push(bgPoly);

    for (let i = 0, j = 0; i < route.coords.length; i += GROUP_SIZE, j += 1) {
      const diff = Math.abs(elevations[j] - (elevations[j + 1] ?? elevations[j]));
      const line = new Polyline({
        map,
        path: path.slice(Math.max(i - 1, 0), i + GROUP_SIZE),
        strokeColor: diff > 5 ? colorMap.difficult : diff > 3 ? colorMap.normal : colorMap.easy,
        strokeWeight: 12,
        strokeLineCap: 'round',
      });
      lines.push(line);
    }
    const lastPoint = path.slice(-1)[0];
    setRouteMakrers((prev: any[]) => {
      prev.map((item) => item.setMap(null));
      return [
        new naver.maps.Marker({
          map,
          position: path[0],
          icon: {
            url: pinPointIcon,
            size: new naver.maps.Size(18, 18),
            scaledSize: new naver.maps.Size(18, 18),
            anchor: { x: 9, y: 9 },
          },
        }),
        new naver.maps.Marker({
          map,
          position: lastPoint,
          icon: {
            url: pinPointIcon,
            size: new naver.maps.Size(18, 18),
            scaledSize: new naver.maps.Size(18, 18),
            anchor: { x: 9, y: 9 },
          },
        }),
        new naver.maps.Marker({
          map,
          position: lastPoint,
          icon: { url: pinDestIcon, size: new naver.maps.Size(56, 56), scaledSize: new naver.maps.Size(56, 56) },
        }),
      ];
    });
    setMarkers((markers: any[]) => {
      markers.map((marker) => marker.setMap(null));
      return markers;
    });
    setPolyLines(lines);
  };

  useEffect(() => {
    if (map && headerStatus === 'map') {
      setRouteMakrers((ms) => {
        ms.map((m) => m.setMap(null));
        return [];
      });
      setPolyLines((ms) => {
        ms.map((m) => m.setMap(null));
        return [];
      });
      setMarkers((markers: any[]) => {
        markers.map((marker) => marker.setMap(map));
        return markers;
      });
    }
  }, [headerStatus, map]);

  useLayoutEffect(() => {
    const script = document.createElement('script');
    script.src = mapSrc;
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const { naver } = window;
      const { LatLng, Map } = naver.maps;
      const map = new Map('map', {
        center: new LatLng(33.4498632234159, 126.918168422686),
        zoom: level,
      });
      setMap(map);
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
    if (routes.length > 0) {
      selectRoute(routes[0]);
    }
  }, [routes]);

  useEffect(() => {
    if (!map) return;
    const { Size, Marker } = naver.maps;
    naver.maps.Event.addListener(map, 'click', function (e: any) {
      console.log('지도 클릭:', e.coord, e.overlay);
    });
    naver.maps.Event.addListener(map, 'dragend', function () {
      // loadCurrentData(e.coord);
      setCurrentLoc(null);
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
      {headerStatus === 'route' && routes.length > 0 && (
        <div className="absolute bottom-0 left-0 w-full p-4 overflow-x-auto">
          <RecommendationRouteList routes={routes} onClick={(route) => selectRoute(route)} />
        </div>
      )}
    </div>
  );
};
