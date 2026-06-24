'use client';
import { useRouter } from 'next/navigation';

export default function Release() {
    const router = useRouter();

    return (
        <div className="max-w-xl mx-auto p-12 text-center space-y-8">
            <div className="animate-bounce text-6xl">🏆</div>
            <h1 className="text-4xl font-bold">응원가 제작 완료!</h1>
            <p className="text-gray-600 text-lg">세상에 하나뿐인 나만의 응원가가 완성되었습니다.</p>

            {/* 최종 결과물 미리보기 */}
            <div className="p-6 bg-gray-900 text-white rounded-2xl shadow-2xl">
                <p className="mb-4">최형우_승리_응원가_final.mp3</p>
                <div className="w-full h-2 bg-gray-600 rounded-full overflow-hidden">
                    <div className="w-full h-full bg-green-500 animate-pulse"></div>
                </div>
            </div>

            {/* 액션 버튼 */}
            <div className="grid grid-cols-2 gap-4">
                <button className="p-4 border-2 border-green-600 text-green-600 rounded-xl font-bold hover:bg-green-50">
                    📥 MP3 다운로드
                </button>
                <button className="p-4 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700">
                    🔗 공유하기
                </button>
            </div>

            <button
                onClick={() => router.push('/')}
                className="text-gray-400 underline hover:text-gray-600"
            >
                처음으로 돌아가기
            </button>
        </div>
    );
}