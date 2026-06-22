'use client';

import './globals.css';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  useEffect(() => {
    const savedSession = localStorage.getItem('BB_SESSION');
    if (savedSession === 'false') {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('BB_SESSION', 'false');
    alert('로그아웃 되었습니다.');
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('BB_SESSION', 'true');
    alert('성공적으로 로그인되었습니다. (데모 유저 연동)');
  };

  return (
    <html lang="ko">
      <body className="bg-[#0b0e14] text-white antialiased">
        <header className="bg-[#0b0e14] border-b border-gray-800 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-black tracking-tighter text-white hover:opacity-80 transition">
              🎵 BaseBeat
            </Link>
            <nav className="flex items-center gap-6 text-sm font-medium text-gray-400">
              <Link href="/" className="hover:text-white transition flex items-center gap-1">
                🏠 Home
              </Link>
              <Link href="/studio" className="hover:text-green-400 transition flex items-center gap-1">
                🎙️ Studio
              </Link>
              <Link href="/mixer" className="hover:text-green-400 transition flex items-center gap-1">
                🎛️ Mixer
              </Link>
              <Link href="/roster" className="hover:text-green-400 transition flex items-center gap-1">
                📋 Roster
              </Link>
              <Link href="/stadium" className="hover:text-green-400 transition flex items-center gap-1">
                🏟️ Stadium
              </Link>
              <Link href="/analytics" className="hover:text-green-400 transition flex items-center gap-1">
                🚀 Release
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-5 text-sm font-medium text-gray-400">
            {isLoggedIn ? (
              <>
                <Link href="/library" className="hover:text-white transition flex items-center gap-1">
                  🗃️ 보관함
                </Link>
                <Link
                  href="/credit"
                  className="bg-[#1c212c] hover:bg-[#252c3a] border border-gray-800 hover:border-gray-700 px-3 py-1 rounded-full text-xs font-mono text-green-400 flex items-center gap-1 transition cursor-pointer group"
                >
                  <span className="group-hover:scale-110 transition duration-150">🪙</span>
                  <span className="font-bold">320</span>
                  <span className="text-[10px] text-gray-400 font-sans">Credit</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="hover:text-red-400 transition flex items-center gap-1"
                >
                  🔓 로그아웃
                </button>
              </>
            ) : (
              <button
                onClick={handleLogin}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-black font-black text-xs px-4 py-2 rounded-xl shadow-md transition duration-200"
              >
                ⚡️ 간편 로그인하기
              </button>
            )}
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}