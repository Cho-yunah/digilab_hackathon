import React, { useLayoutEffect, useState } from 'react';
// import markerIcon from '@/assets/svg/marker.svg';
import { getOrsDummy } from '../../internal/repositories/dummy/RouteRepository';

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

  useLayoutEffect(() => {
    const script = document.createElement('script');
    script.src = mapSrc;
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const { naver } = window;
      const { LatLng, Polyline, Map } = naver.maps;
      const map = new Map('map', {
        center: new LatLng(37.3595704, 127.105399),
        zoom: level,
      });
      setMap(map);

      // const marker = new Marker({
      //   map: map,
      //   position: new LatLng(37.3591614, 127.1054221),
      //   icon: { url: markerIcon, size: new Size(28, 28), scaledSize: new Size(28, 28) },
      // });

      const path = getOrsDummy('footWalking').map((geo) => new LatLng(geo[1], geo[0]));

      new Polyline({
        map,
        path,
      });

      // 지도 클릭 이벤트
      naver.maps.Event.addListener(map, 'click', function (e: any) {
        console.log('지도 클릭:', e.coord);
      });
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div id="map" style={{ width, height: '90vh', overflow: 'hidden', borderRadius: '10px' }} />;
};
