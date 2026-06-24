import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey) {
        return NextResponse.json(
            { error: { message: '.env.local 파일에 NEXT_PUBLIC_GEMINI_API_KEY가 존재하지 않습니다.' } },
            { status: 500 }
        );
    }

    try {
        const { prompt } = await request.json();

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }]
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                { error: { message: data?.error?.message || `Google API 오류 (상태 코드: ${response.status})` } },
                { status: response.status }
            );
        }

        return NextResponse.json(data, { status: 200 });

    } catch (error: any) {
        console.error('Route Handler Crash:', error);
        return NextResponse.json(
            { error: { message: `서버 라우트 내부 예외 발생: ${error.message}` } },
            { status: 500 }
        );
    }
}