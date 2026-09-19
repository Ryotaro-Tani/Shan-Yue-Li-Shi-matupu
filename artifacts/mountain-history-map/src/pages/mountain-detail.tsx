import { ArrowLeft, BookOpen, ChevronRight, Compass, Landmark, Mountain, ScrollText } from 'lucide-react';
import { type ReactNode } from 'react';
import { Link, useParams } from 'wouter';
import { getMountain } from '@/data/mountains';

function SectionHeading({ eyebrow, title, icon }: { eyebrow: string; title: string; icon: ReactNode }) {
  return (
    <div className="mb-4 flex items-end justify-between">
      <div>
        <p className="font-mono-app text-[10px] font-semibold tracking-[0.2em] text-[#a24a40]">{eyebrow}</p>
        <h2 className="mt-1 font-mincho text-[22px] tracking-[0.08em] text-[#25374d]">{title}</h2>
      </div>
      <span className="mb-1 flex size-9 items-center justify-center rounded-full bg-[#e8e0d0] text-[#a24a40]">{icon}</span>
    </div>
  );
}

export default function MountainDetail() {
  const params = useParams<{ id?: string }>();
  const mountain = getMountain(params.id ?? 'fuji');

  if (!mountain) {
    return (
      <div className="flex min-h-full flex-col items-center justify-center px-8 text-center">
        <p className="font-mincho text-xl text-[#25374d]">山が見つかりません</p>
        <Link href="/" className="mt-5 rounded-full bg-[#25374d] px-5 py-3 text-sm text-[#f4edde]" data-testid="link-back-map-empty">地図へ戻る</Link>
      </div>
    );
  }

  return (
    <div className="screen-enter min-h-full bg-[#eee8dc]" data-testid="page-mountain-detail">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-[#d9cfbd]/90 bg-[#eee8dc]/95 px-5 py-4 backdrop-blur-sm">
        <Link href="/" className="flex min-h-11 min-w-11 items-center justify-center rounded-full text-[#25374d] transition-transform active:scale-95" aria-label="地図へ戻る" data-testid="link-back-map">
          <ArrowLeft className="size-5" strokeWidth={1.7} />
        </Link>
        <span className="font-mono-app text-[10px] tracking-[0.24em] text-[#6f7774]">MOUNTAIN ARCHIVE</span>
        <span className="size-11" aria-hidden="true" />
      </header>

      <main className="px-5 pb-12">
        <section className="relative overflow-hidden border-b border-[#d9cfbd] pb-7 pt-8">
          <div className="absolute -right-8 -top-5 font-mincho text-[170px] leading-none text-[#dcd5c7]/65">富</div>
          <div className="relative">
            <p className="rise-in font-mono-app text-[10px] tracking-[0.26em] text-[#a24a40]">MOUNTAIN / {mountain.region}</p>
            <h1 className="rise-in delay-1 mt-3 font-mincho text-[44px] leading-none tracking-[0.12em] text-[#25374d]" data-testid="text-mountain-name">{mountain.name}</h1>
            <p className="rise-in delay-1 mt-2 text-[12px] tracking-[0.22em] text-[#7d817a]">{mountain.reading}</p>
            <div className="rise-in delay-2 mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-[#d5cab7] bg-[#d5cab7]">
              <div className="bg-[#f4edde] px-4 py-4">
                <span className="block text-[10px] tracking-[0.18em] text-[#7d817a]">標高</span>
                <strong className="mt-1 block font-mono-app text-[19px] font-medium tracking-[0.04em] text-[#25374d]" data-testid="text-mountain-elevation">{mountain.elevation}</strong>
              </div>
              <div className="bg-[#f4edde] px-4 py-4">
                <span className="block text-[10px] tracking-[0.18em] text-[#7d817a]">所在地</span>
                <strong className="mt-1 block text-[13px] font-medium tracking-[0.08em] text-[#25374d]" data-testid="text-mountain-prefectures">{mountain.prefectures}</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="rise-in delay-2 border-b border-[#d9cfbd] py-7">
          <SectionHeading eyebrow="01 / ORIGIN" title="歴史" icon={<ScrollText className="size-4" strokeWidth={1.6} />} />
          <p className="text-[14px] leading-[2] tracking-[0.06em] text-[#4c5b62]" data-testid="text-mountain-history">{mountain.history}</p>
        </section>

        <section className="rise-in delay-3 border-b border-[#d9cfbd] py-7">
          <SectionHeading eyebrow="02 / BELIEF" title="浅間信仰" icon={<BookOpen className="size-4" strokeWidth={1.6} />} />
          <div className="relative rounded-xl bg-[#e2ded1] px-5 py-5">
            <span className="absolute -left-1 top-4 h-8 w-1 rounded-r-full bg-[#a24a40]" />
            <p className="text-[14px] leading-[2] tracking-[0.06em] text-[#4c5b62]" data-testid="text-mountain-belief">{mountain.beliefs}</p>
          </div>
        </section>

        <section className="rise-in border-b border-[#d9cfbd] py-7">
          <SectionHeading eyebrow="03 / THE ASCENT" title="吉田口登山道" icon={<Compass className="size-4" strokeWidth={1.6} />} />
          <div className="flex items-start gap-4 rounded-xl border border-[#d5cab7] bg-[#f4edde] px-4 py-4">
            <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-[#25374d] text-[#f4edde]"><Mountain className="size-4" strokeWidth={1.5} /></span>
            <p className="text-[13px] leading-[1.85] tracking-[0.04em] text-[#4c5b62]" data-testid="text-yoshida-trail">{mountain.trailNote}</p>
          </div>
        </section>

        <section className="rise-in border-b border-[#d9cfbd] py-7">
          <SectionHeading eyebrow="04 / PLACES" title="歴史スポット" icon={<Landmark className="size-4" strokeWidth={1.6} />} />
          <div className="space-y-3">
            {mountain.spots.map((spot, index) => (
              <article key={spot.name} className="group rounded-xl border border-[#d5cab7] bg-[#f4edde] p-4" data-testid={`card-history-spot-${index}`}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-mincho text-[16px] tracking-[0.08em] text-[#25374d]">{spot.name}</p>
                    <p className="mt-1 font-mono-app text-[9px] tracking-[0.15em] text-[#a24a40]">{spot.era}</p>
                  </div>
                  <ChevronRight className="mt-1 size-4 text-[#9b9e95] transition-transform group-hover:translate-x-0.5" strokeWidth={1.5} />
                </div>
                <p className="mt-3 text-[12px] leading-[1.8] tracking-[0.04em] text-[#68716f]">{spot.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="py-7">
          <SectionHeading eyebrow="REFERENCES" title="出典" icon={<BookOpen className="size-4" strokeWidth={1.6} />} />
          <ol className="space-y-3">
            {mountain.sources.map((source, index) => (
              <li key={source} className="flex gap-3 text-[11px] leading-[1.65] tracking-[0.04em] text-[#68716f]" data-testid={`text-source-${index}`}>
                <span className="font-mono-app text-[#a24a40]">0{index + 1}</span>
                <span>{source}</span>
              </li>
            ))}
          </ol>
          <p className="mt-7 border-t border-[#d9cfbd] pt-4 text-[10px] leading-[1.7] tracking-[0.05em] text-[#8a8c83]">このページは学びの入口として、公開資料をもとに編集しています。登山の際は最新の公式情報をご確認ください。</p>
        </section>
      </main>
    </div>
  );
}