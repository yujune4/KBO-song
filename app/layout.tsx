'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useSearchParams, usePathname } from 'next/navigation';
import { Home, Users, FolderHeart, ShieldCheck, LogIn, LogOut } from 'lucide-react';
import '@/app/globals.css';

function NavigationHeader() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const teamParam = searchParams.get('team');
  const query = teamParam ? `?team=${encodeURIComponent(teamParam)}` : '';

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const leftNavItems = [
    { label: '홈 스튜디오', path: '/', icon: <Home size={15} /> },
    { label: '구단 로스터', path: '/roster', icon: <Users size={15} /> },
  ];

  const rightNavItems = [
    { label: '보관함', path: '/archive', icon: <FolderHeart size={15} /> },
    { label: '크레딧', path: '/credits', icon: <ShieldCheck size={15} /> },
  ];

  return (
    <header className="w-full bg-neutral-900 border-b border-neutral-800 sticky top-0 z-50 px-6 py-3.5 flex items-center justify-between backdrop-blur/90">
      <div className="flex items-center gap-6">
        <span className="text-xs font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-500 uppercase">
          KBO AI STUDIO
        </span>
        <nav className="flex items-center gap-1">
          {leftNavItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={`${item.path}${query}`}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${isActive
                    ? 'bg-neutral-800 text-white border border-neutral-700'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-850/60'
                  }`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-3">
        <nav className="flex items-center gap-1">
          {rightNavItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={`${item.path}${query}`}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${isActive
                    ? 'bg-neutral-800 text-white border border-neutral-700'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-850/60'
                  }`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="w-px h-4 bg-neutral-800 mx-1" />

        <button
          onClick={() => setIsLoggedIn(!isLoggedIn)}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border transition-all ${isLoggedIn
              ? 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-red-400 hover:border-red-900/30 hover:bg-red-500/5'
              : 'border-neutral-700 bg-neutral-800 text-white hover:opacity-90 shadow-sm'
            }`}
        >
          {isLoggedIn ? (
            <>
              <LogOut size={14} /> 로그아웃
            </>
          ) : (
            <>
              <LogIn size={14} /> 로그인
            </>
          )}
        </button>
      </div>
    </header>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="dark">
      <body className="bg-neutral-950 text-neutral-50 min-h-screen flex flex-col antialiased">
        <Suspense fallback={<header className="w-full h-14 bg-neutral-900 border-b border-neutral-800" />}>
          <NavigationHeader />
        </Suspense>
        <main className="flex-1 flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}