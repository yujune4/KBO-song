'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface CreditPackage {
    id: string;
    amount: number;
    bonus: number;
    priceValue: number;
    priceStr: string;
    tag: string;
    popular?: boolean;
}

const PACKAGES: CreditPackage[] = [
    { id: 'pkg-light', amount: 100, bonus: 0, priceValue: 9900, priceStr: '₩9,900', tag: '스타터 패키지' },
    { id: 'pkg-standard', amount: 300, bonus: 30, priceValue: 29700, priceStr: '₩29,700', tag: '가장 많이 선택', popular: true },
    { id: 'pkg-heavy', amount: 600, bonus: 90, priceValue: 59400, priceStr: '₩59,400', tag: '프로 믹싱 빌드' },
    { id: 'pkg-ultra', amount: 1200, bonus: 240, priceValue: 118800, priceStr: '₩118,800', tag: '대량 생성 전용' }
];

export default function CreditPage() {
    const router = useRouter();
    const [selectedPackage, setSelectedPackage] = useState<string>('pkg-standard');
    const [isProcessing, setIsProcessing] = useState<boolean>(false);

    const activePkg = PACKAGES.find(p => p.id === selectedPackage) || PACKAGES[1];

    const handlePayment = () => {
        if (isProcessing) return;
        setIsProcessing(true);

        const mockPaymentWindow = window.open(
            '',
            'BaseBeatPaymentGateway',
            'width=450,height=620,top=100,left=100,scrollbars=no,resizable=no'
        );

        if (mockPaymentWindow) {
            mockPaymentWindow.document.write(`
        <html>
          <head>
            <title>BaseBeat 가상 결제 데모 모듈</title>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <script src="https://cdn.tailwindcss.com"></script>
          </head>
          <body class="bg-[#0b0e14] text-white font-sans p-6 min-h-screen flex flex-col justify-between selection:bg-transparent">
            <div class="border-b border-gray-800/80 pb-4">
              <div class="flex items-center justify-between">
                <h1 class="text-sm font-black tracking-widest text-green-400">BASEBEAT GATEWAY</h1>
                <span class="text-[9px] font-mono bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 px-1.5 py-0.5 rounded">TEST MODE</span>
              </div>
              <p class="text-[11px] text-gray-500 mt-1">안전한 가상 승인 환경을 시뮬레이션합니다.</p>
            </div>

            <div class="my-5 bg-[#12161f] border border-gray-800/60 rounded-xl p-5 space-y-4">
              <div>
                <span class="text-[9px] font-mono text-gray-500 block uppercase">결제 상품명</span>
                <span class="text-sm font-bold text-gray-200 mt-0.5 block">AI MUSIC CREDIT - ${(activePkg.amount + activePkg.bonus).toLocaleString()}CR</span>
              </div>
              <div class="grid grid-cols-2 gap-4 border-t border-gray-800/60 pt-4">
                <div>
                  <span class="text-[9px] font-mono text-gray-500 block uppercase">과금 방식</span>
                  <span class="text-xs font-bold text-gray-300 mt-0.5 block">신용카드 / 가상테스트</span>
                </div>
                <div>
                  <span class="text-[9px] font-mono text-gray-500 block uppercase">결제 금액</span>
                  <span class="text-xs font-mono font-bold text-green-400 mt-0.5 block">${activePkg.priceStr}</span>
                </div>
              </div>
            </div>

            <div class="p-3.5 bg-red-950/20 border border-red-900/30 rounded-xl mb-4">
              <div class="flex items-center justify-between">
                <span class="text-[10px] font-bold text-red-400 tracking-wide">⚠️ 최고 관리자 전용 권한 우회 패널</span>
                <span class="text-[8px] font-mono bg-red-500 text-black px-1 rounded font-bold">BYPASS</span>
              </div>
              <button 
                onclick="window.opener.postMessage({ type: 'ADMIN_FREE_INJECT', pkgId: '${activePkg.id}' }, '*'); window.close();"
                class="w-full mt-2.5 bg-red-600 hover:bg-red-500 text-white font-black py-2 rounded-lg text-[11px] transition tracking-wide shadow-md shadow-red-900/20"
              >
                ⚡️ [관리자 특혜] 0원 무상 즉시 충전하기
              </button>
            </div>

            <div class="space-y-2">
              <button 
                onclick="window.opener.postMessage({ type: 'PAYMENT_SUCCESS', pkgId: '${activePkg.id}' }, '*'); window.close();"
                class="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-black font-black py-3 rounded-xl text-xs shadow-md transition duration-200 tracking-wider"
              >
                ✓ 가상 테스트 결제 승인하기
              </button>
              <button 
                onclick="window.opener.postMessage({ type: 'PAYMENT_CANCEL' }, '*'); window.close();"
                class="w-full bg-[#1c212c] hover:bg-[#252c3a] text-gray-400 font-bold py-3 rounded-xl text-xs border border-gray-800 transition tracking-wider"
              >
                결제 취소
              </button>
            </div>
          </body>
        </html>
      `);
            mockPaymentWindow.document.close();
        }

        const handleMessage = (event: MessageEvent) => {
            if (event.data.type === 'PAYMENT_SUCCESS') {
                window.removeEventListener('message', handleMessage);
                setIsProcessing(false);
                alert(`🎉 가상 테스트 결제가 성공적으로 승인되었습니다!\n\n충전 크레딧: ${(activePkg.amount + activePkg.bonus).toLocaleString()} CR\n주문 코드: TX_${Date.now().toString().slice(-6)}`);
                router.push('/');
            } else if (event.data.type === 'ADMIN_FREE_INJECT') {
                window.removeEventListener('message', handleMessage);
                setIsProcessing(false);
                alert(`👑 [ADMIN PRIVILEGE]\n관리자 특혜 우회 승인이 발동되었습니다.\n\n비용 차감 없이 ${(activePkg.amount + activePkg.bonus).toLocaleString()} CR이 시스템 계정에 강제 주입되었습니다.`);
                router.push('/');
            } else if (event.data.type === 'PAYMENT_CANCEL') {
                window.removeEventListener('message', handleMessage);
                setIsProcessing(false);
                alert('❌ 사용자가 결제를 취소했거나 승인이 거부되었습니다.');
            }
        };

        window.addEventListener('message', handleMessage);
    };

    return (
        <div className="p-12 bg-[#0b0e14] min-h-screen text-white font-sans flex flex-col justify-between">
            <div>
                <div className="mb-14 border-b border-gray-900 pb-8">
                    <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                        💳 CREDIT COMPUTE ENGINE
                    </h1>
                    <p className="text-sm text-gray-500 mt-2 font-medium tracking-wide">
                        결제 모듈 오버라이드가 반영된 인프라 샌드박스입니다. 충전할 크레딧 패키지를 구성하세요.
                    </p>
                </div>

                <div className="grid grid-cols-4 gap-6 mb-10">
                    {PACKAGES.map((pkg) => (
                        <div
                            key={pkg.id}
                            onClick={() => setSelectedPackage(pkg.id)}
                            className={`bg-[#12161f] border rounded-xl p-6 cursor-pointer transition-all duration-200 flex flex-col justify-between h-[260px] relative ${selectedPackage === pkg.id
                                    ? 'border-green-500 shadow-md shadow-green-500/5'
                                    : 'border-gray-800/60 hover:border-gray-700'
                                }`}
                        >
                            {pkg.popular && (
                                <span className="absolute -top-2.5 left-6 text-[9px] font-black bg-green-500 text-black px-2 py-0.5 rounded-md uppercase tracking-wider">
                                    POPULAR
                                </span>
                            )}

                            <div>
                                <span className="text-[10px] font-mono text-gray-500 font-bold block mb-1">
                                    {pkg.tag}
                                </span>
                                <h3 className="text-3xl font-black text-white mt-2 font-mono">
                                    {(pkg.amount + pkg.bonus).toLocaleString()} <span className="text-xs font-sans text-gray-400">CR</span>
                                </h3>
                                {pkg.bonus > 0 && (
                                    <p className="text-[11px] text-green-400 font-bold mt-1 font-mono">
                                        + 보너스 {pkg.bonus} CR 포함
                                    </p>
                                )}
                            </div>

                            <div className="border-t border-gray-800/80 pt-4 mt-6">
                                <p className="text-xs text-gray-500">정가 결제 금액</p>
                                <p className="text-xl font-black text-gray-200 mt-1 font-mono">{pkg.priceStr}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-[#12161f] border border-gray-800/60 rounded-xl p-8 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <div className="border-r border-gray-800/80 pr-8">
                        <span className="text-[10px] font-mono text-gray-500 font-bold block uppercase tracking-wider">선택한 인프라 팩</span>
                        <span className="text-lg font-black text-white mt-1 block">
                            {(activePkg.amount + activePkg.bonus).toLocaleString()} Credits
                        </span>
                    </div>
                    <div>
                        <span className="text-[10px] font-mono text-gray-500 font-bold block uppercase tracking-wider">최종 결제 금액</span>
                        <span className="text-2xl font-black text-green-400 mt-0.5 block font-mono">
                            {activePkg.priceStr}
                        </span>
                    </div>
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={() => router.back()}
                        className="px-6 py-4 bg-[#1c212c] hover:bg-[#252c3a] text-gray-300 font-bold text-xs rounded-xl border border-gray-800 transition"
                    >
                        취소하고 돌아가기
                    </button>
                    <button
                        onClick={handlePayment}
                        disabled={isProcessing}
                        className="px-10 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-black font-black text-xs rounded-xl shadow-md transition duration-200 min-w-[180px]"
                    >
                        {isProcessing ? '가상 인증 시뮬레이션 중...' : '⚡️ 실시간 보안 결제하기'}
                    </button>
                </div>
            </div>
        </div>
    );
}