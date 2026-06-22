'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function MixerPage() {
    return (
        <Suspense fallback={<div className="p-12 bg-[#0b0e14] min-h-screen text-white text-center">믹서 모듈 로딩 중...</div>}>
            <MixerContent />
        </Suspense>
    );
}

function MixerContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const team = searchParams.get('team') || '우리 구단';
    const player = searchParams.get('player') || '선수';
    const keywords = searchParams.get('keywords') || '';
    const rawAudio = searchParams.get('audio') || '';
    const rawLyrics = searchParams.get('lyrics') || '';

    const [vocalAudio, setVocalAudio] = useState('');
    const [lyrics, setLyrics] = useState('');

    useEffect(() => {
        let finalAudio = rawAudio;
        let finalLyrics = rawLyrics;

        if (!finalAudio) {
            try {
                finalAudio = sessionStorage.getItem('basebeat_current_audio') || '';
            } catch (e) {
                console.error(e);
            }
        }
        if (!finalLyrics) {
            try {
                finalLyrics = sessionStorage.getItem('basebeat_current_lyrics') || '';
            } catch (e) {
                console.error(e);
            }
        }

        const fallback = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
        setVocalAudio(finalAudio.trim() !== '' ? finalAudio : fallback);
        setLyrics(finalLyrics.trim() !== '' ? finalLyrics : '가사 정보 없음');
    }, [rawAudio, rawLyrics]);

    const handleNextStep = () => {
        const finalAudioUrl = vocalAudio || rawAudio || sessionStorage.getItem('basebeat_current_audio') || "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

        const params = new URLSearchParams({
            team: team,
            player: player,
            keywords: keywords,
            lyrics: lyrics,
            audio: finalAudioUrl
        });

        try {
            sessionStorage.setItem('basebeat_current_audio', finalAudioUrl);
            sessionStorage.setItem('basebeat_current_lyrics', lyrics);
        } catch (e) {
            console.error(e);
        }

        router.push(`/release?${params.toString()}`);
    };

    return (
        <div className="p-12 bg-[#0b0e14] min-h-screen text-white font-sans">
            <div className="mb-14 border-b border-gray-900 pb-8">
                <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                    🎛️ Melody & Crowd Mixer
                </h1>
                <p className="text-sm text-gray-500 mt-2 font-medium tracking-wide">
                    생성된 Mureka 보컬에 구장 관중 소음 및 현장 이펙트 레이어를 결합합니다.
                </p>
            </div>

            <div className="grid grid-cols-12 gap-8 max-w-6xl mx-auto">
                <div className="col-span-6 bg-[#12161f] border border-gray-800 rounded-xl p-6 flex flex-col justify-center space-y-8">
                    <div>
                        <div className="flex justify-between text-xs font-bold text-gray-400 uppercase mb-2">
                            <span>AI 가창 보컬 볼륨</span>
                            <span className="text-green-400">100%</span>
                        </div>
                        <input type="range" min="0" max="100" defaultValue="100" className="w-full h-1.5 bg-[#0b0e14] rounded-lg appearance-none cursor-pointer accent-green-400" />
                    </div>
                    <div>
                        <div className="flex justify-between text-xs font-bold text-gray-400 uppercase mb-2">
                            <span>현장 앰프 관중 소음</span>
                            <span className="text-green-400">45%</span>
                        </div>
                        <input type="range" min="0" max="100" defaultValue="45" className="w-full h-1.5 bg-[#0b0e14] rounded-lg appearance-none cursor-pointer accent-green-400" />
                    </div>
                </div>

                <div className="col-span-6 bg-[#12161f] border border-gray-800 rounded-xl p-6 flex flex-col justify-between h-[300px]">
                    <div className="space-y-4">
                        <span className="text-[10px] font-mono bg-blue-500/10 text-blue-400 px-2.5 py-1 rounded font-bold uppercase border border-blue-500/20 tracking-wider inline-block">
                            MIX TARGET INFRA
                        </span>
                        <div className="border-b border-gray-800 pb-3">
                            <h3 className="text-base font-black text-white">{team} - {player || '공통 응원가'}</h3>
                        </div>
                        <div className="text-xs font-mono text-gray-400 leading-relaxed bg-[#0b0e14] border border-gray-900 rounded-xl p-4 max-h-[120px] overflow-y-auto whitespace-pre-wrap">
                            {lyrics}
                        </div>
                    </div>

                    <button
                        onClick={handleNextStep}
                        className="w-full mt-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-black font-black py-4 rounded-xl text-xs shadow-md transition tracking-wider"
                    >
                        최종 마스터링 릴리즈 스튜디오 이동 ⚡
                    </button>
                </div>
            </div>
        </div>
    );
}