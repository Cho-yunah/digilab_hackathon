import React, { useEffect } from 'react';
import markerIcon from '@assets/svg/marker.svg';

interface StaticMapProps {
  width?: number;
  height?: number;
  level?: number;
}

const Map: React.FC<StaticMapProps> = ({ width = 440, level = 13 }) => {
  const API_KEY = process.env.VITE_NAVER_MAP_CLIENT_ID;
  const mapSrc = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${API_KEY}&callback=initMap`;

  useEffect(() => {
    const script = document.createElement('script');
    script.src = mapSrc;
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const { naver } = window as any;
      const map = new naver.maps.Map('map', {
        center: new naver.maps.LatLng(37.3595704, 127.105399),
        zoom: level,
      });

      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(37.3591614, 127.1054221),
        map: map,
        icon: { url: markerIcon, size: new naver.maps.Size(28, 28), scaledSize: new naver.maps.Size(28, 28) },
      });

      // 지도 클릭 이벤트
      naver.maps.Event.addListener(map, 'click', function (e) {
        console.log('지도 클릭:', e.coord);
      });
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div id="map" style={{ width, height: '90vh', overflow: 'hidden', borderRadius: '10px' }} />;
};

export default Map;
