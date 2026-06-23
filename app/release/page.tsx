'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { KBO_TEAMS } from '../constants/teams';
import { Disc, Download, Share2, CheckCircle2, Music4, Radio, AlertCircle } from 'lucide-react';

function ReleaseContent() {
    const searchParams = useSearchParams();
    const teamParam = searchParams.get('team') || 'LG 트윈스';
    const team = KBO_TEAMS[teamParam] || Object.values(KBO_TEAMS)[0];

    const [isExporting, setIsExporting] = useState(false);
    const [exportProgress, setExportProgress] = useState(0);
    const [isDone, setIsDone] = useState(false);

    const startExport = () => {
        setIsExporting(true);
        setIsDone(false);
        setExportProgress(0);

        const interval = setInterval(() => {
            setExportProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsExporting(false);
                    setIsDone(true);
                    return 100;
                }
                return prev + 10;
            });
        }, 300);
    };

    return (
        <div className={`flex-1 min-h-screen bg-gradient-to-b ${team.bgGradient} p-8 flex flex-col items-center justify-center`}>
            <div className="max-w-4xl w-full bg-neutral-900/90 border border-neutral-800 rounded-3xl p-8 backdrop-blur shadow-2xl flex flex-col space-y-8">

                <div className="flex items-center gap-3 pb-6 border-b border-neutral-800">
                    <div className="p-3 rounded-xl bg-neutral-800 text-amber-500 border border-neutral-700">
                        <Disc size={20} className={isExporting ? 'animate-spin' : ''} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black tracking-tight text-white">최종 음원 믹스다운 & 마스터링</h2>
                        <p className="text-xs text-neutral-400">{team.name} 커스텀 응원가 정식 배포 모듈</p>
                    </div>
                </div>

                <div className="bg-neutral-950 border border-neutral-850 rounded-2xl p-8 flex flex-col items-center justify-center text-center space-y-6">
                    <div className="w-24 h-24 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center relative">
                        <Radio size={36} className={isExporting ? 'text-amber-400 animate-pulse' : 'text-neutral-500'} />
                        {isDone && (
                            <span className="absolute -top-1 -right-1 bg-emerald-500 text-white rounded-full p-1 border-4 border-neutral-950">
                                <CheckCircle2 size={16} />
                            </span>
                        )}
                    </div>

                    <div className="max-w-md">
                        <h3 className="text-lg font-bold text-neutral-200">
                            {isDone ? '정식 마스터링 음원 추출 완료!' : isExporting ? '사운드 트랙 컴파일 중...' : '마스터 트랙 드롭 준비 완료'}
                        </h3>
                        <p className="text-xs text-neutral-500 mt-1.5 leading-relaxed">
                            {isDone
                                ? '관중석을 뒤흔들 고음질 WAV 포맷 인코딩이 완료되었습니다. 아래 다운로드 버튼을 눌러 소장하세요.'
                                : isExporting
                                    ? '보컬 트랙, 응원 MR, 3D 경기장 잔향 필터를 하나로 결합하고 있습니다.'
                                    : '스튜디오 세팅이 마음에 드신다면 최종 믹싱 본을 빌드하여 단 하나의 파일로 내보내세요.'}
                        </p>
                    </div>

                    {isExporting && (
                        <div className="w-full max-w-sm space-y-2">
                            <div className="h-1.5 w-full bg-neutral-900 rounded-full overflow-hidden border border-neutral-850">
                                <div
                                    className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-300"
                                    style={{ width: `${exportProgress}%` }}
                                />
                            </div>
                            <p className="text-[10px] font-mono text-neutral-500 tracking-widest">{exportProgress}% EXPORTING...</p>
                        </div>
                    )}

                    {!isExporting && !isDone && (
                        <button
                            onClick={startExport}
                            style={{ backgroundColor: team.primaryColor }}
                            className="px-8 py-3.5 rounded-xl font-bold text-white text-sm hover:opacity-90 transition-opacity shadow-lg"
                        >
                            정식 마스터 음원 추출 개시
                        </button>
                    )}

                    {isDone && (
                        <div className="flex items-center gap-3 w-full max-w-sm">
                            <button className="flex-1 bg-neutral-900 border border-neutral-800 hover:bg-neutral-850 text-neutral-200 py-3.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors">
                                <Share2 size={14} /> 링크 공유
                            </button>
                            <button
                                style={{ backgroundColor: team.primaryColor }}
                                className="flex-[2] py-3.5 rounded-xl font-bold text-white text-xs flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity shadow-lg"
                            >
                                <Download size={14} /> WAV 고음질 다운로드
                            </button>
                        </div>
                    )}
                </div>

                <div className="bg-amber-500/5 border border-amber-500/10 rounded-xl p-4 flex items-start gap-3">
                    <AlertCircle size={16} className="text-amber-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-neutral-400 leading-relaxed">
                        <strong className="text-neutral-300 font-semibold block mb-0.5">라이선스 알림</strong>
                        본 스튜디오에서 컴파일된 결과물은 인공지능 합성 기술 기반이며, 구단 공식 마케팅용으로 활용할 시 가사 및 원작자 협의 유무를 거치기를 권장합니다. 개인 소장 및 관중석 떼창 학습용 사용은 무제한 자유입니다.
                    </p>
                </div>

            </div>
        </div>
    );
}

export default function ReleasePage() {
    return (
        <Suspense fallback={<div className="flex-1 bg-neutral-950" />}>
            <ReleaseContent />
        </Suspense>
    );
}