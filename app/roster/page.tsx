'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const kboTeams = [
  { name: 'KIA 타이거즈', color: 'bg-red-600', players: ['최형우', '김도영', '나성범', '양현종', '박찬호', '소크라테스', '김선빈', '이의리', '정해영', '한준수'] },
  { name: 'LG 트윈스', color: 'bg-red-800', players: ['오지환', '김현수', '홍창기', '임찬규', '문성주', '박해민', '구본혁', '최원태', '유영찬', '켈리'] },
  { name: '삼성 라이온즈', color: 'bg-blue-800', players: ['구자욱', '김영웅', '원태인', '강민호', '이재현', '김지찬', '데이비드', '오승환', '류지혁', '김헌곤'] },
  { name: '두산 베어스', color: 'bg-blue-900', players: ['양의지', '김재환', '허경민', '정수빈', '강승호', '곽빈', '알칸타라', '김택연', '양석환', '박준영'] },
  { name: '한화 이글스', color: 'bg-orange-500', players: ['노시환', '채은성', '문동주', '류현진', '김서현', '안치홍', '최재훈', '이도윤', '김태연', '페라자'] },
  { name: 'SSG 랜더스', color: 'bg-red-700', players: ['최정', '김광현', '한유섬', '박성한', '오태곤', '기예르모', '조병현', '고명준', '이원준', '박지환'] },
  { name: 'NC 다이노스', color: 'bg-blue-600', players: ['손아섭', '박건우', '구창모', '김주원', '권희동', '서호철', '김형준', '오영수', '김휘집', '이용찬'] },
  { name: 'kt wiz', color: 'bg-red-900', players: ['강백호', '박병호', '황재균', '김상수', '문상철', '엄상백', '고영표', '쿠에바스', '천성호', '김민'] },
  { name: '롯데 자이언츠', color: 'bg-blue-500', players: ['전준우', '윤동희', '김원중', '박세웅', '손호영', '고승민', '나승엽', '황성빈', '정보근', '레이예스'] },
  { name: '키움 히어로즈', color: 'bg-gray-800', players: ['김혜성', '송성문', '이주형', '최주환', '하영민', '김선기', '김재현', '변상권', '주성원', '전준표'] },
];

export default function Roster() {
  const [selectedTeam, setSelectedTeam] = useState(kboTeams[0]);
  const router = useRouter();

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">구단 및 선수 선택</h1>

      {/* 10개 구단 버튼 */}
      <div className="grid grid-cols-5 gap-2 mb-10">
        {kboTeams.map((team) => (
          <button
            key={team.name}
            onClick={() => setSelectedTeam(team)}
            className={`p-3 rounded-lg font-bold text-sm transition-all ${selectedTeam.name === team.name ? `${team.color} text-white` : 'bg-gray-100 hover:bg-gray-200'
              }`}
          >
            {team.name}
          </button>
        ))}
      </div>

      {/* 선수 그리드 */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {selectedTeam.players.map((player) => (
          <div
            key={player}
            onClick={() => router.push(`/studio?team=${selectedTeam.name}&player=${player}`)}
            className="p-4 border rounded-xl hover:border-red-500 hover:shadow-md cursor-pointer transition-all text-center"
          >
            <div className="text-3xl mb-2">⚾️</div>
            <p className="font-bold">{player}</p>
          </div>
        ))}
      </div>
    </div>
  );
}