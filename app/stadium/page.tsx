'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Stadium() {
    const router = useRouter();
    const [cheerLevel, setCheerLevel] = useState(50); // 함성 소리 크기

    return (
        <div className="max-w-3xl mx-auto p-8 space-y-8">
            <h1 className="text-3xl font-bold text-red-600">🏟️ 스타디움: 현장감 극대화</h1>

            {/* 현장 상황 시뮬레이션 */}
            <div className="p-8 bg-gradient-to-b from-blue-50 to-white border-2 border-red-200 rounded-3xl shadow-lg">
                <div className="text-center">
                    <p className="text-lg font-bold mb-4">현재 야구장 분위기</p>
                    <div className="text-6xl mb-6">⚾️ 🎶 🏟️</div>
                    <p className="text-gray-600">관중 함성 소리: <span className="font-bold text-red-600">{cheerLevel}%</span></p>
                </div>
            </div>

            {/* 현장감 조절 패널 */}
            <div className="space-y-4">
                <label className="block font-bold">관중 함성 소리 크기 조절</label>
                <input
                    type="range"
                    min="0" max="100"
                    value={cheerLevel}
                    onChange={(e) => setCheerLevel(Number(e.target.value))}
                    className="w-full h-4 bg-red-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-500">
                    <span>고요함</span>
                    <span>만원 관중</span>
                </div>
            </div>

            {/* 완료 버튼 */}
            <button
                onClick={() => router.push('/release')}
                className="w-full p-6 bg-red-600 text-white rounded-2xl font-bold text-xl hover:bg-red-700 shadow-xl transition-all"
            >
                최종 응원가 완성하기 →
            </button>
        </div>
    );
}