'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

export default function AnalyticsPage() {
    return (
        <Suspense fallback={<div className="p-8 bg-[#0b0e14] min-h-screen text-white">로딩 중...</div>}>
            <AnalyticsContent />
        </Suspense>
    );
}

function AnalyticsContent() {
    const searchParams = useSearchParams();

    const teamName = searchParams.get('team') || 'LG 트윈스';
    const playerName = searchParams.get('player') || '선수';
    const effect = searchParams.get('effect') || 'jamsil';

    const [isReleased, setIsReleased] = useState(false);

    const stats = [
        { label: 'EXPECTED POPULARITY', value: '89%', color: 'text-green-400' },
        { label: 'MATCH RATE', value: '94/100', color: 'text-green-400' },
        { label: 'GENRE', value: 'ROCK / ANTHEM', color: 'text-gray-300' },
        { label: 'ESTIMATED COST', value: '120 CD', color: 'text-red-400' }
    ];

    return (
        <div className="p-8 bg-[#0b0e14] min-h-screen text-white font-sans">
            <div className="mb-6">
                <h1 className="text-2xl font-bold tracking-tight text-green-400">Release & Analytics</h1>
                <p className="text-xs text-gray-400 mt-1">완성된 응원가의 최종 분석 보고서 및 발매 대시보드입니다.</p>
            </div>

            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-4 bg-[#12161f] border border-gray-800 rounded-xl p-6 flex flex-col justify-between">
                    <div>
                        <span className="text-[10px] font-mono text-gray-500">ALBUM ART</span>
                        <div className="w-full aspect-square bg-[#1c212c] border border-gray-800 rounded-xl mt-2 flex flex-col items-center justify-center p-4 text-center group relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                            <div className="z-20 mt-auto">
                                <span className="text-[10px] font-mono bg-green-500 text-black px-2 py-0.5 rounded-full font-bold">OFFICIAL</span>
                                <h3 className="text-lg font-bold mt-1 text-white">{playerName} 응원가</h3>
                                <p className="text-xs text-gray-400">{teamName}</p>
                            </div>
                        </div>
                    </div>
                    <button onClick={() => setIsReleased(true)} disabled={isReleased} className={`w-full font-bold py-3 rounded-xl text-sm shadow-md transition mt-6 ${isReleased ? 'bg-[#1c212c] text-gray-500 border border-gray-800 cursor-not-allowed' : 'bg-green-500 hover:bg-green-400 text-black'}`}>{isReleased ? '🎉 KBO 구단 음원 발매 완료' : '🚀 최종 음원 발매하기'}</button>
                </div>

                <div className="col-span-8 bg-[#12161f] border border-gray-800 rounded-xl p-6 flex flex-col justify-between">
                    <div>
                        <h2 className="text-sm font-bold text-gray-400 tracking-wide mb-4">AI PREDICTIVE ANALYTICS</h2>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            {stats.map((stat) => (
                                <div key={stat.label} className="bg-[#1c212c] border border-gray-800 rounded-xl p-4">
                                    <span className="text-[10px] font-mono text-gray-500 block">{stat.label}</span>
                                    <span className={`text-xl font-bold font-mono mt-1 block ${stat.color}`}>{stat.value}</span>
                                </div>
                            ))}
                        </div>
                        <div className="border-t border-gray-800 pt-4 space-y-3">
                            <h3 className="text-xs font-bold text-gray-400 tracking-wide">METADATA SUMMARY</h3>
                            <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                                <div className="bg-[#0b0e14] p-2.5 rounded text-gray-400">TARGET: <span className="text-white">{playerName}</span></div>
                                <div className="bg-[#0b0e14] p-2.5 rounded text-gray-400">CLUB: <span className="text-white">{teamName}</span></div>
                                <div className="bg-[#0b0e14] p-2.5 rounded text-gray-400">SPACE: <span className="text-white uppercase">{effect}</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#1c212c] border border-gray-800 rounded-xl p-4 mt-6">
                        <span className="text-[10px] font-mono text-gray-500">DISTRIBUTION NOTE</span>
                        <p className="text-xs text-gray-400 mt-1 leading-relaxed">발매된 음원은 KBO 정식 시즌 패스 라이센스에 등록되며, 인게임 경기장 앰프 출력 및 관중 스마트 응원봉 앱 비트 동기화 데이터로 자동 변환되어 전송됩니다.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}