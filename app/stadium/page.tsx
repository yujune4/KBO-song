'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { KBO_TEAMS } from '../constants/teams';
import { Landmark, Tv, Maximize2, Volume2, Users, Sliders } from 'lucide-react';

function StadiumContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const teamParam = searchParams.get('team') || 'LG 트윈스';
    const team = KBO_TEAMS[teamParam] || Object.values(KBO_TEAMS)[0];

    const [isLive, setIsLive] = useState(false);
    const [currentMetric, setCurrentMetric] = useState(105);

    useEffect(() => {
        if (!isLive) return;
        const interval = setInterval(() => {
            setCurrentMetric(Math.floor(Math.random() * (120 - 98 + 1)) + 98);
        }, 800);
        return () => clearInterval(interval);
    }, [isLive]);

    return (
        <div className={`flex-1 min-h-screen bg-gradient-to-b ${team.bgGradient} p-8 flex flex-col items-center justify-center`}>
            <div className="max-w-4xl w-full bg-neutral-900/90 border border-neutral-800 rounded-3xl p-8 backdrop-blur shadow-2xl flex flex-col space-y-6">

                <div className="flex items-center justify-between pb-6 border-b border-neutral-800">
                    <div className="flex items-center gap-3">
                        <div className="p-3 rounded-xl bg-neutral-800 text-emerald-400 border border-neutral-700">
                            <Landmark size={20} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black tracking-tight text-white">현장 전광판 시뮬레이터</h2>
                            <p className="text-xs text-neutral-400">{team.name} 홈구장 앰비언트 인게이지먼트</p>
                        </div>
                    </div>

                    <button
                        onClick={() => setIsLive(!isLive)}
                        style={{ backgroundColor: isLive ? '#CE0E2D' : team.primaryColor }}
                        className="px-5 py-2.5 rounded-xl text-xs font-bold text-white flex items-center gap-1.5 hover:opacity-90 transition-all shadow-lg"
                    >
                        <Tv size={14} />
                        {isLive ? '전광판 송출 중단' : '라이브 전광판 가동'}
                    </button>
                </div>

                <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 flex flex-col items-center justify-center p-6 shadow-inner">
                    <div
                        className="absolute inset-0 opacity-20 bg-cover bg-center transition-all duration-700"
                        style={{ backgroundImage: `url('${team.stadiumBg}')`, filter: isLive ? 'contrast(1.2) brightness(0.8)' : 'grayscale(0.5)' }}
                    />

                    <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                        <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-red-500 animate-ping' : 'bg-neutral-600'}`} />
                        <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                            {isLive ? 'LIVE // STADIUM_ON' : 'STANDBY'}
                        </span>
                    </div>

                    <div className="z-10 text-center space-y-4 max-w-xl">
                        <h1
                            style={{ color: isLive ? team.primaryColor : '#737373', textShadow: isLive ? `0 0 20px ${team.primaryColor}50` : 'none' }}
                            className="text-3xl md:text-5xl font-black tracking-widest transition-all duration-300"
                        >
                            {isLive ? '승리를 향하여!' : 'READY TO PLAY'}
                        </h1>
                        <p className={`text-base md:text-xl font-bold tracking-wide text-neutral-200 transition-opacity duration-500 ${isLive ? 'opacity-100' : 'opacity-40'}`}>
                            {isLive ? `오오ㅡ 외쳐라 ${team.name}의 심장 마치 터질 듯이!` : '가사 및 가창 트랙 믹싱 완료 후 전광판을 가동하세요.'}
                        </p>
                    </div>

                    {isLive && (
                        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center z-10 px-2">
                            <span className="text-[10px] font-mono text-neutral-500 flex items-center gap-1">
                                <Volume2 size={12} /> CROWD CHANT DELAY: 24ms
                            </span>
                            <span className="text-[10px] font-mono text-neutral-500 flex items-center gap-1">
                                <Maximize2 size={12} /> FULLSCREEN
                            </span>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-4">
                    <div className="bg-neutral-950/60 border border-neutral-850 rounded-xl p-4 flex items-center gap-4">
                        <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400">
                            <Users size={16} />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">가상 관중 떼창 압력</p>
                            <p className="text-sm font-mono font-bold text-neutral-200 mt-0.5">{isLive ? `${currentMetric} dB` : '0 dB'}</p>
                        </div>
                    </div>

                    <div className="bg-neutral-950/60 border border-neutral-850 rounded-xl p-4 flex items-center gap-4">
                        <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400">
                            <Sliders size={16} />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">스피커 리버브 모드</p>
                            <p className="text-sm font-bold text-neutral-200 mt-0.5">{isLive ? '웅장한 스타디움 돔' : '비활성화'}</p>
                        </div>
                    </div>

                    <div className="bg-neutral-950/60 border border-neutral-850 rounded-xl p-4 flex items-center gap-4">
                        <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400">
                            <Landmark size={16} />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">송출 구장 매핑</p>
                            <p className="text-sm font-bold text-neutral-200 mt-0.5">{team.name} 전용 홈구장</p>
                        </div>
                    </div>
                </div>

                <div className="pt-4 border-t border-neutral-800 flex justify-end">
                    <button
                        onClick={() => router.push(`/release?team=${encodeURIComponent(team.name)}`)}
                        style={{ backgroundColor: team.primaryColor }}
                        className="px-6 py-3 rounded-xl text-xs font-bold text-white hover:opacity-90 transition-opacity shadow-md flex items-center gap-1"
                    >
                        최종 단계: 마스터 음원 마스터링 & 릴리즈
                    </button>
                </div>

            </div>
        </div>
    );
}

export default function StadiumPage() {
    return (
        <Suspense fallback={<div className="flex-1 bg-neutral-950" />}>
            <StadiumContent />
        </Suspense>
    );
}