import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { teamName, playerName, keywords } = await req.json();
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return NextResponse.json({ error: 'API 키 누락' }, { status: 500 });
        }

        const systemText = '당신은 대한민국 최고의 프로야구 응원가 작사가입니다. 무조건 [Intro], [Verse 1], [Chorus], [Outro] 같은 음악 파트 태그를 가사에 명확히 포함해 주세요. 웅장하고 신나는 록 사운드에 어울리는 직관적이고 외치기 쉬운 문장으로 구성하며, 다른 부연 설명이나 인사말 없이 오직 가사 텍스트만 출력하세요.';
        const userPrompt = `구단 이름: ${teamName}\n선수 이름: ${playerName || '공통 응원가'}\n선택 키워드: ${keywords || '승리, 열정, 함성'}\n\n위 정보를 바탕으로 한국 프로야구 감성의 뜨겁고 중독성 있는 응원가 가사를 만들어줘.`;

        // 2026 최신 표준인 gemini-2.5-flash 모델로 변경하여 404 오류 원천 차단
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [{ text: `${systemText}\n\n${userPrompt}` }]
                        }
                    ],
                    generationConfig: {
                        temperature: 0.7
                    }
                })
            }
        );

        if (!response.ok) {
            const errorDetail = await response.text();
            return NextResponse.json({ error: `구글 서버 에러: ${response.status} - ${errorDetail}` }, { status: response.status });
        }

        const data = await response.json();
        const generatedLyrics = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!generatedLyrics) {
            return NextResponse.json({ error: '가사 파싱 실패' }, { status: 500 });
        }

        return NextResponse.json({ lyrics: generatedLyrics });

    } catch (error) {
        return NextResponse.json({ error: '서버 내부 에러 발생' }, { status: 500 });
    }
}