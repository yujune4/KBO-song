'use client';

import { useState, useEffect, useRef } from 'react';

export default function LibraryPage() {
    const [savedSongs, setSavedSongs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPlayingId, setCurrentPlayingId] = useState<string | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        try {
            const existing = localStorage.getItem('basebeat_released_songs');
            if (existing) {
                const parsed = JSON.parse(existing);
                if (Array.isArray(parsed)) {
                    const uniqueSongs = parsed.filter((song, index, self) =>
                        index === self.findIndex((t) => t.id === song.id || (t.title === song.title && t.audioUrl === song.audioUrl))
                    );
                    setSavedSongs(uniqueSongs);
                }
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        audioRef.current = new Audio();

        const handleAudioEnd = () => {
            setCurrentPlayingId(null);
        };

        audioRef.current.addEventListener('ended', handleAudioEnd);
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.removeEventListener('ended', handleAudioEnd);
            }
        };
    }, []);

    const handlePlayPause = (song: any) => {
        if (!audioRef.current) return;

        if (currentPlayingId === song.id) {
            audioRef.current.pause();
            setCurrentPlayingId(null);
        } else {
            audioRef.current.src = song.audioUrl;
            audioRef.current.load();
            audioRef.current.play().catch((err) => console.error(err));
            setCurrentPlayingId(song.id);
        }
    };

    const handleDeleteSong = (id: string) => {
        if (!confirm('해당 응원가를 보관함에서 삭제하시겠습니까?')) return;

        if (currentPlayingId === id && audioRef.current) {
            audioRef.current.pause();
            setCurrentPlayingId(null);
        }

        const updated = savedSongs.filter((song) => song.id !== id);
        setSavedSongs(updated);
        localStorage.setItem('basebeat_released_songs', JSON.stringify(updated));
    };

    if (loading) {
        return <div className="p-12 bg-[#0b0e14] min-h-screen text-white text-sm text-gray-500">보관함 로딩 중...</div>;
    }

    return (
        <div className="p-12 bg-[#0b0e14] min-h-screen text-white font-sans">
            <div className="mb-10 border-b border-gray-900 pb-6">
                <h1 className="text-2xl font-black tracking-tight text-green-400">📂 My Song Archive</h1>
                <p className="text-xs text-gray-500 mt-1">발매 완료된 나만의 응원가 리스트를 관리합니다.</p>
            </div>

            {savedSongs.length === 0 ? (
                <div className="text-center py-24 border border-dashed border-gray-800 rounded-xl text-xs text-gray-500">
                    아직 저장된 응원가가 없습니다. 첫 응원가를 발매해 보세요!
                </div>
            ) : (
                <div className="bg-[#12161f] border border-gray-800/60 rounded-xl overflow-hidden shadow-xl">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-800 text-[11px] font-mono tracking-wider text-gray-400 bg-[#1c212c]/40">
                                <th className="py-4 px-6 w-[12%] text-center">재생</th>
                                <th className="py-4 px-6">곡 제목</th>
                                <th className="py-4 px-6">구단</th>
                                <th className="py-4 px-6">구장</th>
                                <th className="py-4 px-6">발매일</th>
                                <th className="py-4 px-6">상태</th>
                                <th className="py-4 px-6 w-[10%] text-center">관리</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800/50 text-xs">
                            {savedSongs.map((song, index) => {
                                const rowKey = song.id ? `${song.id}_${index}` : `song_${index}_${Date.now()}`;
                                const isPlaying = currentPlayingId === song.id;
                                return (
                                    <tr key={rowKey} className="hover:bg-[#1c212c]/30 transition">
                                        <td className="py-4 px-6 text-center">
                                            <button
                                                onClick={() => handlePlayPause(song)}
                                                className={`w-8 h-8 rounded-full flex items-center justify-center transition ${isPlaying
                                                        ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                                                        : 'bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500 hover:text-black'
                                                    }`}
                                            >
                                                {isPlaying ? '⏸' : '▶'}
                                            </button>
                                        </td>
                                        <td className="py-4 px-6 font-bold text-gray-200">{song.title}</td>
                                        <td className="py-4 px-6 text-gray-400">{song.team}</td>
                                        <td className="py-4 px-6 text-gray-400">{song.stadium}</td>
                                        <td className="py-4 px-6 text-gray-500 font-mono">{song.date}</td>
                                        <td className="py-4 px-6">
                                            <span className="bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-bold px-2.5 py-1 rounded">
                                                {song.status || '완료'}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-center">
                                            <button
                                                onClick={() => handleDeleteSong(song.id)}
                                                className="text-xs text-gray-500 hover:text-red-400 font-bold px-2 py-1 rounded transition"
                                                title="삭제"
                                            >
                                                🗑️
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}