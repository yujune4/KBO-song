import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { action, team, playerName, keywords, lyrics } = await request.json();

    try {
        if (action === 'generate-lyrics') {
            const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GROQ_API_KEY}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: 'llama-3.3-70b-versatile',
                    messages: [{ role: 'user', content: `구단 ${team}의 선수 ${playerName}를 위한 응원가를 작성해. 키워드: ${keywords}. 오직 가사만 출력해.` }]
                })
            });
            const data = await response.json();
            return NextResponse.json({ lyrics: data.choices[0].message.content.trim() });
        }

        if (action === 'generate-song') {
            const response = await fetch('https://api.mureka.com/v1/generate', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${process.env.NEXT_PUBLIC_MUREKA_API_KEY}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: lyrics })
            });
            const data = await response.json();
            return NextResponse.json({ audioUrl: data.audio_url });
        }
    } catch (error) {
        return NextResponse.json({ error: '생성 실패' }, { status: 500 });
    }
}