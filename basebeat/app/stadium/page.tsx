'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface Stadium {
    name: string;
    location: string;
    capacity: string;
    soundSystem: string;
}

const STADIUM_DATA: Record<string, Stadium> = {
    'LG 트윈스': { name: '잠실 야구장', location: '서울 송파구', capacity: '23,750석', soundSystem: 'High-Power Line Array X3' },
    '삼성 라이온즈': { name: '대구 삼성 라이온즈 파크', location: '대구 수성구', capacity: '24,000석', soundSystem: 'Octa-Directional Surround' },
    'kt 위즈': { name: '수원 케이티 위즈 파크', location: '경기 수원시', capacity: '20,000석', soundSystem: 'Giga-Sound Wave System' },
    'SSG 랜더스': { name: '인천 SSG 랜더스필드', location: '인천 미추홀구', capacity: '23,000석', soundSystem: 'Big-Board Integrated Stereo' },
    '두산 베어스': { name: '잠실 야구장', location: '서울 송파구', capacity: '23,750석', soundSystem: 'High-Power Line Array X3' },
    'KIA 타이거즈': { name: '광주-기아 챔피언스 필드', location: '광주 북구', capacity: '20,500석', soundSystem: 'Champions Ultra Bass Pack' },
    '롯데 자이언츠': { name: '사직 야구장', location: '부산 동래구', capacity: '22,990석', soundSystem: 'Giant 사직 노래방 앰프 v2' },
    'NC 다이노스': { name: '창원 NC 파크', location: '경남 창원시', capacity: '17,891석', soundSystem: 'Dino-Acoustic Immersive 3D' },
    '한화 이글스': { name: '한화생명 이글스파크', location: '대전 중구', capacity: '12,000석', soundSystem: 'Eagle Eagles-Flame Speaker' },
    '키움 히어로즈': { name: '고척 스카이돔', location: '서울 구로구', capacity: '16,000석', soundSystem: 'Dome-Echo Subwoofer Matrix' }
};

function StadiumContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [activeTeam, setActiveTeam] = useState<string>('LG 트윈스');

    useEffect(() => {
        const teamParam = searchParams.get('team');
        if (teamParam) {
            const decodedTeam = decodeURIComponent(teamParam).toLowerCase().replace(/\s+/g, '');

            const matchedKey = Object.keys(STADIUM_DATA).find(key => {
                const normalizedKey = key.toLowerCase().replace(/\s+/g, '');
                return normalizedKey.includes(decodedTeam) || decodedTeam.includes(normalizedKey);
            });

            if (matchedKey) {
                setActiveTeam(matchedKey);
            }
        }
    }, [searchParams]);

    const currentStadium = STADIUM_DATA[activeTeam];

    const handleSelectStadium = () => {
        const player = searchParams.get('player') || '';
        const audio = searchParams.get('audio') || '';
        const lyrics = searchParams.get('lyrics') || '';

        const nextParams = new URLSearchParams({
            team: activeTeam,
            stadium: currentStadium.name,
            player: player,
            audio: audio,
            lyrics: lyrics,
            status: 'complete'
        });

        router.push(`/release?${nextParams.toString()}`);
    };

    return (
        <div className="p-12 bg-[#0b0e14] min-h-screen text-white font-sans">
            <div className="mb-14 border-b border-gray-900 pb-8">
                <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                    🏟️ KBO Stadium Sound Field
                </h1>
                <p className="text-sm text-gray-500 mt-2 font-medium tracking-wide">
                    지정 구장의 음향 시설 스펙을 파악하고 최적화된 음압 레벨을 모니터링하세요.
                </p>
            </div>

            <div className="grid grid-cols-12 gap-8">
                <div className="col-span-4 bg-[#12161f] border border-gray-800/60 rounded-xl p-5 space-y-2">
                    <h2 className="text-xs font-bold text-gray-500 tracking-wider uppercase mb-4 px-2">CLUB LIST</h2>
                    {Object.keys(STADIUM_DATA).map((team) => (
                        <button
                            key={team}
                            onClick={() => setActiveTeam(team)}
                            className={`w-full text-left text-xs font-bold px-4 py-3.5 rounded-xl transition border ${activeTeam === team
                                ? 'bg-green-500 text-black border-green-500 shadow-md'
                                : 'bg-[#1c212c]/40 text-gray-400 border-gray-800/60 hover:bg-[#1c212c] hover:text-white'
                                }`}
                        >
                            {team}
                        </button>
                    ))}
                </div>

                <div className="col-span-8 bg-[#12161f] border border-gray-800/60 rounded-xl p-8 flex flex-col justify-between h-[585px]">
                    <div>
                        <span className="text-[10px] font-mono bg-blue-900/30 text-blue-400 px-2.5 py-1 rounded-md font-bold uppercase tracking-wider">
                            {activeTeam} 홈 아레나
                        </span>
                        <h2 className="text-2xl font-black text-white mt-4 tracking-tight">{currentStadium.name}</h2>
                        <p className="text-xs text-gray-400 mt-1">소재지: {currentStadium.location}</p>

                        <div className="mt-12 grid grid-cols-2 gap-4 border-t border-gray-800/80 pt-8">
                            <div className="bg-[#1c212c]/60 border border-gray-800/50 rounded-xl p-5">
                                <span className="text-[10px] text-gray-500 font-bold block uppercase tracking-wider mb-1">STADIUM CAPACITY</span>
                                <span className="text-sm font-extrabold text-gray-200">{currentStadium.capacity}</span>
                            </div>
                            <div className="bg-[#1c212c]/60 border border-gray-800/50 rounded-xl p-5">
                                <span className="text-[10px] text-gray-500 font-bold block uppercase tracking-wider mb-1">AMP SOUND SYSTEM</span>
                                <span className="text-sm font-extrabold text-green-400 font-mono">{currentStadium.soundSystem}</span>
                            </div>
                        </div>

                        <div className="mt-6 bg-[#0b0e14] border border-gray-900 rounded-xl p-6 flex items-center justify-between">
                            <div>
                                <h4 className="text-xs font-bold text-gray-300">구장 맞춤형 사운드 튜닝 모듈</h4>
                                <p className="text-[11px] text-gray-500 mt-0.5">선택한 구장의 반향 상태에 맞춰 메인 이퀄라이저 값이 최적화됩니다.</p>
                            </div>
                            <span className="text-xs font-mono font-bold bg-green-500/10 text-green-400 px-3 py-1.5 rounded-lg border border-green-500/20">
                                ACTIVE
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={handleSelectStadium}
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-black font-black py-4 rounded-xl text-xs shadow-md transition duration-200 tracking-wider"
                    >
                        ⚡️ {currentStadium.name} 공간 음향 적용 후 최종 음원 발매하기
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function StadiumPage() {
    return (
        <Suspense fallback={<div className="p-12 text-center text-sm text-gray-500">구장 설정 로딩 중...</div>}>
            <StadiumContent />
        </Suspense>
    );
}