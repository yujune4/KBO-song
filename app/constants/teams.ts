export interface TeamTheme {
    id: string;
    name: string;
    playerName: string;
    primaryColor: string;
    secondaryColor: string;
    textColor: string;
    accentColor: string;
    bgGradient: string;
    logoUrl: string;
    playerImageUrl: string;
    stadiumBg: string;
}

export const KBO_TEAMS: Record<string, TeamTheme> = {
    "LG 트윈스": {
        id: "lg",
        name: "LG 트윈스",
        playerName: "AUSTIN HAYS",
        primaryColor: "#C30452",
        secondaryColor: "#000000",
        textColor: "#FFFFFF",
        accentColor: "#C30452",
        bgGradient: "from-pink-950 via-black to-neutral-950",
        logoUrl: "https://images.unsplash.com/photo-1540747737956-37872e7e5821?q=80&w=100&auto=format&fit=crop",
        playerImageUrl: "https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?q=80&w=400&auto=format&fit=crop",
        stadiumBg: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1200&auto=format&fit=crop"
    },
    "KIA 타이거즈": {
        id: "kia",
        name: "KIA 타이거즈",
        playerName: "KIM DO-YOUNG",
        primaryColor: "#EA0029",
        secondaryColor: "#06141F",
        textColor: "#FFFFFF",
        accentColor: "#EA0029",
        bgGradient: "from-red-950 via-slate-950 to-neutral-950",
        logoUrl: "https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?q=80&w=100&auto=format&fit=crop",
        playerImageUrl: "https://images.unsplash.com/photo-1562074244-40133b221465?q=80&w=400&auto=format&fit=crop",
        stadiumBg: "https://images.unsplash.com/photo-1471295263379-6af76d62b947?q=80&w=1200&auto=format&fit=crop"
    },
    "삼성 라이온즈": {
        id: "samsung",
        name: "삼성 라이온즈",
        playerName: "KOO JA-WOOK",
        primaryColor: "#0066B3",
        secondaryColor: "#FFFFFF",
        textColor: "#FFFFFF",
        accentColor: "#FFD700",
        bgGradient: "from-blue-950 via-slate-900 to-black",
        logoUrl: "https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?q=80&w=100&auto=format&fit=crop",
        playerImageUrl: "https://images.unsplash.com/photo-1629901925121-8a141c2a42f4?q=80&w=400&auto=format&fit=crop",
        stadiumBg: "https://images.unsplash.com/photo-1562074244-40133b221465?q=80&w=1200&auto=format&fit=crop"
    },
    "두산 베어스": {
        id: "doosan",
        name: "두산 베어스",
        playerName: "YANG EUI-JI",
        primaryColor: "#131230",
        secondaryColor: "#ED1C24",
        textColor: "#FFFFFF",
        accentColor: "#131230",
        bgGradient: "from-indigo-950 via-slate-950 to-neutral-950",
        logoUrl: "https://images.unsplash.com/photo-1540747737956-37872e7e5821?q=80&w=100&auto=format&fit=crop",
        playerImageUrl: "https://images.unsplash.com/photo-1471295263379-6af76d62b947?q=80&w=400&auto=format&fit=crop",
        stadiumBg: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1200&auto=format&fit=crop"
    },
    "롯데 자이언츠": {
        id: "lotte",
        name: "롯데 자이언츠",
        playerName: "YOON DONG-HEE",
        primaryColor: "#041E42",
        secondaryColor: "#DC002C",
        textColor: "#FFFFFF",
        accentColor: "#DC002C",
        bgGradient: "from-sky-950 via-neutral-950 to-neutral-950",
        logoUrl: "https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?q=80&w=100&auto=format&fit=crop",
        playerImageUrl: "https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?q=80&w=400&auto=format&fit=crop",
        stadiumBg: "https://images.unsplash.com/photo-1471295263379-6af76d62b947?q=80&w=1200&auto=format&fit=crop"
    },
    "한화 이글스": {
        id: "hanwha",
        name: "한화 이글스",
        playerName: "RYU HYUN-JIN",
        primaryColor: "#FF6600",
        secondaryColor: "#000000",
        textColor: "#FFFFFF",
        accentColor: "#FF6600",
        bgGradient: "from-orange-950 via-black to-neutral-950",
        logoUrl: "https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?q=80&w=100&auto=format&fit=crop",
        playerImageUrl: "https://images.unsplash.com/photo-1485322551133-3a4c27a9d353?q=80&w=400&auto=format&fit=crop",
        stadiumBg: "https://images.unsplash.com/photo-1562074244-40133b221465?q=80&w=1200&auto=format&fit=crop"
    },
    "SSG 랜더스": {
        id: "ssg",
        name: "SSG 랜더스",
        playerName: "CHOI JEONG",
        primaryColor: "#CE0E2D",
        secondaryColor: "#FFFFFF",
        textColor: "#FFFFFF",
        accentColor: "#CE0E2D",
        bgGradient: "from-red-900 via-zinc-950 to-neutral-950",
        logoUrl: "https://images.unsplash.com/photo-1540747737956-37872e7e5821?q=80&w=100&auto=format&fit=crop",
        playerImageUrl: "https://images.unsplash.com/photo-1547558399-8ac5d594123e?q=80&w=400&auto=format&fit=crop",
        stadiumBg: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1200&auto=format&fit=crop"
    },
    "KT 위즈": {
        id: "kt",
        name: "KT 위즈",
        playerName: "KANG BAEG-HO",
        primaryColor: "#000000",
        secondaryColor: "#EF3340",
        textColor: "#FFFFFF",
        accentColor: "#EF3340",
        bgGradient: "from-neutral-900 via-stone-950 to-black",
        logoUrl: "https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?q=80&w=100&auto=format&fit=crop",
        playerImageUrl: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?q=80&w=400&auto=format&fit=crop",
        stadiumBg: "https://images.unsplash.com/photo-1471295263379-6af76d62b947?q=80&w=1200&auto=format&fit=crop"
    },
    "NC 다이노스": {
        id: "nc",
        name: "NC 다이노스",
        playerName: "PARK MIN-WOO",
        primaryColor: "#072240",
        secondaryColor: "#AF9165",
        textColor: "#FFFFFF",
        accentColor: "#AF9165",
        bgGradient: "from-blue-950 via-zinc-950 to-neutral-950",
        logoUrl: "https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?q=80&w=100&auto=format&fit=crop",
        playerImageUrl: "https://images.unsplash.com/photo-1518173946687-a4c8a3b1f98e?q=80&w=400&auto=format&fit=crop",
        stadiumBg: "https://images.unsplash.com/photo-1562074244-40133b221465?q=80&w=1200&auto=format&fit=crop"
    },
    "키움 히어로즈": {
        id: "kiwoom",
        name: "키움 히어로즈",
        playerName: "SON SUNG-MUN",
        primaryColor: "#570514",
        secondaryColor: "#FFFFFF",
        textColor: "#FFFFFF",
        accentColor: "#E4A010",
        bgGradient: "from-rose-950 via-stone-950 to-neutral-950",
        logoUrl: "https://images.unsplash.com/photo-1540747737956-37872e7e5821?q=80&w=100&auto=format&fit=crop",
        playerImageUrl: "https://images.unsplash.com/photo-1510279788855-3c97f029f2de?q=80&w=400&auto=format&fit=crop",
        stadiumBg: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1200&auto=format&fit=crop"
    }
};