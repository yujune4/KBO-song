'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface ReleasedSong {
    id: string;
    title: string;
    team: string;
    player: string;
    genre: string;
    date: string;
    status: string;
    lyrics: string[];
    melody: number[];
    type: OscillatorType;
    tempo: number;
}

export default function LibraryPage() {
    const router = useRouter();
    const [savedSongs, setSavedSongs] = useState<ReleasedSong[]>([]);
    const [playingId, setPlayingId] = useState<string | null>(null);
    const [currentLineIndex, setCurrentLineIndex] = useState<number>(-1);

    const audioCtxRef = useRef<AudioContext | null>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const activeNodesRef = useRef<{ osc: OscillatorNode; gain: GainNode }[]>([]);

    useEffect(() => {
        const localSongsData = localStorage.getItem('basebeat_released_songs');
        if (localSongsData) {
            try {
                const parsed = JSON.parse(localSongsData);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    setSavedSongs(parsed);
                    return;
                }
            } catch (e) { }
        }

        const fallbackSong: ReleasedSong = {
            id: 'fallback',
            title: '⚡ 아직 등록된 커스텀 응원가가 없습니다.',
            team: '삼성 라이온즈',
            player: '이재현',
            genre: '🎻 오케스트라',
            date: '2026.06.04',
            status: '대기 중',
            lyrics: ["스튜디오에서 제목과 가사를 만들고 확정 버튼을 눌러주세요!"],
            melody: [261.63, 311.13, 392.00, 466.16],
            type: 'triangle',
            tempo: 105,
        };
        setSavedSongs([fallbackSong]);
    }, []);

    const handleDeleteSong = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();

        if (!confirm('정말 이 응원가를 보관함에서 삭제하시겠습니까?')) {
            return;
        }

        if (playingId === id) {
            stopAudio();
        }

        const updatedSongs = savedSongs.filter(song => song.id !== id);
        setSavedSongs(updatedSongs);

        if (updatedSongs.length > 0) {
            localStorage.setItem('basebeat_released_songs', JSON.stringify(updatedSongs));
        } else {
            localStorage.removeItem('basebeat_released_songs');
            setSavedSongs([{
                id: 'fallback',
                title: '⚡ 아직 등록된 커스텀 응원가가 없습니다.',
                team: '삼성 라이온즈',
                player: '이재현',
                genre: '🎻 오케스트라',
                date: '2026.06.04',
                status: '대기 중',
                lyrics: ["스튜디오에서 제목과 가사를 만들고 확정 버튼을 눌러주세요!"],
                melody: [261.63, 311.13, 392.00, 466.16],
                type: 'triangle',
                tempo: 105,
            }]);
        }
    };

    const playStep = (ctx: AudioContext, song: ReleasedSong, stepRef: { current: number }) => {
        const noteLength = 60 / song.tempo / 2;
        const currentStep = stepRef.current;
        const freq = song.melody[currentStep % song.melody.length];

        if (song.lyrics && song.lyrics.length > 0) {
            const lineIndex = Math.floor(currentStep / 4) % song.lyrics.length;
            setCurrentLineIndex(lineIndex);
        }

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = song.type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.14, ctx.currentTime + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + noteLength - 0.02);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + noteLength);

        if (currentStep % 2 === 0) {
            const tomOsc = ctx.createOscillator();
            const tomGain = ctx.createGain();
            tomOsc.frequency.setValueAtTime(90, ctx.currentTime);
            tomOsc.frequency.linearRampToValueAtTime(30, ctx.currentTime + 0.15);
            tomGain.gain.setValueAtTime(0.2, ctx.currentTime);
            tomGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
            tomOsc.connect(tomGain);
            tomGain.connect(ctx.destination);
            tomOsc.start();
            tomOsc.stop(ctx.currentTime + 0.2);
        }

        activeNodesRef.current.push({ osc, gain });
        stepRef.current = currentStep + 1;

        timerRef.current = setTimeout(() => {
            playStep(ctx, song, stepRef);
        }, noteLength * 1000);
    };

    const handlePlayAudio = (song: ReleasedSong) => {
        if (playingId === song.id) { stopAudio(); return; }
        if (playingId) stopAudio();

        if (!audioCtxRef.current) {
            audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        const ctx = audioCtxRef.current;
        if (ctx.state === 'suspended') ctx.resume();

        setPlayingId(song.id);
        const stepRef = { current: 0 };
        playStep(ctx, song, stepRef);
    };

    const stopAudio = () => {
        if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; }
        activeNodesRef.current.forEach(({ osc, gain }) => {
            try { osc.stop(); osc.disconnect(); gain.disconnect(); } catch (e) { }
        });
        activeNodesRef.current = [];
        setPlayingId(null);
        setCurrentLineIndex(-1);
    };

    useEffect(() => {
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
            activeNodesRef.current.forEach(({ osc }) => { try { osc.stop(); } catch (e) { } });
        };
    }, []);

    const currentPlayingSong = savedSongs.find(s => s.id === playingId);

    return (
        <div className="p-12 bg-[#0b0e14] min-h-screen text-white font-sans selection:bg-green-500/30">
            <div className="mb-14 flex justify-between items-start border-b border-gray-900 pb-8">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                        🗃️ BaseBeat Archive
                    </h1>
                    <p className="text-sm text-gray-500 mt-2 font-medium tracking-wide">
                        내가 보관한 나만의 구단별 커스텀 응원가 목록을 확인하고 감상하세요.
                    </p>
                </div>
                <button
                    onClick={() => { stopAudio(); router.push('/'); }}
                    className="text-xs font-bold tracking-wider uppercase border border-gray-800 hover:border-green-500/50 text-gray-400 hover:text-green-400 px-5 py-3 rounded-xl transition duration-200"
                >
                    새 응원가 제작하기 ➕
                </button>
            </div>

            <div className="grid grid-cols-12 gap-8">
                <div className={`${playingId ? 'col-span-7' : 'col-span-12'} transition-all duration-300 bg-[#12161f] border border-gray-800/60 rounded-xl p-6`}>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="border-b border-gray-800 text-gray-400 text-xs font-mono uppercase tracking-wider">
                                    <th className="py-3 px-4">구단</th>
                                    <th className="py-3 px-4">내가 지은 응원가 타이틀 / 대상</th>
                                    <th className="py-3 px-4">스타일</th>
                                    <th className="py-3 px-4 text-center">액션</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800/50">
                                {savedSongs.map((song) => (
                                    <tr key={song.id} className="hover:bg-[#1c212c]/40 transition">
                                        <td className="py-4 px-4 font-bold text-blue-400">{song.team}</td>
                                        <td className="py-4 px-4">
                                            <div className="font-semibold text-white text-sm">{song.title}</div>
                                            <div className="text-xs text-blue-300 mt-0.5">🎯 {song.player} 선수 전용</div>
                                        </td>
                                        <td className="py-4 px-4 text-xs font-mono text-gray-400">{song.genre}</td>
                                        <td className="py-4 px-4 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    onClick={() => handlePlayAudio(song)}
                                                    className={`text-xs font-bold px-3 py-1.5 rounded transition shadow-sm w-20 ${playingId === song.id ? 'bg-red-500 text-white' : 'bg-[#1c212c] text-gray-300 hover:bg-blue-500 hover:text-white'
                                                        }`}
                                                >
                                                    {playingId === song.id ? '정지 ⏸️' : '듣기 ▶️'}
                                                </button>

                                                {song.id !== 'fallback' && (
                                                    <button
                                                        onClick={(e) => handleDeleteSong(song.id, e)}
                                                        className="text-xs font-bold px-2.5 py-1.5 rounded bg-gray-800/80 hover:bg-red-600/20 hover:text-red-400 text-gray-500 border border-gray-700/60 transition"
                                                        title="응원가 삭제"
                                                    >
                                                        삭제 🗑️
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {playingId && currentPlayingSong && (
                    <div className="col-span-5 bg-[#12161f] border border-blue-900/30 rounded-xl p-6 flex flex-col justify-between animate-fade-in">
                        <div>
                            <div className="mb-3">
                                <h3 className="text-xs font-bold text-blue-400 tracking-wider uppercase mb-1">NOW PLAYING</h3>
                                <p className="text-xs font-bold text-gray-200 truncate">{currentPlayingSong.title}</p>
                            </div>

                            <div className="space-y-3 bg-[#0b0e14] p-4 rounded-lg border border-gray-800 h-[260px] overflow-y-auto flex flex-col justify-center text-center">
                                {(currentPlayingSong.lyrics || []).map((line, idx) => (
                                    <p
                                        key={idx}
                                        className={`text-xs transition-all duration-300 ${idx === currentLineIndex ? 'text-blue-400 font-extrabold scale-105' : 'text-gray-600 font-medium'
                                            }`}
                                    >
                                        {line}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}