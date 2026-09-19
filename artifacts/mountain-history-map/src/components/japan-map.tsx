import { MapPin, MoveDiagonal2 } from 'lucide-react';
import { Link } from 'wouter';

export function JapanMap() {
  return (
    <section className="paper-grain relative overflow-hidden rounded-[1.35rem] border border-[#b9c4bc] bg-[#dce3db] shadow-[0_10px_24px_rgba(48,64,60,0.12)]" data-testid="section-japan-map">
      <div className="absolute inset-x-0 top-0 flex items-center justify-between px-4 py-3">
        <span className="font-mono-app text-[10px] font-semibold tracking-[0.23em] text-[#536968]">JAPAN / 01</span>
        <span className="flex items-center gap-1.5 text-[10px] tracking-[0.16em] text-[#667b79]">
          <MoveDiagonal2 className="size-3" strokeWidth={1.7} />
          富士山を選ぶ
        </span>
      </div>
      <svg viewBox="0 0 400 500" className="mt-8 h-[430px] w-full" role="img" aria-label="日本列島の地図。富士山の位置にマーカーがあります。">
        <defs>
          <filter id="map-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#415a59" floodOpacity=".14" />
          </filter>
        </defs>
        <path className="map-contour" d="M81 83c54-30 130-44 214-19M65 108c65-26 140-28 258 1M53 139c86-27 188-19 292 11M49 171c90-18 194-3 300 28M51 205c78-8 181 11 292 46M70 241c71-1 160 21 258 56M90 282c73 9 145 32 219 64M114 325c53 11 102 28 155 50" />
        <path className="map-island" filter="url(#map-shadow)" d="M279 39c11-4 26 1 28 10 2 7-5 12-12 16l-13 10-14-2-6-9 8-9-4-8z" />
        <path className="map-island" filter="url(#map-shadow)" d="M228 74c13-5 23 1 26 10l-4 11-12 6-7 14-12 2-8-10 7-12-3-9z" />
        <path className="map-island" filter="url(#map-shadow)" d="M190 104l20-2 13 10 5 17-8 20-9 17-4 23-12 13-10-10 3-19-7-15 3-17-8-12z" />
        <path className="map-island" filter="url(#map-shadow)" d="M156 142l24 10 8 18-4 21-12 21-13 24-19 11-20 2-11-10 8-15-5-12 12-14 3-17 12-11z" />
        <path className="map-island" filter="url(#map-shadow)" d="M113 228l18 2 8 13-9 12-1 19-13 12-13-7-1-13-10-8 8-13z" />
        <path className="map-island" filter="url(#map-shadow)" d="M91 286l17 2 7 9-7 10-4 20-10 18-10-3 0-15-8-12 4-13z" />
        <path className="map-island" filter="url(#map-shadow)" d="M78 366l13 4 1 13-8 13-8-6 2-11-7-5z" />
        <path className="map-island" filter="url(#map-shadow)" d="M305 130l11 2 5 9-6 8-12-3-3-8z" />
        <path className="map-island" filter="url(#map-shadow)" d="M328 155l13 4 5 11-7 10-12-2-6-10z" />
        <path className="map-island" filter="url(#map-shadow)" d="M346 189l14 7 2 13-9 9-12-7-3-11z" />
        <path className="map-island" filter="url(#map-shadow)" d="M338 225l14 3 3 12-8 10-12-4-3-11z" />
        <path className="map-island" filter="url(#map-shadow)" d="M315 253l12 1 5 10-7 10-11-4-3-10z" />
        <path className="map-island" filter="url(#map-shadow)" d="M286 286l13 2 4 10-8 8-11-5-2-9z" />
        <path className="map-line" fill="none" strokeWidth="1" d="M206 161c30 22 52 52 72 83M171 206c39 10 75 27 111 61M135 249c42 1 75 16 105 44" />
        <g transform="translate(191 174)">
          <circle className="marker-pulse" cx="0" cy="0" r="23" fill="#bd5548" />
          <circle cx="0" cy="0" r="12" fill="#bd5548" stroke="#f3ead9" strokeWidth="3" />
          <path d="M0-5.4l3.7 8.8H-3.7z" fill="#f3ead9" />
        </g>
        <text x="207" y="171" fill="#7d3933" fontSize="11" fontWeight="600" letterSpacing="1">富士山</text>
        <text x="194" y="196" fill="#687b79" fontSize="8" letterSpacing="1.2">3,776 m</text>
        <text x="73" y="447" fill="#607270" fontSize="9" letterSpacing="1.8">HONSHU / 本州</text>
      </svg>
      <Link
        href="/mountains/fuji"
        className="absolute left-[47.7%] top-[40%] flex min-h-12 min-w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
        aria-label="富士山の詳細を見る"
        data-testid="link-fuji-marker"
      >
        <span className="sr-only">富士山の詳細を見る</span>
      </Link>
    </section>
  );
}