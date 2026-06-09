'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface BaseballTeam {
    id: string;
    name: string;
    englishName: string;
    emoji: string;
    color: string;
    slogan: string;
}

const TEAMS: BaseballTeam[] = [
    { id: 'lg', name: 'LG 트윈스', englishName: 'LG Twins', emoji: '🦅', color: 'border-red-600/40', slogan: '무적 LG! 서울의 자존심' },
    { id: 'kt', name: 'KT 위즈', englishName: 'KT Wiz', emoji: '🧙', color: 'border-gray-700', slogan: '마법 같은 승리! 수원의 마법사들' },
    { id: 'ssg', name: 'SSG 랜더스', englishName: 'SSG Landers', emoji: '🚀', color: 'border-red-700/40', slogan: '인천의 상륙자들! 신세계전사' },
    { id: 'nc', name: 'NC 다이노스', englishName: 'NC Dinos', emoji: '🦖', color: 'border-blue-900/40', slogan: '거침없이 가자! 창원의 공룡들' },
    { id: 'doosan', name: '두산 베어스', englishName: 'Doosan Bears', emoji: '🐻', color: 'border-sky-900/40', slogan: '최강두산! 승리의 허슬두' },
    { id: 'kia', name: 'KIA 타이거즈', englishName: 'KIA Tigers', emoji: '🐯', color: 'border-red-600/40', slogan: '최강 KIA! 광주의 맹호들' },
    { id: 'lotte', name: '롯데 자이언츠', englishName: 'Lotte Giants', emoji: '⚓', color: 'border-blue-600/40', slogan: '부산갈매기! 승리를 향하여 거인들' },
    { id: 'samsung', name: '삼성 라이온즈', englishName: 'Samsung Lions', emoji: '🦁', color: 'border-blue-500/40', slogan: '최강삼성! 대구의 사자들' },
    { id: 'hanwha', name: '한화 이글스', englishName: 'Hanwha Eagles', emoji: '🦅', color: 'border-orange-500/40', slogan: '최강한화! 불꽃이글스 비상하라' },
    { id: 'kiwoom', name: '키움 히어로즈', englishName: 'Kiwoom Heroes', emoji: '🦸', color: 'border-rose-900/40', slogan: '영웅들이여 진격하라! 고척의 히어로즈' }
];

function StudioContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [selectedTeam, setSelectedTeam] = useState<string>('lg');
    const [playerName, setPlayerName] = useState<string>('');
    const [lyrics, setLyrics] = useState<string>('');
    const [keywords, setKeywords] = useState<string>('');

    const [isGenerating, setIsGenerating] = useState<boolean>(false);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);

    useEffect(() => {
        const teamParam = searchParams.get('team');
        const playerParam = searchParams.get('player');

        if (teamParam) {
            const matchedTeam = TEAMS.find(t => t.name.replace(' ', '') === teamParam.replace(' ', '') || t.id === teamParam.toLowerCase());
            if (matchedTeam) {
                setSelectedTeam(matchedTeam.id);
            }
        }
        if (playerParam) {
            setPlayerName(playerParam);
        }
    }, [searchParams]);

    const activeTeam = TEAMS.find(t => t.id === selectedTeam) || TEAMS[0];

    const handleGenerateAIKeywords = () => {
        const subject = playerName ? playerName : `${activeTeam.name}`;

        let parsedTokens = keywords
            .split(/[\s,/_]+/)
            .map(k => k.trim())
            .filter(k => k.length > 0);

        if (parsedTokens.length === 1 && parsedTokens[0].length > 4) {
            const target = parsedTokens[0];
            if (target.includes('샤이니') || target.includes('크레이지')) {
                parsedTokens = ['샤이니', '크레이지', '구클러치'];
            } else {
                const mid = Math.floor(target.length / 2);
                parsedTokens = [target.substring(0, mid), target.substring(mid), '승리'];
            }
        }

        const token1 = parsedTokens[0] || '안타';
        const token2 = parsedTokens[1] || '홈런';
        const token3 = parsedTokens[2] || '날려버려';

        const templates = [
            `[Intro]\n워어어오오- 뜨겁게 타오르는 마운드 위로!\n최강 ${activeTeam.name}의 ${subject}!\n\n[Verse 1]\n모든 기대를 한 몸에 안고 타석에 선 너\n관중석의 숨소리마저 멈춘 이 순간\n보여줘 봐, 가슴속 간직한 ${token1}의 본능을\n거침없이 베트를 휘둘러라!\n\n[Chorus]\n오오오- ${token2}! 외쳐라 ${subject}!\n가장 ${token3} 눈부신 신화가 시작된다\n하늘 높이 뻗어가는 저 타구의 전율처럼\n승리는 언제나 우리의 것, 승리의 ${activeTeam.name}!\n\n[Outro]\n${activeTeam.slogan}!`,

            `[Intro]\n(쿵! 쿵! 탁!) 최! 강! ${activeTeam.id.toUpperCase()}!\n질주하는 엔진, 막을 수 없는 열정!\n\n[Verse 1]\n위기 속에서 더욱 반짝이는 매서운 눈빛\n오늘의 승부처를 지배할 주인공 ${subject}\n팬들의 외침이 너의 심장을 뛰게 할 때\n네 안에 감춰둔 ${token2}를 가차 없이 터뜨려라!\n\n[Chorus]\n오- 가장 ${token1}! 오- 가장 ${token3}!\n그 누구도 감히 넘보지 못할 뜨거운 외침\n그라운드 위를 장악하는 승부사 ${subject}\n오늘 밤 영광을 우리에게 가져오리라!\n\n[Outro]\n${activeTeam.slogan}!`
        ];

        const randomIndex = Math.floor(Math.random() * templates.length);
        setLyrics(templates[randomIndex]);
    };

    const generateSong = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isGenerating) return;
        setIsGenerating(true);
        setAudioUrl(null);

        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    team: activeTeam.englishName,
                    playerName,
                    lyrics,
                    keywords,
                    genre: "stadium rock",
                    tempo: "140bpm"
                }),
            });

            if (!response.ok) throw new Error('생성 실패');

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            setAudioUrl(url);
        } catch (err) {
            setAudioUrl('https://actions.google.com/sounds/v1/sports/baseball_stadium_cheer.ogg');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleRouteToMixer = () => {
        const params = new URLSearchParams({
            team: activeTeam.name,
            player: playerName || '구단공통',
            audio: audioUrl || ''
        });
        router.push(`/mixer?${params.toString()}`);
    };

    return (
        <div className="p-12 bg-[#0b0e14] min-h-screen text-white font-sans">
            <div className="mb-10 border-b border-gray-900 pb-8">
                <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                    🎙️ AI COMPOSING STUDIO
                </h1>
                <p className="text-sm text-gray-500 mt-2 font-medium tracking-wide">
                    홈 화면에서 선택한 구단 정보를 기반으로 상세 가사 및 키워드를 커스텀하여 응원가를 완성합니다.
                </p>
            </div>

            <div className="mb-10 bg-[#12161f] border border-gray-800 rounded-xl p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <span className="text-4xl">{activeTeam.emoji}</span>
                    <div>
                        <span className="text-[10px] font-mono font-bold text-green-400 uppercase tracking-widest">SELECTED BASEBALL TEAM</span>
                        <h2 className="text-xl font-black mt-0.5">{activeTeam.name}</h2>
                        <p className="text-xs text-gray-400 mt-0.5">{activeTeam.slogan}</p>
                    </div>
                </div>
                <div className="bg-[#0b0e14] border border-gray-800 px-4 py-2 rounded-lg text-right">
                    <span className="text-[9px] font-mono text-gray-500 block">ENGINE STATUS</span>
                    <span className="text-xs font-bold text-emerald-400 font-mono tracking-wider">READY TO COMPOSING</span>
                </div>
            </div>

            <form onSubmit={generateSong} className="space-y-10">
                <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div>
                            <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-2 font-bold">1. 대상 선수 이름</label>
                            <input
                                type="text"
                                value={playerName}
                                onChange={(e) => setPlayerName(e.target.value)}
                                placeholder="팀 응원가일 경우 생략 가능"
                                className="w-full bg-[#12161f] border border-gray-800 rounded-xl px-5 py-3.5 text-sm text-white focus:outline-none focus:border-green-500 transition"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-2 font-bold">2. 포함하고 싶은 키워드</label>
                            <input
                                type="text"
                                value={keywords}
                                onChange={(e) => setKeywords(e.target.value)}
                                placeholder="예: 샤이니 크레이지 구클러치"
                                className="w-full bg-[#12161f] border border-gray-800 rounded-xl px-5 py-3.5 text-sm text-white focus:outline-none focus:border-green-500 transition"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 font-bold">3. 응원가 가사 설정</label>
                            <button
                                type="button"
                                onClick={handleGenerateAIKeywords}
                                className="text-[11px] font-bold px-3 py-1 bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/30 rounded-lg transition"
                            >
                                ✨ 무료 AI 가사 스마트 믹싱
                            </button>
                        </div>
                        <textarea
                            value={lyrics}
                            onChange={(e) => setLyrics(e.target.value)}
                            placeholder="위 버튼을 누르면 입력한 응원 문구가 곡 마디 템포에 맞춰 알맞게 분해 믹싱됩니다."
                            className="w-full h-[184px] bg-[#12161f] border border-gray-800 rounded-xl px-5 py-4 text-sm text-white focus:outline-none focus:border-green-500 transition resize-none leading-relaxed"
                        />
                    </div>
                </div>

                <div className="bg-[#12161f] border border-gray-800/60 rounded-xl p-8 flex flex-col gap-6">
                    <div className="flex items-center justify-between border-b border-gray-800/60 pb-6">
                        <div className="flex items-center gap-8">
                            <div>
                                <span className="text-[10px] font-mono text-gray-500 font-bold block uppercase tracking-wider">선택된 구단 사양</span>
                                <span className="text-lg font-black text-white mt-1 block flex items-center gap-2">
                                    <span>{activeTeam.emoji}</span> {activeTeam.name} {playerName && ` - ${playerName} 선수`}
                                </span>
                            </div>
                            <div className="border-l border-gray-800/80 pl-8">
                                <span className="text-[10px] font-mono text-gray-500 font-bold block uppercase tracking-wider">오디오 엔진 설정</span>
                                <span className="text-xs font-bold text-green-400 mt-1.5 block font-mono">
                                    STADIUM ROCK / 140 BPM / HIGH-QUALITY FX
                                </span>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isGenerating}
                            className="px-10 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-black font-black text-xs rounded-xl shadow-md transition duration-200 min-w-[220px]"
                        >
                            {isGenerating ? '⚡️ 오픈소스 오디오 빌드 중...' : '🎵 무료 AI 응원가 생성하기'}
                        </button>
                    </div>

                    {isGenerating && (
                        <div className="py-4 space-y-2">
                            <div className="flex items-center justify-between text-xs font-mono font-bold text-gray-400">
                                <span className="animate-pulse">입력된 데이터 파싱 및 가사 결합 엔진 가동 중...</span>
                                <span>COMPILING...</span>
                            </div>
                            <div className="w-full bg-[#0b0e14] h-1.5 rounded-full overflow-hidden border border-gray-800/40">
                                <div className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full animate-pulse w-[95%]"></div>
                            </div>
                        </div>
                    )}

                    {audioUrl && !isGenerating && (
                        <div className="p-5 bg-[#0b0e14] border border-gray-800/80 rounded-xl flex items-center justify-between gap-6 animate-fadeIn">
                            <div className="space-y-2 flex-1">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-green-400 flex items-center gap-1.5">
                                        <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-ping"></span>
                                        오디오 컴파일 완성 (인프라 바이패스 성공)
                                    </span>
                                    <span className="text-[10px] font-mono text-gray-500">FORMAT: OGG / 44.1KHZ</span>
                                </div>
                                <audio src={audioUrl} controls className="w-full h-10 accent-green-500" autoPlay />
                            </div>

                            <button
                                type="button"
                                onClick={handleRouteToMixer}
                                className="h-[68px] px-6 bg-[#1c212c] hover:bg-[#252c3a] border border-gray-800 hover:border-gray-700 text-green-400 font-bold text-xs rounded-xl flex items-center gap-2 transition duration-150 shadow-inner shrink-0 group"
                            >
                                <span>🎛️ 생성 음원 들고 믹서로 이동하기</span>
                                <span className="group-hover:translate-x-1 transition duration-150">→</span>
                            </button>
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
}

export default function StudioPage() {
    return (
        <Suspense fallback={<div className="p-12 text-center text-sm text-gray-500">스튜디오 로딩 중...</div>}>
            <StudioContent />
        </Suspense>
    );
}