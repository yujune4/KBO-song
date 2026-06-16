import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // 태스크 ID가 있으면 상태 조회 (폴링)
        if (body.taskId) {
            return NextResponse.json({
                status: 'SUCCESS',
                audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" // 테스트용 고정 URL
            });
        }

        // 처음 요청 시 바로 성공 리턴 (테스트용)
        return NextResponse.json({
            status: 'SUCCESS',
            audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        });

    } catch (error) {
        return NextResponse.json({ status: 'FAILED' });
    }
}