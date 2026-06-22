'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Player {
    name: string;
    number: string;
    position: string;
}

const ROSTER_DATA: Record<string, Player[]> = {
    'LG 트윈스': [
        { name: '박해민', number: 'No.17', position: '외야수' },
        { name: '홍창기', number: 'No.51', position: '외야수' },
        { name: '오지환', number: 'No.2', position: '내야수' },
        { name: '문보경', number: 'No.35', position: '내야수' }
    ],
    '삼성 라이온즈': [
        { name: '이재현', number: 'No.7', position: '내야수' },
        { name: '구자욱', number: 'No.5', position: '외야수' },
        { name: '김지찬', number: 'No.58', position: '내야수' },
        { name: '최형우', number: 'No.34', position: '지명타자' },
        { name: '원태인', number: 'No.18', position: '투수' }
    ],
    'kt 위즈': [
        { name: '허경민', number: 'No.13', position: '내야수' },
        { name: '황재균', number: 'No.10', position: '내야수' },
        { name: '로하스', number: 'No.3', position: '외야수' }
    ],
    'SSG 랜더스': [
        { name: '최정', number: 'No.14', position: '내야수' },
        { name: '추신수', number: 'No.17', position: '지명타자' },
        { name: '한유섬', number: 'No.35', position: '외야수' }
    ],
    '두산 베어스': [
        { name: '양의지', number: 'No.25', position: '포수' },
        { name: '정수빈', number: 'No.31', position: '외야수' }
    ],
    'KIA 타이거즈': [
        { name: '김도영', number: 'No.5', position: '내야수' },
        { name: '나성범', number: 'No.47', position: '외야수' }
    ],
    '롯데 자이언츠': [
        { name: '윤동희', number: 'No.91', position: '외야수' },
        { name: '전준우', number: 'No.8', position: '지명타자' },
        { name: '황성빈', number: 'No.0', position: '외야수' }
    ],
    'NC 다이노스': [
        { name: '박건우', number: 'No.31', position: '외야수' },
        { name: '손아섭', number: 'No.31', position: '지명타자' },
        { name: '서호철', number: 'No.52', position: '내야수' }
    ],
    '한화 이글스': [
        { name: '노시환', number: 'No.8', position: '내야수' },
        { name: '강백호', number: 'No.10', position: '포수/지명' },
        { name: '류현진', number: 'No.99', position: '투수' },
        { name: '채은성', number: 'No.22', position: '내야수' }
    ],
    '키움 히어로즈': [
        { name: '송성문', number: 'No.3', position: '내야수' },
        { name: '김혜성', number: 'No.3', position: '내야수' },
        { name: '최주환', number: 'No.53', position: '내야수' }
    ]
};

export default function RosterPage() {
    const router = useRouter();
    const [selectedTeam, setSelectedTeam] = useState<string>('LG 트윈스');

    const currentRoster = ROSTER_DATA[selectedTeam] || [];

    const handleSelectPlayer = (playerName: string) => {
        router.push(`/studio?team=${encodeURIComponent(selectedTeam)}&player=${encodeURIComponent(playerName)}`);
    };

    return (
        <div className="p-12 bg-[#0b0e14] min-h-screen text-white font-sans">
            <div className="mb-14 border-b border-gray-900 pb-8">
                <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                    📋 KBO Club Roster
                </h1>
                <p className="text-sm text-gray-500 mt-2 font-medium tracking-wide">
                    응원가를 제작할 구단을 선택하고 대상 선수를 지정하세요.
                </p>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-4 mb-8 border-b border-gray-800/40 scrollbar-hide">
                {Object.keys(ROSTER_DATA).map((team) => (
                    <button
                        key={team}
                        onClick={() => setSelectedTeam(team)}
                        className={`text-xs font-bold px-4 py-2.5 rounded-lg whitespace-nowrap transition ${selectedTeam === team
                                ? 'bg-green-500 text-black shadow-md'
                                : 'bg-[#12161f] text-gray-400 hover:bg-[#1c212c] hover:text-white border border-gray-800/60'
                            }`}
                    >
                        {team}
                    </button>
                ))}
            </div>

            <div className="bg-[#12161f] border border-gray-800/60 rounded-xl p-6">
                <h2 className="text-xs font-bold text-gray-400 tracking-wider uppercase mb-6">
                    🏃 {selectedTeam} 선수 명단
                </h2>

                <div className="grid grid-cols-4 gap-4">
                    {currentRoster.map((player) => (
                        <div
                            key={player.name}
                            onClick={() => handleSelectPlayer(player.name)}
                            className="bg-[#1c212c] border border-gray-800/80 hover:border-green-500/40 rounded-xl p-5 cursor-pointer transition group"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-xs font-mono text-gray-500 group-hover:text-green-400 font-bold">
                                    {player.number}
                                </span>
                                <span className="text-[10px] bg-[#12161f] text-gray-400 px-2 py-0.5 rounded border border-gray-800">
                                    {player.position}
                                </span>
                            </div>
                            <h3 className="text-base font-bold text-white group-hover:text-green-400 transition">
                                {player.name}
                            </h3>
                            <p className="text-[11px] text-gray-500 mt-1">응원가 커스텀 제작하기 ➡️</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}