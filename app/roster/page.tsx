'use client';

import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { KBO_TEAMS } from '../constants/teams';
import { Users, Search, ChevronRight, Flame } from 'lucide-react';

const DUMMY_ROSTERS: Record<string, Array<{ name: string; position: string; backNumber: string; isHot?: boolean }>> = {
    "LG 트윈스": [
        { name: "홍창기", position: "외야수", backNumber: "51", isHot: true },
        { name: "신민재", position: "내야수", backNumber: "4", isHot: false },
        { name: "오스틴", position: "내야수", backNumber: "23", isHot: true },
        { name: "문보경", position: "내야수", backNumber: "35", isHot: false },
        { name: "박동원", position: "포수", backNumber: "27", isHot: false },
    ],
    "KIA 타이거즈": [
        { name: "김도영", position: "내야수", backNumber: "5", isHot: true },
        { name: "최형우", position: "지명타자", backNumber: "34", isHot: false },
        { name: "나성범", position: "외야수", backNumber: "47", isHot: false },
        { name: "박찬호", position: "내야수", backNumber: "1", isHot: true },
        { name: "양현종", position: "투수", backNumber: "54", isHot: false },
    ],
    "삼성 라이온즈": [
        { name: "구자욱", position: "외야수", backNumber: "5", isHot: true },
        { name: "원태인", position: "투수", backNumber: "18", isHot: true },
        { name: "강민호", position: "포수", backNumber: "47", isHot: false },
        { name: "김영웅", position: "내야수", backNumber: "30", isHot: false },
    ]
};

function RosterContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const teamParam = searchParams.get('team') || 'LG 트윈스';
    const team = KBO_TEAMS[teamParam] || Object.values(KBO_TEAMS)[0];

    const [searchQuery, setSearchQuery] = useState('');
    const players = DUMMY_ROSTERS[team.name] || [
        { name: "에이스", position: "투수", backNumber: "1", isHot: true },
        { name: "대표타자", position: "내야수", backNumber: "10", isHot: false },
        { name: "스타플레이어", position: "외야수", backNumber: "99", isHot: true }
    ];

    const filteredPlayers = players.filter(player =>
        player.name.includes(searchQuery) || player.position.includes(searchQuery)
    );

    const handlePlayerClick = (playerName: string) => {
        router.push(`/studio?team=${encodeURIComponent(team.name)}&player=${encodeURIComponent(playerName)}`);
    };

    return (
        <div className={`flex-1 min-h-screen bg-gradient-to-b ${team.bgGradient} p-8 flex flex-col items-center justify-center`}>
            <div className="max-w-4xl w-full bg-neutral-900/90 border border-neutral-800 rounded-3xl p-8 backdrop-blur shadow-2xl flex flex-col space-y-6">

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
                    <div className="flex items-center gap-3">
                        <div className="p-3 rounded-xl bg-neutral-800 text-emerald-400 border border-neutral-700">
                            <Users size={20} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black tracking-tight text-white">구단 등록 로스터</h2>
                            <p className="text-xs text-neutral-400">{team.name} 선수단 가사 타겟팅 명단</p>
                        </div>
                    </div>

                    <div className="relative max-w-xs w-full">
                        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="선수명 또는 포지션 검색..."
                            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:border-neutral-700 transition-colors"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filteredPlayers.map((player) => (
                        <div
                            key={player.backNumber}
                            onClick={() => handlePlayerClick(player.name)}
                            className="group bg-neutral-950/60 border border-neutral-850 rounded-2xl p-4 flex items-center justify-between cursor-pointer hover:border-neutral-700 hover:bg-neutral-950 transition-all"
                        >
                            <div className="flex items-center gap-4">
                                <div
                                    style={{ backgroundColor: `${team.primaryColor}15`, borderColor: `${team.primaryColor}40` }}
                                    className="w-12 h-12 rounded-xl border flex flex-col items-center justify-center font-mono"
                                >
                                    <span className="text-[10px] text-neutral-500 font-sans">NO.</span>
                                    <span className="text-base font-bold" style={{ color: team.primaryColor }}>{player.backNumber}</span>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold text-neutral-200 group-hover:text-white transition-colors">{player.name}</h3>
                                        {player.isHot && (
                                            <span className="bg-orange-500/10 text-orange-400 border border-orange-500/20 text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                                                <Flame size={10} /> 응원가 최다 생성
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-neutral-500 mt-0.5">{player.position}</p>
                                </div>
                            </div>

                            <button className="text-neutral-600 group-hover:text-neutral-400 transition-colors flex items-center gap-1 text-xs">
                                선택 <ChevronRight size={14} />
                            </button>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}

export default function RosterPage() {
    return (
        <Suspense fallback={<div className="flex-1 bg-neutral-950" />}>
            <RosterContent />
        </Suspense>
    );
}