'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ReleasePage() {
    return (
        <Suspense fallback={<div className="w-full h-screen flex items-center justify-center">로딩 중...</div>}>
            <ReleaseContent />
        </Suspense>
    );
}

function ReleaseContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isDark, setIsDark] = useState(false);

    const team = searchParams.get('team') || '우리 구단';
    const player = searchParams.get('player') || '선수';
    const stadium = searchParams.get('stadium') || '잠실 야구장';

    const [audioSrc, setAudioSrc] = useState<string>('');
    const [lyrics, setLyrics] = useState('');
    const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
    const isLoadedRef = useRef<boolean>(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') setIsDark(true);
    }, []);

    useEffect(() => {
        if (isDark) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    useEffect(() => {
        const finalAudio = sessionStorage.getItem('basebeat_current_audio') || searchParams.get('audio') || '';
        const finalLyrics = sessionStorage.getItem('basebeat_current_lyrics') || searchParams.get('lyrics') || '';

        if (finalAudio && !isLoadedRef.current) {
            setAudioSrc(finalAudio);
            isLoadedRef.current = true;
        }
        setLyrics(finalLyrics || '가사 정보 없음');
    }, [searchParams]);

    const handleSaveToLibrary = () => {
        try {
            const existing = localStorage.getItem('basebeat_released_songs');
            const parsed = existing ? JSON.parse(existing) : [];

            const newSong = {
                id: `released_${Date.now()}`,
                title: `${team} ${player ? player + ' ' : ''}응원가 (${stadium} Ver.)`,
                team: team,
                stadium: stadium,
                audioUrl: audioSrc || "",
                lyrics: lyrics,
                date: new Date().toLocaleDateString('ko-KR').replace(/\s/g, ''),
                status: '완료'
            };

            localStorage.setItem('basebeat_released_songs', JSON.stringify([newSong, ...parsed]));
            router.push('/library');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className={`w-full min-h-screen p-12 transition-colors duration-300 flex flex-col items-center justify-center relative ${isDark ? 'bg-[#0b0e14]' : 'bg-white'}`}>
            <button
                onClick={() => setIsDark(!isDark)}
                className={`fixed top-6 right-6 px-4 py-2 rounded-full border text-xs font-bold transition-all duration-200 shadow-sm ${isDark
                        ? 'bg-[#12161f] border-gray-800 text-white hover:bg-[#1c212c]'
                        : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                    }`}
            >
                {isDark ? '☀️ LIGHT MODE' : '🌙 DARK MODE'}
            </button>

            <div className={`w-full max-w-2xl border rounded-2xl p-8 shadow-xl transition-colors duration-300 text-center space-y-8 ${isDark ? 'bg-[#12161f] border-gray-800' : 'bg-gray-50 border-gray-200'
                }`}>
                <div>
                    <h1 className={`text-xl font-black tracking-tight flex items-center justify-center gap-2 ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                        🚀 응원가 릴리즈 스튜디오
                    </h1>
                </div>

                <div className={`border rounded-xl p-6 text-left space-y-4 transition-colors duration-300 ${isDark ? 'bg-[#0b0e14] border-gray-800' : 'bg-white border-gray-200'
                    }`}>
                    <span className={`text-[10px] font-mono tracking-wider px-2.5 py-1 rounded font-bold uppercase ${isDark ? 'text-blue-400 bg-blue-500/10' : 'text-blue-600 bg-blue-50'
                        }`}>
                        RELEASED TRACK
                    </span>
                    <h2 className={`text-sm font-black mt-1 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                        {team} {player ? `${player} ` : ''}선수 응원가
                    </h2>

                    <div className="pt-2">
                        {audioSrc ? (
                            <audio
                                ref={audioPlayerRef}
                                src={audioSrc}
                                controls
                                preload="auto"
                                className="w-full h-10"
                            />
                        ) : (
                            <div className={`h-10 w-full rounded animate-pulse ${isDark ? 'bg-[#12161f]' : 'bg-gray-200'}`} />
                        )}
                    </div>
                </div>

                <div className={`border rounded-xl p-6 text-left transition-colors duration-300 ${isDark ? 'bg-[#0b0e14] border-gray-800' : 'bg-white border-gray-200'
                    }`}>
                    <label className={`text-[10px] font-mono tracking-wider font-bold uppercase block mb-3 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                        LYRICS
                    </label>
                    <div className={`text-xs font-mono leading-relaxed max-h-[160px] overflow-y-auto whitespace-pre-wrap pr-2 ${isDark ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                        {lyrics}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <button
                        onClick={handleSaveToLibrary}
                        className={`font-bold py-4 rounded-xl text-xs transition tracking-wider border ${isDark
                                ? 'bg-[#1c212c] hover:bg-[#252c3a] border-gray-800 text-white'
                                : 'bg-white hover:bg-gray-100 border-gray-300 text-gray-700'
                            }`}
                    >
                        📁 아카이브 보관함 이동
                    </button>
                    <a
                        href={audioSrc || '#'}
                        download={`${team}_${player}_응원가.mp3`}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white font-black py-4 rounded-xl text-xs shadow-md transition tracking-wider flex items-center justify-center"
                    >
                        💾 MP3 음원 다운로드
                    </a>
                </div>
            </div>
        </div>
    );
}