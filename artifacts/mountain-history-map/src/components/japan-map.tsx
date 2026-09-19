import { MoveDiagonal2 } from 'lucide-react';
import * as maplibregl from 'maplibre-gl';
import { useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import { mountains } from '@/data/mountains';
import 'maplibre-gl/dist/maplibre-gl.css';

const BASEMAP_STYLE_URL = 'https://tiles.openfreemap.org/styles/liberty';

const MAP_BOUNDS = {
  minLongitude: 127.3,
  maxLongitude: 146.2,
  minLatitude: 30.8,
  maxLatitude: 45.8,
};

export function JapanMap() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!mapContainer.current) return;

    let map: maplibregl.Map | null = null;

    try {
      map = new maplibregl.Map({
        container: mapContainer.current,
        style: BASEMAP_STYLE_URL,
        center: [138.1, 36.8],
        zoom: 4,
        minZoom: 3,
        maxZoom: 10,
        attributionControl: {
          compact: true,
          customAttribution: '© OpenStreetMap contributors © OpenMapTiles © OpenFreeMap',
        },
        dragRotate: false,
        touchPitch: false,
      });
    } catch {
      console.error('MapLibre could not initialize a WebGL map.');
      return;
    }

    const markers = mountains.map((mountain) => {
      const markerButton = document.createElement('button');
      markerButton.type = 'button';
      markerButton.className = 'mountain-map-marker';
      markerButton.setAttribute('aria-label', `${mountain.name}の詳細を見る`);
      markerButton.innerHTML = `
        <span class="mountain-map-marker__pulse" aria-hidden="true"></span>
        <span class="mountain-map-marker__pin" aria-hidden="true">
          <span class="mountain-map-marker__peak"></span>
        </span>
        <span class="mountain-map-marker__label">${mountain.name}</span>
      `;
      markerButton.addEventListener('click', () => {
        setLocation(`/mountains/${mountain.id}`);
      });

      return new maplibregl.Marker({
        element: markerButton,
        anchor: 'center',
      })
        .setLngLat([mountain.longitude, mountain.latitude])
        .addTo(map);
    });

    map.on('error', (event: maplibregl.ErrorEvent) => {
      console.error('MapLibre basemap error:', event.error);
    });

    const fitJapan = () => {
      map.fitBounds(
        [
          [MAP_BOUNDS.minLongitude, MAP_BOUNDS.minLatitude],
          [MAP_BOUNDS.maxLongitude, MAP_BOUNDS.maxLatitude],
        ],
        {
          padding: { top: 56, right: 28, bottom: 30, left: 28 },
          duration: 0,
        },
      );
    };

    map.once('load', fitJapan);

    return () => {
      markers.forEach((marker) => marker.remove());
      map?.remove();
    };
  }, [setLocation]);

  return (
    <section className="paper-grain relative overflow-hidden rounded-[1.35rem] border border-[#b9c4bc] bg-[#dce3db] shadow-[0_10px_24px_rgba(48,64,60,0.12)]" data-testid="section-japan-map">
      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-4 py-3">
        <span className="font-mono-app text-[10px] font-semibold tracking-[0.23em] text-[#536968]">JAPAN / 01</span>
        <span className="flex items-center gap-1.5 text-[10px] tracking-[0.16em] text-[#667b79]">
          <MoveDiagonal2 className="size-3" strokeWidth={1.7} />
          富士山を選ぶ
        </span>
      </div>
      <div ref={mapContainer} className="mt-8 h-[430px] w-full" role="application" aria-label="日本列島の地図。富士山の位置にマーカーがあります。" data-testid="interactive-japan-map" />
    </section>
  );
}