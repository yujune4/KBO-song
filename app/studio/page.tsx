'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { KBO_TEAMS } from '../constants/teams';
import { Sparkles, Music, Copy, Check } from 'lucide-react';

function StudioContent() {
    const searchParams = useSearchParams();
    const teamParam = searchParams.get('team') || 'LG 트윈스';
    const team = KBO_TEAMS[teamParam] || Object.values(KBO_TEAMS)[0];

    const [playerName, setPlayerName] = useState('');
    const [keywords, setKeywords] = useState('');
    const [lyrics, setLyrics] = useState('');
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState('');

    const generateLyrics = async () => {
        setLoading(true);
        setError('');
        setLyrics('');
        try {
            const res = await fetch('/api/lyrics', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    teamName: team.name,
                    playerName,
                    keywords,
                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || '가사 생성에 실패했습니다.');

            setLyrics(data.lyrics);
        } catch (err: any) {
            setError(err.message || '네트워크 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        if (!lyrics) return;
        navigator.clipboard.writeText(lyrics);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={`flex-1 min-h-screen bg-gradient-to-b ${team.bgGradient} p-8 flex flex-col items-center justify-center`}>
            <div className="max-w-4xl w-full bg-neutral-900/90 border border-neutral-800 rounded-3xl p-8 backdrop-blur shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-8">

                <div className="flex flex-col justify-between space-y-6">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-full overflow-hidden bg-neutral-800 border border-neutral-700 flex items-center justify-center">
                                <img src={team.logoUrl} alt={team.name} className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black tracking-tight text-white">{team.name}</h2>
                                <p className="text-xs text-neutral-400">AI 응원가 가사 제어실</p>
                            </div>
                        </div>

                        <div className="space-y-4 mt-6">
                            <div>
                                <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">선수 이름</label>
                                <input
                                    type="text"
                                    value={playerName}
                                    onChange={(e) => setPlayerName(e.target.value)}
                                    placeholder="예: 홍길동 (미입력 시 공통 응원가)"
                                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-neutral-700 transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">무드 / 커스텀 키워드</label>
                                <input
                                    type="text"
                                    value={keywords}
                                    onChange={(e) => setKeywords(e.target.value)}
                                    placeholder="예: 홈런, 승리, 질주, 열정"
                                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-neutral-700 transition-colors"
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={generateLyrics}
                        disabled={loading}
                        style={{ backgroundColor: team.primaryColor }}
                        className="w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50 transition-opacity shadow-lg"
                    >
                        <Sparkles size={18} className={loading ? 'animate-spin' : ''} />
                        {loading ? 'AI 가사 추출 중...' : 'AI 응원가 가사 생성'}
                    </button>
                </div>

                <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 flex flex-col justify-between min-h-[320px]">
                    <div>
                        <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-4">
                            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                                <Music size={14} /> Generated Lyrics
                            </span>
                            {lyrics && (
                                <button onClick={copyToClipboard} className="text-neutral-500 hover:text-neutral-300 transition-colors">
                                    {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                                </button>
                            )}
                        </div>

                        {error && (
                            <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 p-4 rounded-xl">
                                {error}
                            </div>
                        )}

                        {lyrics ? (
                            <div className="text-lg font-bold text-center text-neutral-100 whitespace-pre-line leading-relaxed py-8">
                                {lyrics}
                            </div>
                        ) : (
                            !loading && !error && (
                                <div className="text-sm text-neutral-600 text-center py-16">
                                    좌측 설정을 마친 후<br />가사 생성 버튼을 눌러주세요.
                                </div>
                            )
                        )}

                        {loading && (
                            <div className="flex flex-col items-center justify-center py-16 space-y-3">
                                <div className="w-6 h-6 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: `${team.primaryColor} t-transparent` }} />
                                <p className="text-xs text-neutral-500">야구장 떼창 가사 추론 중...</p>
                            </div>
                        )}
                    </div>

                    {lyrics && (
                        <div className="pt-4 border-t border-neutral-900 flex justify-end">
                            <span className="text-[10px] text-neutral-500 font-medium">Next.js Studio Core v1.0</span>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}

export default function StudioPage() {
    return (
        <Suspense fallback={<div className="flex-1 bg-neutral-950" />}>
            <StudioContent />
        </Suspense>
    );
}