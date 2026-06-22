import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { lyrics, style, title } = await req.json();
        const apiKey = process.env.MUREKA_API_KEY;

        if (!apiKey) {
            return NextResponse.json({ error: 'Mureka API 키 미확인' }, { status: 500 });
        }

        const response = await fetch('https://api.mureka.ai/v1/song/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                lyrics: lyrics,
                prompt: style || 'Baseball Cheer Song, High Energy, Power Rock, Vocal',
                title: title || 'Baseball Cheer Song',
                model_version: 'v3.5',
                generation_type: 'vocal',
                mode: 'vocal',
                make_instrumental: false
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            return NextResponse.json({ error: errorText }, { status: response.status });
        }

        const taskData = await response.json();
        const taskId = taskData.id || taskData.task_id;

        if (!taskId) {
            return NextResponse.json({ error: '생성 태스크 ID 발급 실패' }, { status: 500 });
        }

        let attempts = 0;
        const maxAttempts = 35;

        while (attempts < maxAttempts) {
            await new Promise((resolve) => setTimeout(resolve, 3000));

            const queryResponse = await fetch(`https://api.mureka.ai/v1/song/query/${taskId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${apiKey}`
                }
            });

            if (queryResponse.ok) {
                const statusData = await queryResponse.json();

                if ((statusData.status === 'succeeded' || statusData.status === 'SUCCESS') && statusData.choices?.[0]) {
                    const audioUrl = statusData.choices[0].audio_url || statusData.choices[0].url;
                    return NextResponse.json({
                        status: 'SUCCESS',
                        audioUrl: audioUrl
                    });
                }

                if (statusData.status === 'failed' || statusData.status === 'FAILED') {
                    return NextResponse.json({ error: 'Mureka 가창 생성 연동 실패' }, { status: 500 });
                }
            }

            attempts++;
        }

        return NextResponse.json({ error: 'Mureka 비동기 생성 시간 초과' }, { status: 504 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message || '서버 내부 통신 오류' }, { status: 500 });
    }
}