'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function MixerPage() {
    return (
        <Suspense fallback={<div className="p-8 bg-[#0b0e14] min-h-screen text-white">로딩 중...</div>}>
            <MixerContent />
        </Suspense>
    );
}

function MixerContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const teamName = searchParams.get('team') || 'LG 트윈스';
    const playerName = searchParams.get('player') || '선수';

    const [volumes, setVolumes] = useState({ vocal: 80, band: 80, reverb: 30, crowd: 50 });
    const [mutes, setMutes] = useState({ vocal: false, band: false, reverb: false, crowd: false });
    const [solos, setSolos] = useState({ vocal: false, band: false, reverb: false, crowd: false });

    const handleNextStep = () => {
        router.push(`/stadium?team=${encodeURIComponent(teamName)}&player=${encodeURIComponent(playerName)}`);
    };

    return (
        <div className="p-8 bg-[#0b0e14] min-h-screen text-white font-sans">
            <div className="mb-6">
                <h1 className="text-2xl font-bold tracking-tight text-green-400">🎛️ Audio Orchestration Mixer</h1>
                <p className="text-xs text-gray-400 mt-1">{teamName} - {playerName} 응원가의 사운드 밸런스를 조절합니다.</p>
            </div>

            <div className="bg-[#12161f] border border-gray-800 rounded-xl p-6 mb-6">
                <div className="grid grid-cols-4 gap-4">
                    {[
                        { id: 'vocal', label: 'AI VOCAL', ch: 'CH 1', db: '-10.0 dB' },
                        { id: 'band', label: 'AMP BAND', ch: 'CH 2', db: '-16.0 dB' },
                        { id: 'reverb', label: 'REVERB', ch: 'CH 3', db: '-24.0 dB' },
                        { id: 'crowd', label: 'CROWD', ch: 'CH 4', db: '-6.0 dB' },
                    ].map((channel) => {
                        const chId = channel.id as 'vocal' | 'band' | 'reverb' | 'crowd';
                        return (
                            <div key={channel.id} className="bg-[#1c212c] border border-gray-800 rounded-xl p-6 flex flex-col items-center justify-between min-h-[300px]">
                                <span className="text-xs font-mono text-gray-500">{channel.ch}</span>
                                <h3 className="text-sm font-bold tracking-wider text-green-400 mt-2">{channel.label}</h3>

                                <div className="my-8 w-full flex justify-center">
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={volumes[chId]}
                                        onChange={(e) => setVolumes((prev) => ({ ...prev, [chId]: Number(e.target.value) }))}
                                        className="w-4/5 accent-green-400 cursor-pointer"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-2 w-full">
                                    <button onClick={() => setMutes((prev) => ({ ...prev, [chId]: !prev[chId] }))} className={`text-xs font-mono py-2 rounded transition ${mutes[chId] ? 'bg-red-500 text-white' : 'bg-[#12161f] text-gray-400 hover:bg-gray-700'}`}>MUTE</button>
                                    <button onClick={() => setSolos((prev) => ({ ...prev, [chId]: !prev[chId] }))} className={`text-xs font-mono py-2 rounded transition ${solos[chId] ? 'bg-yellow-500 text-black font-bold' : 'bg-[#12161f] text-gray-400 hover:bg-gray-700'}`}>SOLO</button>
                                </div>
                                <span className="text-xs font-mono text-gray-400 mt-4">{channel.db}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="bg-[#12161f] border border-gray-800 rounded-xl p-4 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <button className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white text-base font-bold shadow-md hover:bg-red-500 transition">▶</button>
                    <div className="text-left">
                        <div className="text-sm font-bold">오케스트레이션 믹싱 프리뷰</div>
                        <div className="text-xs font-mono text-gray-500">00:00 / 03:00</div>
                    </div>
                </div>
                <button onClick={handleNextStep} className="text-xs bg-green-500 hover:bg-green-400 text-black font-bold px-6 py-3 rounded-lg shadow-md transition">
                    믹싱 완료! 구장 이펙터 룸으로 이동 ➡️
                </button>
            </div>
        </div>
    );
}