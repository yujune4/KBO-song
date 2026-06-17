import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
    try {
        const { teamName, playerName, keywords } = await req.json();

        const userPrompt = `
구단 이름: ${teamName}
선수 이름: ${playerName || '공통 응원가'}
선택 키워드: ${keywords || '승리, 열정, 함성'}

위 정보를 바탕으로 한국 프로야구 감성의 뜨겁고 중독성 있는 응원가 가사를 만들어줘.
`;

        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'system',
                    content: '당신은 대한민국 최고의 프로야구 응원가 작사가입니다. 무조건 [Intro], [Verse 1], [Chorus], [Outro] 같은 음악 파트 태그를 가사에 명확히 포함해 주세요. 웅장하고 신나는 록 사운드에 어울리는 직관적이고 외치기 쉬운 문장으로 구성하며, 다른 부연 설명이나 인사말 없이 오직 가사 텍스트만 출력하세요.'
                },
                {
                    role: 'user',
                    content: userPrompt
                }
            ],
            temperature: 0.7,
        });

        const generatedLyrics = response.choices[0].message.content;
        return NextResponse.json({ lyrics: generatedLyrics });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'AI 가사 생성 중 오류 발생' }, { status: 500 });
    }
}