'use client';

import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { KBO_TEAMS } from '../constants/teams';
import { Volume2, Play, Pause, RotateCcw, Sliders, Music, Radio } from 'lucide-react';

function MixerContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const teamParam = searchParams.get('team') || 'LG 트윈스';
    const team = KBO_TEAMS[teamParam] || Object.values(KBO_TEAMS)[0];

    const [isPlaying, setIsPlaying] = useState(false);
    const [vocalVolume, setVocalVolume] = useState(80);
    const [beatVolume, setBeatVolume] = useState(70);
    const [crowdVolume, setCrowdVolume] = useState(40);

    return (
        <div className={`flex-1 min-h-screen bg-gradient-to-b ${team.bgGradient} p-8 flex flex-col items-center justify-center`}>
            <div className="max-w-4xl w-full bg-neutral-900/90 border border-neutral-800 rounded-3xl p-8 backdrop-blur shadow-2xl flex flex-col space-y-8">

                <div className="flex items-center justify-between pb-6 border-b border-neutral-800">
                    <div className="flex items-center gap-3">
                        <div className="p-3 rounded-xl bg-neutral-800 text-emerald-400 border border-neutral-700">
                            <Sliders size={20} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black tracking-tight text-white">오디오 오버레이 믹서룸</h2>
                            <p className="text-xs text-neutral-400">{team.name} 테마 사운 밸런싱</p>
                        </div>
                    </div>

                    <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        style={{ backgroundColor: isPlaying ? '#404040' : team.primaryColor }}
                        className="px-6 py-3 rounded-xl font-bold text-white flex items-center gap-2 hover:opacity-90 transition-all shadow-lg text-sm"
                    >
                        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                        {isPlaying ? '믹싱 중단' : '전체 트랙 청음'}
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 flex flex-col space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-neutral-400 tracking-wider uppercase flex items-center gap-1.5">
                                <Music size={14} className="text-pink-400" /> 01. AI 가창 보컬
                            </span>
                            <span className="text-xs font-mono text-neutral-500">{vocalVolume}%</span>
                        </div>
                        <div className="h-32 flex items-center justify-center bg-neutral-900/50 rounded-xl border border-neutral-850 relative overflow-hidden">
                            <div className={`w-1 bg-pink-500 h-12 rounded-full mx-0.5 ${isPlaying ? 'animate-pulse' : ''}`} />
                            <div className={`w-1 bg-pink-500 h-20 rounded-full mx-0.5 ${isPlaying ? 'animate-bounce delay-75' : ''}`} />
                            <div className={`w-1 bg-pink-500 h-16 rounded-full mx-0.5 ${isPlaying ? 'animate-bounce delay-150' : ''}`} />
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={vocalVolume}
                            onChange={(e) => setVocalVolume(Number(e.target.value))}
                            className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-pink-500"
                        />
                    </div>

                    <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 flex flex-col space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-neutral-400 tracking-wider uppercase flex items-center gap-1.5">
                                <Radio size={14} className="text-blue-400" /> 02. 응원 비트 / MR
                            </span>
                            <span className="text-xs font-mono text-neutral-500">{beatVolume}%</span>
                        </div>
                        <div className="h-32 flex items-center justify-center bg-neutral-900/50 rounded-xl border border-neutral-850 relative overflow-hidden">
                            <div className={`w-1 bg-blue-500 h-8 rounded-full mx-0.5 ${isPlaying ? 'animate-bounce delay-100' : ''}`} />
                            <div className={`w-1 bg-blue-500 h-16 rounded-full mx-0.5 ${isPlaying ? 'animate-pulse' : ''}`} />
                            <div className={`w-1 bg-blue-500 h-10 rounded-full mx-0.5 ${isPlaying ? 'animate-bounce delay-75' : ''}`} />
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={beatVolume}
                            onChange={(e) => setBeatVolume(Number(e.target.value))}
                            className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />
                    </div>

                    <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 flex flex-col space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-neutral-400 tracking-wider uppercase flex items-center gap-1.5">
                                <Volume2 size={14} className="text-emerald-400" /> 03. 관중석 앰비언스
                            </span>
                            <span className="text-xs font-mono text-neutral-500">{crowdVolume}%</span>
                        </div>
                        <div className="h-32 flex items-center justify-center bg-neutral-900/50 rounded-xl border border-neutral-850 relative overflow-hidden">
                            <div className={`w-1 bg-emerald-500 h-14 rounded-full mx-0.5 ${isPlaying ? 'animate-bounce' : ''}`} />
                            <div className={`w-1 bg-emerald-500 h-6 rounded-full mx-0.5 ${isPlaying ? 'animate-bounce delay-150' : ''}`} />
                            <div className={`w-1 bg-emerald-500 h-12 rounded-full mx-0.5 ${isPlaying ? 'animate-pulse' : ''}`} />
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={crowdVolume}
                            onChange={(e) => setCrowdVolume(Number(e.target.value))}
                            className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                        />
                    </div>
                </div>

                <div className="pt-6 border-t border-neutral-800 flex items-center justify-between">
                    <button
                        onClick={() => { setVocalVolume(80); setBeatVolume(70); setCrowdVolume(40); }}
                        className="flex items-center gap-1.5 text-xs font-bold text-neutral-500 hover:text-neutral-300 transition-colors"
                    >
                        <RotateCcw size={14} /> 믹스 초기화
                    </button>

                    <button
                        onClick={() => router.push(`/stadium?team=${encodeURIComponent(team.name)}`)}
                        style={{ backgroundColor: team.primaryColor }}
                        className="px-5 py-2.5 rounded-xl text-xs font-bold text-white hover:opacity-90 transition-opacity flex items-center gap-1.5 shadow-md"
                    >
                        3단계: 현장 전광판 송출 기지 이동
                    </button>
                </div>

            </div>
        </div>
    );
}

export default function MixerPage() {
    return (
        <Suspense fallback={<div className="flex-1 bg-neutral-950" />}>
            <MixerContent />
        </Suspense>
    );
}