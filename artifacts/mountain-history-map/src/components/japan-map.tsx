import { MoveDiagonal2 } from 'lucide-react';
import * as maplibregl from 'maplibre-gl';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'wouter';
import japanGeoJson from '@/data/japan.json';
import { mountains } from '@/data/mountains';
import 'maplibre-gl/dist/maplibre-gl.css';

const MAP_BOUNDS = {
  minLongitude: 127.3,
  maxLongitude: 146.2,
  minLatitude: 30.8,
  maxLatitude: 45.8,
};

type Position = [number, number];
type Polygon = Position[][];
type MultiPolygon = Polygon[];

type JapanFeature = {
  geometry: {
    type: 'Polygon' | 'MultiPolygon';
    coordinates: unknown;
  };
};

const japanFeatures = (japanGeoJson as unknown as { features: JapanFeature[] }).features;

function projectToFallbackMap(longitude: number, latitude: number) {
  return {
    x: ((longitude - MAP_BOUNDS.minLongitude) / (MAP_BOUNDS.maxLongitude - MAP_BOUNDS.minLongitude)) * 100,
    y: ((MAP_BOUNDS.maxLatitude - latitude) / (MAP_BOUNDS.maxLatitude - MAP_BOUNDS.minLatitude)) * 100,
  };
}

function featureToPath(feature: JapanFeature) {
  const polygons =
    feature.geometry.type === 'MultiPolygon'
      ? (feature.geometry.coordinates as MultiPolygon)
      : [feature.geometry.coordinates as Polygon];

  return polygons
    .map((polygon) =>
      polygon
        .map((ring) =>
          ring
            .map(([longitude, latitude], index) => {
              const point = projectToFallbackMap(longitude, latitude);
              return `${index === 0 ? 'M' : 'L'}${point.x.toFixed(3)} ${point.y.toFixed(3)}`;
            })
            .join(' ') + ' Z',
        )
        .join(' '),
    )
    .join(' ');
}

function GeoDataFallbackMap({ onSelect }: { onSelect: (id: string) => void }) {
  return (
    <div className="relative mt-8 h-[430px] w-full overflow-hidden" data-testid="geodata-fallback-map">
      <svg
        viewBox="0 0 100 80"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
        role="img"
        aria-label="実際の地理データから描画した日本列島の地図"
      >
        {japanFeatures.map((feature, index) => (
          <path key={index} d={featureToPath(feature)} className="map-fallback-land" />
        ))}
      </svg>
      {mountains.map((mountain) => {
        const point = projectToFallbackMap(mountain.longitude, mountain.latitude);
        return (
          <button
            key={mountain.id}
            type="button"
            className="mountain-map-marker"
            style={{
              position: 'absolute',
              left: `${point.x}%`,
              top: `${point.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
            aria-label={`${mountain.name}の詳細を見る`}
            onClick={() => onSelect(mountain.id)}
          >
            <span className="mountain-map-marker__pulse" aria-hidden="true" />
            <span className="mountain-map-marker__pin" aria-hidden="true">
              <span className="mountain-map-marker__peak" />
            </span>
            <span className="mountain-map-marker__label">{mountain.name}</span>
          </button>
        );
      })}
    </div>
  );
}

export function JapanMap() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const [, setLocation] = useLocation();
  const [mapUnavailable, setMapUnavailable] = useState(false);

  useEffect(() => {
    if (!mapContainer.current) return;

    let map: maplibregl.Map | null = null;

    try {
      map = new maplibregl.Map({
        container: mapContainer.current,
        style: {
          version: 8,
          sources: {
            japan: {
              type: 'geojson',
              data: japanGeoJson,
            },
          },
          layers: [
            {
              id: 'ocean',
              type: 'background',
              paint: {
                'background-color': '#dce3db',
              },
            },
            {
              id: 'japan-fill',
              type: 'fill',
              source: 'japan',
              paint: {
                'fill-color': '#d6ded5',
                'fill-opacity': 0.92,
              },
            },
            {
              id: 'japan-outline',
              type: 'line',
              source: 'japan',
              paint: {
                'line-color': '#778c8b',
                'line-width': 1.1,
                'line-opacity': 0.85,
              },
            },
          ],
        },
        center: [138.1, 36.8],
        zoom: 4,
        minZoom: 3,
        maxZoom: 10,
        attributionControl: false,
        dragRotate: false,
        touchPitch: false,
      });
    } catch {
      setMapUnavailable(true);
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
      <div className="absolute inset-x-0 top-0 flex items-center justify-between px-4 py-3">
        <span className="font-mono-app text-[10px] font-semibold tracking-[0.23em] text-[#536968]">JAPAN / 01</span>
        <span className="flex items-center gap-1.5 text-[10px] tracking-[0.16em] text-[#667b79]">
          <MoveDiagonal2 className="size-3" strokeWidth={1.7} />
          富士山を選ぶ
        </span>
      </div>
      {mapUnavailable ? (
        <GeoDataFallbackMap onSelect={(id) => setLocation(`/mountains/${id}`)} />
      ) : (
        <div ref={mapContainer} className="mt-8 h-[430px] w-full" role="application" aria-label="日本列島の地図。富士山の位置にマーカーがあります。" data-testid="interactive-japan-map" />
      )}
    </section>
  );
}