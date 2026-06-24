'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { Star } from 'lucide-react';

interface TeamTheme {
  id: string;
  name: string;
  playerName: string;
  primaryColor: string;
}

const KBO_TEAMS_LIST: TeamTheme[] = [
  { id: "lg", name: "LG 트윈스", playerName: "오스틴", primaryColor: "#C30452" },
  { id: "kia", name: "KIA 타이거즈", playerName: "김도영", primaryColor: "#EA0029" },
  { id: "samsung", name: "삼성 라이온즈", playerName: "구자욱", primaryColor: "#0066B3" },
  { id: "doosan", name: "두산 베어스", playerName: "양의지", primaryColor: "#131230" },
  { id: "lotte", name: "롯데 자이언츠", playerName: "윤동희", primaryColor: "#041E42" },
  { id: "hanwha", name: "한화 이글스", playerName: "류현진", primaryColor: "#FF6600" },
  { id: "ssg", name: "SSG 랜더스", playerName: "최정", primaryColor: "#CE0E2D" },
  { id: "kt", name: "KT 위즈", playerName: "강백호", primaryColor: "#000000" },
  { id: "nc", name: "NC 다이노스", playerName: "박민우", primaryColor: "#072240" },
  { id: "kiwoom", name: "키움 히어로즈", playerName: "송성문", primaryColor: "#570514" }
];

function HomeContent() {
  const router = useRouter();

  const selectTeam = (teamName: string) => {
    router.push(`/studio?team=${encodeURIComponent(teamName)}`);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gradient-to-b from-neutral-900 via-neutral-950 to-neutral-950 min-h-screen">
      <div className="max-w-4xl w-full text-center mb-12 space-y-3">
        <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
          KBO 프로야구 AI 응원가 스튜디오
        </h1>
        <p className="text-neutral-400 text-sm font-medium tracking-wide">
          원하는 KBO 구단을 선택하고 고유의 팀 컬러가 반영된 AI 응원가를 빌드해 보세요.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-6xl w-full">
        {KBO_TEAMS_LIST.map((team) => (
          <div
            key={team.id}
            onClick={() => selectTeam(team.name)}
            className="group relative rounded-3xl bg-neutral-900/60 border border-neutral-850 p-5 flex flex-col items-center justify-between text-center cursor-pointer hover:border-neutral-700 hover:bg-neutral-900 transition-all transform hover:-translate-y-1.5 aspect-[4/5] overflow-hidden shadow-xl"
          >
            <button className="absolute top-4 right-4 text-neutral-600 hover:text-amber-400 transition-colors z-20">
              <Star size={16} />
            </button>

            <div
              className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 p-1 z-10 relative mt-2 flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-105"
              style={{ borderColor: team.primaryColor }}
            >
              <div
                className="w-full h-full rounded-full flex flex-col items-center justify-center border border-neutral-800/50 relative overflow-hidden select-none"
                style={{ backgroundColor: team.primaryColor }}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/20" />
                <span className="text-base md:text-lg font-black tracking-tight text-white z-10 drop-shadow-md">
                  {team.playerName}
                </span>
                <span className="text-[8px] font-bold text-white/60 uppercase tracking-widest scale-90 z-10 mt-0.5">
                  {team.id}
                </span>
              </div>
            </div>

            <div className="w-full z-10 relative mt-3 flex flex-col items-center">
              <div className="flex items-center justify-center gap-1.5 w-full px-1">
                <h3 className="font-black text-base md:text-lg text-neutral-100 group-hover:text-white transition-colors tracking-tight truncate">
                  {team.name}
                </h3>
              </div>

              <span
                className="text-[9px] uppercase tracking-wider font-bold px-3 py-1 rounded-full inline-block mt-2 shrink-0"
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