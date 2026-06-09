'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Team {
    name: string;
    englishName: string;
}

export default function StudioPage() {
    const router = useRouter();
    const [playerName, setPlayerName] = useState('');
    const [keywords, setKeywords] = useState('');
    const [lyrics, setLyrics] = useState('');
    const [activeTeam, setActiveTeam] = useState<Team>({ name: 'LG 트윈스', englishName: 'LG Twins' });

    const teams: Team[] = [
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

    const handleGenerateAIKeywords = () => {
        const tokens = keywords.trim()
            ? keywords.split(/\s+/).filter(t => t.length > 0)
            : ['승리', '열정', '투지', '함성']; // 키워드 없을 시 자동 생성

        const p1 = tokens[0];
        const p2 = tokens[1] || '최강';
        const p3 = tokens[2] || '패기';
        const p4 = tokens[3] || '자부심';

        const teamStyles: Record<string, { hook: string, desc: string }> = {
            'LG 트윈스': { hook: '무적 LG의 찬가', desc: '서울의 밤을 밝히는' },
            '삼성 라이온즈': { hook: '푸른 피의 전설', desc: '대구의 자존심을 걸고' },
            'kt 위즈': { hook: '마법의 승리', desc: '수원성 위에 울려 퍼지는' },
            'SSG 랜더스': { hook: '인천의 상륙작전', desc: '거대한 랜딩을 시작하며' },
            '두산 베어스': { hook: '미라클 두산', desc: '역전의 드라마를 쓰며' },
            'KIA 타이거즈': { hook: '호랑이의 포효', desc: '광주의 열기를 품고' },
            '롯데 자이언츠': { hook: '사직의 노래', desc: '부산의 거인들이 깨어날 때' },
            'NC 다이노스': { hook: '공룡 군단의 돌격', desc: '마산의 하늘을 뒤덮는' },
            '한화 이글스': { hook: '불꽃 한화', desc: '타오르는 불꽃처럼 번져가는' },
            '키움 히어로즈': { hook: '영웅들의 진군', desc: '고척돔을 가득 채운 함성' }
        };

        const style = teamStyles[activeTeam.name] || { hook: `${activeTeam.name}의 승리`, desc: '우리의 심장이 뛰는 곳' };
        const targetName = playerName.trim() || '우리 팀';

        const templates = [
            `[Intro]\n지금 시작되는 ${style.hook}!\n[Verse 1]\n${style.desc} ${targetName}이 달린다!\n${p1}을 가슴에 품고 거침없이 돌진해!\n[Chorus]\n터져라! ${p2}! 외쳐라! ${p3}!\n${activeTeam.name} 승리의 함성 가득 차오른다!\n[Outro]\n영원하리라! ${p4}!`,
            `[Intro]\n오오오! ${activeTeam.name}!\n[Verse 1]\n${targetName}! ${p1}을 향한 뜨거운 눈빛!\n${style.desc} 오직 승리만 바라본다!\n[Chorus]\n날려버려라! ${p2}의 한 방!\n우리들의 ${p3}가 온 그라운드를 흔든다!\n[Outro]\n${activeTeam.name}! 워우워!`
        ];

        setLyrics(templates[Math.floor(Math.random() * templates.length)]);
    };

    const handleNextStep = () => {
        if (!lyrics.trim()) return alert('가사를 먼저 생성해주세요.');
        const params = new URLSearchParams({
            team: activeTeam.name,
            player: playerName,
            keywords: keywords,
            lyrics: lyrics
        });
        router.push(`/mixer?${params.toString()}`);
    };

    return (
        <div className="p-12 bg-[#0b0e14] min-h-screen text-white font-sans selection:bg-green-500/30">
            <div className="mb-14 border-b border-gray-900 pb-8">
                <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                    🎙️ AI Composing Studio
                </h1>
                <p className="text-sm text-gray-500 mt-2 font-medium tracking-wide">
                    키워드를 입력하거나, 그냥 생성 버튼을 눌러 각 구단별 맞춤 가사를 확인하세요.
                </p>
            </div>

            <div className="grid grid-cols-12 gap-8">
                <div className="col-span-5 bg-[#12161f] border border-gray-800/60 rounded-xl p-6 space-y-6">
                    <div>
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-3">구단 선택</label>
                        <div className="grid grid-cols-2 gap-2">
                            {teams.map((team) => (
                                <button
                                    key={team.name}
                                    onClick={() => setActiveTeam(team)}
                                    className={`text-left text-xs font-bold px-4 py-3 rounded-lg transition border ${activeTeam.name === team.name
                                        ? 'bg-green-500 text-black border-green-500 shadow-md'
                                        : 'bg-[#1c212c]/40 text-gray-400 border-gray-800/60 hover:bg-[#1c212c] hover:text-white'
                                        }`}
                                >
                                    {team.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">선수 이름</label>
                        <input
                            type="text"
                            value={playerName}
                            onChange={(e) => setPlayerName(e.target.value)}
                            placeholder="선수명 (선택사항)"
                            className="w-full bg-[#0b0e14] border border-gray-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-green-400 transition"
                        />
                    </div>

                    <div>
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">키워드 (선택)</label>
                        <input
                            type="text"
                            value={keywords}
                            onChange={(e) => setKeywords(e.target.value)}
                            placeholder="넣고 싶은 단어들 (공백 구분)"
                            className="w-full bg-[#0b0e14] border border-gray-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-green-400 transition"
                        />
                    </div>

                    <button
                        onClick={handleGenerateAIKeywords}
                        className="w-full bg-[#1c212c] hover:bg-[#252c3a] border border-gray-800 text-white font-bold py-3.5 rounded-xl text-xs transition duration-200 tracking-wider"
                    >
                        ✨ 가사 자동 완성하기
                    </button>
                </div>

                <div className="col-span-7 bg-[#12161f] border border-gray-800/60 rounded-xl p-6 flex flex-col justify-between h-[635px]">
                    <textarea
                        value={lyrics}
                        onChange={(e) => setLyrics(e.target.value)}
                        placeholder="버튼을 누르면 여기에 가사가 나타납니다."
                        className="w-full flex-1 bg-[#0b0e14] border border-gray-800 rounded-xl p-5 text-sm text-gray-300 font-mono leading-relaxed resize-none focus:outline-none focus:border-green-400 transition"
                    />
                    <button
                        onClick={handleNextStep}
                        className="w-full mt-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-black font-black py-4 rounded-xl text-xs shadow-md transition duration-200 tracking-wider"
                    >
                        멜로디 작곡 스튜디오 이동하기 ⚡
                    </button>
                </div>
            </div>
        </div>
    );
}