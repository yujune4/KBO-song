'use client';
import { useState } from 'react';

export default function Charge() {
    const [selected, setSelected] = useState(null);
    const plans = [{ amount: '100 크레딧', price: '5,500원' }, { amount: '500 크레딧', price: '22,000원' }];

    return (
        <div className="max-w-2xl mx-auto p-12 text-center">
            <h1 className="text-3xl font-bold mb-8">💎 크레딧 충전</h1>
            <div className="grid gap-4 mb-8">
                {plans.map((plan, idx) => (
                    <div key={idx} onClick={() => setSelected(idx)} className={`p-6 border-2 rounded-2xl cursor-pointer ${selected === idx ? 'border-red-600 bg-red-50' : 'border-gray-200'}`}>
                        <h2 className="text-xl font-bold">{plan.amount}</h2>
                        <p className="text-gray-500">{plan.price}</p>
                    </div>
                ))}
            </div>
            <button className="w-full p-4 bg-gray-900 text-white rounded-xl font-bold">결제하기</button>
        </div>
    );
}