'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Storage() {
    const router = useRouter();
    const [songs, setSongs] = useState([
        { id: 1, title: '최형우 응원가 (KIA)', date: '2026-06-24' },
        { id: 2, title: '김도영 응원가 (KIA)', date: '2026-06-23' },
    ]);

    const handleDelete = (id: number) => {
        if (confirm("정말 이 응원가를 삭제하시겠습니까?")) {
            setSongs(songs.filter(song => song.id !== id));
        }
    };

    const handlePlay = (title: string) => {
        alert(`🎵 ${title} 재생을 시작합니다.`);
    };

    const handleDownload = (title: string) => {
        alert(`📥 ${title} 다운로드가 시작되었습니다.`);
    };

    return (
        <div className="max-w-4xl mx-auto p-12">
            <h1 className="text-3xl font-bold mb-8">📥 내 보관함</h1>

            <div className="space-y-4">
                {songs.length > 0 ? (
                    songs.map((song) => (
                        <div key={song.id} className="flex justify-between items-center p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all">
                            <div>
                                <h2 className="font-bold text-lg">{song.title}</h2>
                                <p className="text-gray-400 text-sm">{song.date}</p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handlePlay(song.title)}
                                    className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-black"
                                >
                                    ▶ 재생
                                </button>
                                <button
                                    onClick={() => handleDownload(song.title)}
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                >
                                    다운로드
                                </button>
                                <button
                                    onClick={() => handleDelete(song.id)}
                                    className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                                >
                                    삭제
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center py-10 text-gray-400">보관된 응원가가 없습니다.</p>
                )}
            </div>

            <button onClick={() => router.push('/')} className="mt-8 text-gray-500 hover:underline">
                ← 메인으로 돌아가기
            </button>
        </div>
    );
}