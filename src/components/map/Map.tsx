import React, { useLayoutEffect, useState } from 'react';
import markerIcon from '@/assets/svg/marker.svg';
import { getOrsDummy } from '../../internal/repositories/dummy/RouteRepository';
import SearchRoute from '../searchBar/SearchRoute';
import { RecommendationRouteList } from '../searchBar/RecommendationRouteList';

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

export const Map: React.FC<StaticMapProps> = ({ width = 440, level = 13 }) => {
  const API_KEY = process.env.VITE_NAVER_MAP_CLIENT_ID;
  const mapSrc = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${API_KEY}&callback=initMap`;
  const [_, setMap] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);

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
        path: path.slice(0,4),
        strokeColor: '#ff0000',
        strokeWeight: 5,
      });
      new Polyline({
        map,
        path: path.slice(3,8),
        strokeColor: '#00ff00',
        strokeWeight: 5,
      });
      new Polyline({
        map,
        path: path.slice(7),
        strokeColor: '#0000ff',
        strokeWeight: 5,
      });

      // 지도 클릭 이벤트
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
        setMarkers(v => [...v, marker]);
      });
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className='relative'>
      <div id="map" style={{ width, height: '100vh', overflow: 'hidden', borderRadius: '10px' }} />
      {/* <div className='absolute m-2'>
        <SearchBar />
      </div> */}
      <div className='absolute top-0 left-0 w-full'>
        <SearchRoute />
      </div>
      <div className='absolute bottom-0 left-0 w-full p-4 overflow-x-auto'>
        <RecommendationRouteList routes={[
          {
            name: '느린걸음',
            duration: 12 * 60,
            distance: '423m',
            hint: '노약자, 임산부 등'
          },
          {
            name: '휠체어',
            duration: 24 * 60,
            distance: '423m',
            hint: '수동 휠체어'
          },
          {
            name: '목발',
            duration: 36 * 60,
            distance: '423m',
            hint: '목발 사용자'
          },
        ]} />
      </div>
    </div>
  );
};
