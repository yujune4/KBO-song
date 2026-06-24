import './globals.css';
import Link from 'next/link';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <header className="flex justify-between items-center px-8 py-4 border-b border-gray-200 bg-white">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-bold text-red-600">KBO AI STUDIO</Link>
            <nav className="flex gap-6 text-sm font-medium text-gray-600">
              <Link href="/" className="hover:text-black">홈</Link>
              <Link href="/roster" className="hover:text-black">구단 로스터</Link>
            </nav>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-sm text-gray-500">크레딧: <span className="font-bold text-black">450</span></div>
            <Link href="/storage" className="text-sm text-gray-500 hover:text-black">보관함</Link>
            <button className="text-sm bg-gray-900 text-white px-4 py-2 rounded-lg">로그인</button>
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}