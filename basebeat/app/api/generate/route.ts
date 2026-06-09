import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({ status: "ONLINE" });
}

export async function POST(request: Request) {
    try {
        const { team, playerName, lyrics, keywords, genre, tempo } = await request.json();

        const userGenre = genre || 'stadium heavy rock';
        const userTempo = tempo || '140bpm';
        const parsedKeywords = keywords ? `, themed around ${keywords}` : '';
        const parsedLyrics = lyrics ? `, lyrics structure and vibe: ${lyrics.substring(0, 100)}` : '';
        const targetSubject = playerName ? `${playerName} from ${team}` : `${team} baseball team`;

        const dynamicPrompt = `${targetSubject} cheering song, ${userGenre}, energetic and powerful mood, ${userTempo} tempo, stadium crowd roaring, brass accents, driving rhythm section${parsedKeywords}${parsedLyrics}, high quality audio production`;

        const response = await fetch(
            'https://api-inference.huggingface.co/models/facebook/musicgen-large',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.HF_API_KEY || ''}`
                },
                method: 'POST',
                body: JSON.stringify({ inputs: dynamicPrompt }),
            }
        );

        if (response.ok) {
            const audioBuffer = await response.arrayBuffer();
            return new NextResponse(audioBuffer, {
                headers: { 'Content-Type': 'audio/mpeg' },
            });
        }

        const fallbackResponse = await fetch(
            'https://actions.google.com/sounds/v1/sports/baseball_stadium_cheer.ogg'
        );

        if (!fallbackResponse.ok) throw new Error('인프라 통신 실패');

        const fallbackBuffer = await fallbackResponse.arrayBuffer();
        return new NextResponse(fallbackBuffer, {
            headers: { 'Content-Type': 'audio/ogg' },
        });

    } catch (error) {
        return NextResponse.json({ error: '인프라 구동 에러' }, { status: 500 });
    }
}