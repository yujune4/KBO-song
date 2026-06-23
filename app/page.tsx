'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { KBO_TEAMS } from './constants/teams';
import { Star } from 'lucide-react';

function HomeContent() {
  const router = useRouter();

  const selectTeam = (teamName: string) => {
    router.push(`/studio?team=${encodeURIComponent(teamName)}`);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gradient-to-b from-neutral-900 via-neutral-950 to-neutral-950">
      <div className="max-w-4xl w-full text-center mb-12 space-y-3">
        <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
          KBO 프로야구 AI 응원가 스튜디오
        </h1>
        <p className="text-neutral-400 text-sm font-medium tracking-wide">
          KBO 프로야구 AI 응원가가 스튜디오와 통합과 총원가를 종결하는 가능합니다.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-6xl w-full">
        {Object.values(KBO_TEAMS).map((team) => (
          <div
            key={team.id}
            onClick={() => selectTeam(team.name)}
            className="group relative rounded-3xl bg-neutral-900/60 border border-neutral-850 p-5 flex flex-col items-center justify-between text-center cursor-pointer hover:border-neutral-700 hover:bg-neutral-900 transition-all transform hover:-translate-y-1.5 aspect-[4/5] overflow-hidden shadow-xl"
          >
            <button className="absolute top-4 right-4 text-neutral-600 hover:text-amber-400 transition-colors z-20">
              <Star size={16} />
            </button>

            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 p-0.5 z-10 relative mt-1 flex items-center justify-center bg-neutral-950" style={{ borderColor: team.primaryColor }}>
              <div className="w-full h-full rounded-full overflow-hidden border border-neutral-800">
                <img
                  src={team.playerImageUrl}
                  alt={team.playerName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-neutral-900 border border-neutral-800 text-[8px] sm:text-[9px] font-black tracking-wider text-neutral-200 px-2.5 py-0.5 rounded-full uppercase z-20 shadow-md whitespace-nowrap max-w-[110%] text-center">
                {team.playerName}
              </div>
            </div>

            <div className="w-full z-10 relative mt-2 flex flex-col items-center">
              <div className="flex items-center justify-center gap-1.5 w-full px-1">
                <h3 className="font-black text-base md:text-lg text-neutral-100 group-hover:text-white transition-colors tracking-tight truncate">
                  {team.name}
                </h3>
                <div className="w-3.5 h-3.5 rounded-full overflow-hidden bg-neutral-800 border border-neutral-700 flex items-center justify-center shrink-0">
                  <img src={team.logoUrl} alt={team.name} className="w-full h-full object-cover" />
                </div>
              </div>

              <span
                className="text-[9px] uppercase tracking-wider font-bold px-3 py-1 rounded-full inline-block mt-1.5 shrink-0"
                style={{ backgroundColor: `${team.primaryColor}12`, color: team.primaryColor }}
              >
                Studio Ready
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div className="flex-1 bg-neutral-950" />}>
      <HomeContent />
    </Suspense>
  );
}