'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Studio() {
    const searchParams = useSearchParams();
    const team = searchParams.get('team') || '구단';
    const player = searchParams.get('player') || '선수';

    const [lyrics, setLyrics] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleGenerateLyrics = async () => {
        setLoading(true);
        const res = await fetch('/api/generate', {
            method: 'POST',
            body: JSON.stringify({ action: 'generate-lyrics', team, playerName: player, keywords: '승리, 홈런' })
        });
        const data = await res.json();
        setLyrics(data.lyrics);
        setLoading(false);
    };

    return (
        <div className="max-w-3xl mx-auto p-8 space-y-6">
            <h1 className="text-2xl font-bold">스튜디오: {team} - {player}</h1>

            {/* 고정된 정보 표시 */}
            <div className="p-6 bg-gray-100 rounded-xl border-2 border-blue-200">
                <p>현재 제작 중인 응원가: <strong>{team} {player}</strong></p>
                <button
                    onClick={handleGenerateLyrics}
                    className="mt-4 w-full p-3 bg-blue-600 text-white rounded font-bold hover:bg-blue-700"
                >
                    {loading ? "작사 중..." : "✍️ AI 가사 생성하기"}
                </button>
            </div>

            {/* 가사 편집 섹션 */}
            {lyrics && (
                <div className="space-y-4">
                    <textarea
                        value={lyrics}
                        onChange={(e) => setLyrics(e.target.value)}
                        className="w-full h-48 p-4 border rounded shadow-sm"
                    />
                    <button onClick={() => router.push('/mixer')} className="w-full p-4 bg-green-600 text-white rounded-xl font-bold">
                        🎵 가창 입히기 및 다음 단계로
                    </button>
                </div>
            )}
        </div>
    );
}