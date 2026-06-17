'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface Team {
    name: string;
    englishName: string;
}

const TEAMS_DATA: Team[] = [
    { name: 'LG 트윈스', englishName: 'LG Twins' },
    { name: '삼성 라이온즈', englishName: 'Samsung Lions' },
    { name: 'kt 위즈', englishName: 'kt wiz' },
    { name: 'SSG 랜더스', englishName: 'SSG Landers' },
    { name: '두산 베어스', englishName: 'Doosan Bears' },
    { name: 'KIA 타이거즈', englishName: 'KIA Tigers' },
    { name: '롯데 자이언츠', englishName: 'Lotte Giants' },
    { name: 'NC 다이노스', englishName: 'NC Dinos' },
    { name: '한화 이글스', englishName: 'Hanwha Eagles' },
    { name: '키움 히어로즈', englishName: 'Kiwoom Heroes' }
];

function StudioContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [playerName, setPlayerName] = useState('');
    const [keywords, setKeywords] = useState('');
    const [lyrics, setLyrics] = useState('');
    const [activeTeam, setActiveTeam] = useState<Team>({ name: 'LG 트윈스', englishName: 'LG Twins' });

    const [isGenerating, setIsGenerating] = useState(false);
    const [generationStatus, setGenerationStatus] = useState('');
    const [isLyricsGenerating, setIsLyricsGenerating] = useState(false);
    const [lyricsStatus, setLyricsStatus] = useState('');

    const [generatedAudioUrl, setGeneratedAudioUrl] = useState('');
    const [showRestoreModal, setShowRestoreModal] = useState(false);

    useEffect(() => {
        const teamParam = searchParams.get('team');
        if (teamParam) {
            const decodedTeam = decodeURIComponent(teamParam).toLowerCase().replace(/\s+/g, '');
            const matched = TEAMS_DATA.find(t => {
                const normalized = t.name.toLowerCase().replace(/\s+/g, '');
                return normalized.includes(decodedTeam) || decodedTeam.includes(normalized);
            });
            if (matched) setActiveTeam(matched);
        }

        const savedDraft = localStorage.getItem('basebeat_lyrics_draft');
        if (savedDraft) {
            setShowRestoreModal(true);
        }
    }, [searchParams]);

    useEffect(() => {
        if (!lyrics.trim()) return;
        const timer = setTimeout(() => {
            localStorage.setItem('basebeat_lyrics_draft', JSON.stringify({
                playerName,
                keywords,
                lyrics,
                teamName: activeTeam.name,
                time: Date.now()
            }));
        }, 1000);
        return () => clearTimeout(timer);
    }, [lyrics, playerName, keywords, activeTeam]);

    const handleRestoreDraft = () => {
        const savedDraft = localStorage.getItem('basebeat_lyrics_draft');
        if (savedDraft) {
            const parsed = JSON.parse(savedDraft);
            setPlayerName(parsed.playerName || '');
            setKeywords(parsed.keywords || '');
            setLyrics(parsed.lyrics || '');
            const matched = TEAMS_DATA.find(t => t.name === parsed.teamName);
            if (matched) setActiveTeam(matched);
        }
        setShowRestoreModal(false);
    };

    const handleManualSave = () => {
        localStorage.setItem('basebeat_lyrics_draft', JSON.stringify({
            playerName,
            keywords,
            lyrics,
            teamName: activeTeam.name,
            time: Date.now()
        }));
        alert('현재 작업 내용이 임시 저장되었습니다.');
    };

    const handleDiscardDraft = () => {
        localStorage.removeItem('basebeat_lyrics_draft');
        setShowRestoreModal(false);
    };

    const handleGenerateAIKeywords = async () => {
        setIsLyricsGenerating(true);
        setLyricsStatus('AI가 야구장 감성 가사를 작사하는 중...');

        try {
            const res = await fetch('/api/lyrics', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    teamName: activeTeam.name,
                    playerName: playerName,
                    keywords: keywords
                })
            });

            const data = await res.json();

            if (data.lyrics) {
                setLyrics(data.lyrics);
            } else {
                alert('AI 가사 생성 실패');
            }
        } catch (err) {
            console.error(err);
            alert('AI 통신 에러 발생');
        } finally {
            setIsLyricsGenerating(false);
            setLyricsStatus('');
        }
    };

    const handleCreateMurekaVocal = async () => {
        if (!lyrics.trim()) return alert('가사를 먼저 생성하거나 입력해 주세요.');

        setIsGenerating(true);
        setGenerationStatus('가창 트랙 렌더링 요청 중...');

        try {
            const res = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    lyrics: lyrics,
                    style: `${activeTeam.englishName} Baseball Cheer Song, Powerful Rock`,
                    title: `${activeTeam.name} ${playerName || '공통'} 응원가`
                })
            });
            const data = await res.json();

            if (data.status === 'SUCCESS' && data.audioUrl) {
                setGeneratedAudioUrl(data.audioUrl);
                setIsGenerating(false);
                setGenerationStatus('');
                try {
                    sessionStorage.setItem('basebeat_current_audio', data.audioUrl);
                    sessionStorage.setItem('basebeat_current_lyrics', lyrics);
                    localStorage.removeItem('basebeat_lyrics_draft');
                } catch (e) {
                    console.error(e);
                }
                alert('Mureka AI 오디오 가창 트랙 빌딩이 성공적으로 완료되었습니다!');
            } else {
                setIsGenerating(false);
                setGenerationStatus('');
                alert('가창 트랙 생성 실패');
            }
        } catch (err) {
            console.error(err);
            setIsGenerating(false);
            setGenerationStatus('');
            alert('통신 에러 발생');
        }
    };

    const handleNextStep = () => {
        if (!lyrics.trim() || !generatedAudioUrl) {
            return alert('Mureka 가창 생성이 완료된 후 다음 단계로 진행할 수 있습니다.');
        }

        const params = new URLSearchParams({
            team: activeTeam.name,
            player: playerName,
            keywords: keywords,
            lyrics: lyrics,
            audio: generatedAudioUrl
        });

        router.push(`/mixer?${params.toString()}`);
    };

    return (
        <div className="p-12 bg-[#0b0e14] min-h-screen text-white font-sans selection:bg-green-500/30 relative">
            {showRestoreModal && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-[#12161f] border border-gray-800 rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-2xl">
                        <h3 className="text-base font-black text-white">📝 작성 중이던 기록 발견</h3>
                        <p className="text-xs text-gray-400 leading-relaxed">이전에 임시 저장되었거나 편집 중이던 응원가 가사 작업실 기록이 있습니다. 다시 불러오시겠습니까?</p>
                        <div className="grid grid-cols-2 gap-2 pt-2">
                            <button onClick={handleDiscardDraft} className="bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold py-2.5 rounded-xl text-xs transition">새로 작성</button>
                            <button onClick={handleRestoreDraft} className="bg-green-500 hover:bg-green-400 text-black font-black py-2.5 rounded-xl text-xs transition">이어 쓰기</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="mb-14 border-b border-gray-900 pb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                        🎙️ AI Composing Studio
                    </h1>
                    <p className="text-sm text-gray-500 mt-2 font-medium tracking-wide">
                        선택된 <span className="text-green-400 font-bold">{activeTeam.name}</span>의 테마를 기반으로 맞춤형 응원가를 커스텀 빌딩합니다.
                    </p>
                </div>
                <button
                    onClick={handleManualSave}
                    className="bg-[#1c212c] hover:bg-[#252c3a] border border-gray-800 text-gray-300 font-bold px-4 py-2 rounded-xl text-xs transition shadow-sm tracking-wide"
                >
                    💾 작업 임시 저장
                </button>
            </div>

            <div className="grid grid-cols-12 gap-8">
                <div className="col-span-5 bg-[#12161f] border border-gray-800/60 rounded-xl p-6 flex flex-col justify-between h-[450px]">
                    <div className="space-y-4">
                        <div>
                            <span className="text-[10px] font-mono bg-green-500/10 text-green-400 px-2.5 py-1 rounded-md font-bold uppercase border border-green-500/20 tracking-wider inline-block">
                                선택 구단 연동 완료
                            </span>
                            <div className="text-xl font-black text-white mt-1 tracking-tight">{activeTeam.name}</div>
                        </div>

                        <div>
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">선수 이름</label>
                            <input
                                type="text"
                                value={playerName}
                                onChange={(e) => setPlayerName(e.target.value)}
                                placeholder="선수명 (선택사항)"
                                className="w-full bg-[#0b0e14] border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-green-400 transition"
                            />
                        </div>

                        <div>
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">키워드 (선택)</label>
                            <input
                                type="text"
                                value={keywords}
                                onChange={(e) => setKeywords(e.target.value)}
                                placeholder="넣고 싶은 단어들 (공백 구분)"
                                className="w-full bg-[#0b0e14] border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-green-400 transition"
                            />
                        </div>

                        {lyricsStatus && (
                            <div className="text-xs text-green-400 bg-green-500/10 border border-green-500/20 rounded-xl p-3 text-center font-mono animate-pulse">
                                {lyricsStatus}
                            </div>
                        )}

                        {generationStatus && (
                            <div className="text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 text-center font-mono animate-pulse">
                                {generationStatus}
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-4">
                        <button
                            onClick={handleGenerateAIKeywords}
                            disabled={isLyricsGenerating}
                            className={`font-bold py-3.5 rounded-xl text-xs transition duration-200 tracking-wider border ${isLyricsGenerating
                                    ? 'bg-green-500/10 border-green-500/30 text-green-400'
                                    : 'bg-[#1c212c] hover:bg-[#252c3a] border-gray-800 text-white'
                                }`}
                        >
                            {isLyricsGenerating ? '✨ 작사 중...' : '✨ 가사 자동 완성'}
                        </button>
                        <button
                            onClick={handleCreateMurekaVocal}
                            disabled={isGenerating}
                            className={`font-bold py-3.5 rounded-xl text-xs transition duration-200 tracking-wider border ${isGenerating
                                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                                    : 'bg-blue-600/20 border-blue-500/30 text-blue-400 hover:bg-blue-600 hover:text-white'
                                }`}
                        >
                            {isGenerating ? '🎤 가창 생성 중...' : '🔥 Mureka 가창 입히기'}
                        </button>
                    </div>
                </div>

                <div className="col-span-7 bg-[#12161f] border border-gray-800/60 rounded-xl p-6 flex flex-col justify-between h-[450px]">
                    <textarea
                        value={lyrics}
                        onChange={(e) => setLyrics(e.target.value)}
                        placeholder="버튼을 누르면 여기에 가사가 나타납니다. 직접 타이핑하셔도 자동으로 임시 보관됩니다."
                        className="w-full flex-1 bg-[#0b0e14] border border-gray-800 rounded-xl p-5 text-sm text-gray-300 font-mono leading-relaxed resize-none focus:outline-none focus:border-green-400 transition"
                    />
                    <button
                        onClick={handleNextStep}
                        disabled={!generatedAudioUrl}
                        className={`w-full mt-4 font-black py-4 rounded-xl text-xs shadow-md transition duration-200 tracking-wider ${generatedAudioUrl
                                ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-black'
                                : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                            }`}
                    >
                        오디오 결합 볼륨 믹서 이동 ⚡
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function StudioPage() {
    return (
        <Suspense fallback={<div className="p-12 text-center text-sm text-gray-500">스튜디오 모듈 로딩 중...</div>}>
            <StudioContent />
        </Suspense>
    );
}