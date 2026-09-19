import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import MountainDetail from '@/pages/mountain-detail';
import { JapanMap } from '@/components/japan-map';
import { BookOpen, Compass, Map as MapIcon } from 'lucide-react';
import { Link } from 'wouter';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

function Home() {
  return (
    <div className="app-scroll screen-enter bg-[#eee8dc]" data-testid="page-map">
      <header className="px-5 pb-4 pt-7">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-mono-app text-[10px] font-semibold tracking-[0.25em] text-[#a24a40]">山岳歴史マップ</p>
            <h1 className="mt-2 font-mincho text-[27px] tracking-[0.12em] text-[#25374d]">山と、祈りの記憶。</h1>
          </div>
          <div className="flex size-10 items-center justify-center rounded-full border border-[#cfc4b1] bg-[#e7dfd1] text-[#25374d]" aria-label="山岳歴史マップの印">
            <span className="font-mincho text-[17px]">山</span>
          </div>
        </div>
        <p className="mt-4 max-w-[320px] text-[12px] leading-[1.9] tracking-[0.06em] text-[#68716f]">地図から山を選び、その姿に重なる歴史と信仰をたどります。</p>
      </header>

      <main className="px-5 pb-8">
        <JapanMap />
        <section className="mt-7">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="font-mono-app text-[9px] tracking-[0.2em] text-[#a24a40]">FEATURED MOUNTAIN</p>
              <h2 className="mt-1 font-mincho text-[20px] tracking-[0.1em] text-[#25374d]">今月の山</h2>
            </div>
            <span className="font-mono-app text-[10px] tracking-[0.12em] text-[#8a8c83]">01 / 01</span>
          </div>
          <Link href="/mountains/fuji" className="group flex min-h-[94px] items-center justify-between rounded-xl border border-[#d5cab7] bg-[#f4edde] px-5 py-4 transition-transform active:scale-[.99]" data-testid="link-featured-fuji">
            <div>
              <p className="font-mincho text-[20px] tracking-[0.1em] text-[#25374d]">富士山</p>
              <p className="mt-1 text-[11px] tracking-[0.08em] text-[#7d817a]">標高 3,776m　・　山梨県・静岡県</p>
            </div>
            <span className="flex size-9 items-center justify-center rounded-full bg-[#e5ddd0] text-[#a24a40] transition-transform group-hover:translate-x-0.5"><Compass className="size-4" strokeWidth={1.6} /></span>
          </Link>
        </section>
      </main>

      <nav className="sticky bottom-0 mt-auto flex h-[72px] items-center justify-around border-t border-[#d9cfbd] bg-[#eee8dc]/95 px-7 backdrop-blur-sm" aria-label="メインナビゲーション">
        <Link href="/" className="flex min-h-12 min-w-16 flex-col items-center justify-center gap-1 text-[#25374d]" data-testid="link-nav-map">
          <MapIcon className="size-[18px]" strokeWidth={1.6} />
          <span className="text-[9px] tracking-[0.16em]">地図</span>
        </Link>
        <Link href="/mountains/fuji" className="flex min-h-12 min-w-16 flex-col items-center justify-center gap-1 text-[#8a8c83]" data-testid="link-nav-history">
          <BookOpen className="size-[18px]" strokeWidth={1.6} />
          <span className="text-[9px] tracking-[0.16em]">山の記憶</span>
        </Link>
      </nav>
    </div>
  );
}

function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-[#c6bcaa] p-0 sm:p-5">
      <div className="app-shell paper-grain rounded-none sm:rounded-[1.5rem]">
        <div className="app-scroll">
          {children}
        </div>
      </div>
    </div>
  );
}

function Router() {
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/">
          <AppShell><Home /></AppShell>
        </Route>
        <Route path="/mountains/:id">
          <AppShell><MountainDetail /></AppShell>
        </Route>
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
