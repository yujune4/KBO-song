'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface StadiumInfo {
  name: string;
  location: string;
  capacity: string;
  soundSystem: string;
  signature: string;
  symbol: string;
  color: string;
  bgHover: string;
}

const KBO_CLUBS: Record<string, StadiumInfo> = {
  'LG 트윈스': {
    name: '잠실 야구장',
    location: '서울 송파구',
    capacity: '23,750석',
    soundSystem: 'High-Power Line Array X3',
    signature: '무적 LG 사운드 필드',
    symbol: 'LG',
    color: '#c60c30',
    bgHover: 'hover:border-[#c60c30]/60'
  },
  '삼성 라이온즈': {
    name: '대구 삼성 라이온즈 파크',
    location: '대구 수성구',
    capacity: '24,000석',
    soundSystem: 'Octa-Directional Surround',
    signature: '블루 피 앰프 솔루션',
    symbol: 'SL',
    color: '#0066b3',
    bgHover: 'hover:border-[#0066b3]/60'
  },
  'KT 위즈': {
    name: '수원 케이티 위즈 파크',
    location: '경기 수원시',
    capacity: '20,000석',
    soundSystem: 'Giga-Sound Wave System',
    signature: '빅 위즈 매직 모듈',
    symbol: 'KT',
    color: '#000000',
    bgHover: 'hover:border-gray-500/60'
  },
  'SSG 랜더스': {
    name: '인천 SSG 랜더스필드',
    location: '인천 미추홀구',
    capacity: '23,000석',
    soundSystem: 'Big-Board Integrated Stereo',
    signature: '랜더스 아레나 이퀄라이저',
    symbol: 'SSG',
    color: '#ce0e2d',
    bgHover: 'hover:border-[#ce0e2d]/60'
  },
  '두산 베어스': {
    name: '잠실 야구장',
    location: '서울 송파구',
    capacity: '23,750석',
    soundSystem: 'High-Power Line Array X3',
    signature: '허슬 베어스 오디오 패키지',
    symbol: 'DB',
    color: '#131230',
    bgHover: 'hover:border-[#131230]/60'
  },
  'KIA 타이거즈': {
    name: '광주-기아 챔피언스 필드',
    location: '광주 북구',
    capacity: '20,500석',
    soundSystem: 'Champions Ultra Bass Pack',
    signature: '타이거즈 타이탄 베이스',
    symbol: 'KIA',
    color: '#ea0029',
    bgHover: 'hover:border-[#ea0029]/60'
  },
  '롯데 자이언츠': {
    name: '사직 야구장',
    location: '부산 동래구',
    capacity: '22,990석',
    soundSystem: 'Giant 사직 노래방 앰프 v2',
    signature: '사직 메가 서라운드 부스터',
    symbol: 'G',
    color: '#041e42',
    bgHover: 'hover:border-[#041e42]/60'
  },
  'NC 다이노스': {
    name: '창원 NC 파크',
    location: '경남 창원시',
    capacity: '17,891석',
    soundSystem: 'Dino-Acoustic Immersive 3D',
    signature: '다이노 진격 공명 제어기',
    symbol: 'NC',
    color: '#072146',
    bgHover: 'hover:border-[#072146]/60'
  },
  '한화 이글스': {
    name: '한화생명 이글스파크',
    location: '대전 중구',
    capacity: '12,000석',
    soundSystem: 'Eagle Eagles-Flame Speaker',
    signature: '불꽃 이글스 하이퍼 엔진',
    symbol: 'HE',
    color: '#f37321',
    bgHover: 'hover:border-[#f37321]/60'
  },
  '키움 히어로즈': {
    name: '고척 스카이돔',
    location: '서울 구로구',
    capacity: '16,000석',
    soundSystem: 'Dome-Echo Subwoofer Matrix',
    signature: '스카이돔 에코 캔슬러 칩',
    symbol: 'KH',
    color: '#570514',
    bgHover: 'hover:border-[#570514]/60'
  }
};

export default function HomePage() {
  const router = useRouter();
  const [hoveredTeam, setHoveredTeam] = useState<string | null>(null);

  const handleNavigate = (team: string) => {
    router.push(`/studio?team=${encodeURIComponent(team)}`);
  };

  return (
    <div className="p-12 bg-[#0b0e14] min-h-screen text-white font-sans flex flex-col justify-between">
      <div className="mb-10 border-b border-gray-900 pb-8 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tight bg-gradient-to-r from-green-400 via-emerald-400 to-blue-500 bg-clip-text text-transparent">
            BASEBEAT KBO AI STUDIO
          </h1>
          <p className="text-sm text-gray-500 mt-2 font-medium tracking-wide">
            원하는 프로야구 구단을 선택하여 하이파이 AI 응원가 제작 파이프라인으로 진입하세요.
          </p>
        </div>
        <div className="text-right font-mono text-[11px] text-gray-600 bg-[#12161f] px-3 py-1.5 rounded-md border border-gray-900">
          SYSTEM CORE: v2.6.5 / ONLINE
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4 mb-8">
        {Object.entries(KBO_CLUBS).map(([team, stadium]) => (
          <div
            key={team}
            onClick={() => handleNavigate(team)}
            onMouseEnter={() => setHoveredTeam(team)}
            onMouseLeave={() => setHoveredTeam(null)}
            className={`bg-[#12161f] border border-gray-800/60 ${stadium.bgHover} rounded-xl p-5 cursor-pointer transition-all duration-200 transform hover:-translate-y-1 flex flex-col justify-between h-[195px] group relative overflow-hidden`}
          >
            <div
              className="absolute top-0 left-0 w-1 h-full transition-all duration-200"
              style={{ backgroundColor: stadium.color }}
            />

            <div>
              <div className="flex justify-between items-start">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-black tracking-tighter text-white/90 border border-white/10"
                  style={{ backgroundColor: stadium.color }}
                >
                  {stadium.symbol}
                </div>
                <span className="text-[9px] bg-[#1c212c] text-gray-400 px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">
                  {stadium.capacity}
                </span>
              </div>
              <h3 className="text-lg font-black text-white mt-4 group-hover:text-green-400 transition">
                {team}
              </h3>
              <p className="text-xs text-gray-400 mt-1 line-clamp-1">{stadium.name}</p>
            </div>

            <div className="text-[11px] text-gray-500 border-t border-gray-800/80 pt-3 group-hover:text-gray-300 transition flex items-center justify-between">
              <span>작업실 입장</span>
              <span className="text-xs opacity-0 group-hover:opacity-100 transition duration-200">➡️</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#12161f] border border-gray-800/60 rounded-xl p-6 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
          <div>
            <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider">
              {hoveredTeam ? `🎯 실시간 타겟: ${hoveredTeam}` : '💡 현재 상태 모니터'}
            </h4>
            <p className="text-[11px] text-gray-500 mt-0.5">
              {hoveredTeam
                ? `${KBO_CLUBS[hoveredTeam].signature} 및 [${KBO_CLUBS[hoveredTeam].soundSystem}] 음향 매칭 프로세스 대기 중`
                : '구단을 선택하면 해당 연고지 경기장의 주파수 특성 및 라인업 엔진이 즉시 맵핑됩니다.'
              }
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => router.push('/roster')}
            className="text-[11px] font-bold px-4 py-2.5 bg-[#1c212c] hover:bg-[#252c3a] text-gray-300 rounded-lg border border-gray-800 transition"
          >
            📋 통합 로스터 먼저 보기
          </button>
          <button
            onClick={() => router.push('/stadium')}
            className="text-[11px] font-bold px-4 py-2.5 bg-[#1c212c] hover:bg-[#252c3a] text-gray-300 rounded-lg border border-gray-800 transition"
          >
            Stadium 인프라 체크
          </button>
        </div>
      </div>
    </div>
  );
}