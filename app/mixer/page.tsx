'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Mixer() {
    const router = useRouter();
    const [volume, setVolume] = useState(80);
    const [effect, setEffect] = useState('none');

    return (
        <div className="max-w-3xl mx-auto p-8 space-y-8">
            <h1 className="text-3xl font-bold">🎚️ 믹서: 사운드 효과 추가</h1>

            {/* 가상의 오디오 플레이어 시뮬레이션 */}
            <div className="p-8 bg-gray-900 text-white rounded-2xl shadow-xl">
                <div className="text-center mb-6">현재 재생 중: 최형우 응원가_v1.mp3</div>
                <div className="h-20 bg-gray-700 rounded-lg flex items-center justify-center border border-gray-500">
                    [ 🔊 오디오 파형 시뮬레이션 영역 ]
                </div>
            </div>

            {/* 믹싱 컨트롤러 */}
            <div className="grid grid-cols-2 gap-6">
                <div className="p-4 border rounded-xl">
                    <label className="block font-bold mb-2">배경 음악 볼륨: {volume}%</label>
                    <input type="range" className="w-full" onChange={(e) => setVolume(Number(e.target.value))} />
                </div>
                <div className="p-4 border rounded-xl">
                    <label className="block font-bold mb-2">효과 선택</label>
                    <select className="w-full p-2 border rounded" onChange={(e) => setEffect(e.target.value)}>
                        <option value="none">효과 없음</option>
                        <option value="echo">에코 (경기장 울림)</option>
                        <option value="reverb">리버브 (웅장함)</option>
                    </select>
                </div>
            </div>

            {/* 다음 단계 */}
            <button
                onClick={() => router.push('/stadium')}
                className="w-full p-4 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 shadow-lg"
            >
                다음 단계: 스타디움에서 분위기 연출하기 →
            </button>
        </div>
    );
}