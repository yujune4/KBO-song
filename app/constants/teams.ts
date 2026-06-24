export interface Player {
    backNumber: number;
    role: string;
    name: string;
    position: string;
    tag?: string;
}

export interface TeamTheme {
    id: string;
    name: string;
    primaryColor: string;
    players: Player[];
}

export const KBO_TEAMS: Record<string, TeamTheme> = {
    "LG 트윈스": {
        id: "lg",
        name: "LG 트윈스",
        primaryColor: "#C30452",
        players: [
            { backNumber: 1, role: "에이스", name: "임찬규", position: "투수", tag: "응원가 최다 생성" },
            { backNumber: 23, role: "대표타자", name: "오스틴", position: "내야수" },
            { backNumber: 2, role: "스타플레이어", name: "홍창기", position: "외야수", tag: "응원가 최다 생성" }
        ]
    },
    "KIA 타이거즈": {
        id: "kia",
        name: "KIA 타이거즈",
        primaryColor: "#EA0029",
        players: [
            { backNumber: 20, role: "에이스", name: "양현종", position: "투수", tag: "응원가 최다 생성" },
            { backNumber: 5, role: "대표타자", name: "김도영", position: "내야수" },
            { backNumber: 34, role: "스타플레이어", name: "최형우", position: "외야수", tag: "응원가 최다 생성" }
        ]
    },
    "삼성 라이온즈": {
        id: "samsung",
        name: "삼성 라이온즈",
        primaryColor: "#0066B3",
        players: [
            { backNumber: 1, role: "에이스", name: "원태인", position: "투수", tag: "응원가 최다 생성" },
            { backNumber: 5, role: "대표타자", name: "구자욱", position: "외야수" },
            { backNumber: 7, role: "스타플레이어", name: "김영웅", position: "내야수", tag: "응원가 최다 생성" }
        ]
    },
    "두산 베어스": {
        id: "doosan",
        name: "두산 베어스",
        primaryColor: "#131230",
        players: [
            { backNumber: 1, role: "에이스", name: "곽빈", position: "투수", tag: "응원가 최다 생성" },
            { backNumber: 25, role: "대표타자", name: "양의지", position: "포수" },
            { backNumber: 31, role: "스타플레이어", name: "정수빈", position: "외야수", tag: "응원가 최다 생성" }
        ]
    },
    "롯데 자이언츠": {
        id: "lotte",
        name: "롯데 자이언츠",
        primaryColor: "#041E42",
        players: [
            { backNumber: 21, role: "에이스", name: "박세웅", position: "투수", tag: "응원가 최다 생성" },
            { backNumber: 91, role: "대표타자", name: "윤동희", position: "외야수" },
            { backNumber: 41, role: "스타플레이어", name: "황성빈", position: "외야수", tag: "응원가 최다 생성" }
        ]
    },
    "한화 이글스": {
        id: "hanwha",
        name: "한화 이글스",
        primaryColor: "#FF6600",
        players: [
            { backNumber: 99, role: "에이스", name: "류현진", position: "투수", tag: "응원가 최다 생성" },
            { backNumber: 22, role: "대표타자", name: "채은성", position: "내야수" },
            { backNumber: 1, role: "스타플레이어", name: "문동주", position: "투수", tag: "응원가 최다 생성" }
        ]
    },
    "SSG 랜더스": {
        id: "ssg",
        name: "SSG 랜더스",
        primaryColor: "#CE0E2D",
        players: [
            { backNumber: 29, role: "에이스", name: "김광현", position: "투수", tag: "응원가 최다 생성" },
            { backNumber: 14, role: "대표타자", name: "최정", position: "내야수" },
            { backNumber: 54, role: "스타플레이어", name: "박성한", position: "내야수", tag: "응원가 최다 생성" }
        ]
    },
    "KT 위즈": {
        id: "kt",
        name: "KT 위즈",
        primaryColor: "#000000",
        players: [
            { backNumber: 1, role: "에이스", name: "고영표", position: "투수", tag: "응원가 최다 생성" },
            { backNumber: 10, role: "대표타자", name: "강백호", position: "포수" },
            { backNumber: 60, role: "스타플레이어", name: "박병호", position: "내야수", tag: "응원가 최다 생성" }
        ]
    },
    "NC 다이노스": {
        id: "nc",
        name: "NC 다이노스",
        primaryColor: "#072240",
        players: [
            { backNumber: 1, role: "에이스", name: "신민혁", position: "투수", tag: "응원가 최다 생성" },
            { backNumber: 2, role: "대표타자", name: "박민우", position: "내야수" },
            { backNumber: 31, role: "스타플레이어", name: "손아섭", position: "외야수", tag: "응원가 최다 생성" }
        ]
    },
    "키움 히어로즈": {
        id: "kiwoom",
        name: "키움 히어로즈",
        primaryColor: "#570514",
        players: [
            { backNumber: 1, role: "에이스", name: "후라도", position: "투수", tag: "응원가 최다 생성" },
            { backNumber: 10, role: "대표타자", name: "송성문", position: "내야수" },
            { backNumber: 51, role: "스타플레이어", name: "이주형", position: "외야수", tag: "응원가 최다 생성" }
        ]
    }
};