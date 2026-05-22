import { render } from "preact-render-to-string";
import type { RepoData } from "./github_readme_stats.ts";

const LANGUAGE_COLORS: Record<string, string> = {
    TypeScript: "#3178c6",
    JavaScript: "#f1e05a",
    Python: "#3572A5",
    Rust: "#dea584",
    Go: "#00ADD8",
    CSS: "#563d7c",
    HTML: "#e34c26",
    C: "#555555",
    "C++": "#f34b7d",
    "C#": "#239120",
    Java: "#b07219",
    Ruby: "#701516",
    PHP: "#4F5D95",
    Swift: "#FA7343",
    Kotlin: "#A97BFF",
    Shell: "#89e051",
    Svelte: "#ff3e00",
    Vue: "#41b883",
    Nix: "#7e7eff",
    Lua: "#000080",
    Dart: "#00B4AB",
};

function getLangColor(lang: string | null): string {
    if (!lang) return "#8b949e";
    return LANGUAGE_COLORS[lang] ?? "#8b949e";
}

function formatNumber(n: number): string {
    if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
    return String(n);
}

function truncate(s: string, max: number): string {
    return s.length > max ? s.slice(0, max) + "…" : s;
}

type Theme = "dark" | "light";

const THEMES = {
    dark: {
        bg: "#0d1117",
        border: "#30363d",
        icon: "#8b949e",
        repoName: "#58a6ff",
        desc: "#8b949e",
        langText: "#e6edf3",
        stat: "#8b949e",
    },
    light: {
        bg: "#ffffff",
        border: "#d0d7de",
        icon: "#57606a",
        repoName: "#0969da",
        desc: "#656d76",
        langText: "#24292f",
        stat: "#656d76",
    },
} as const;

export function renderRepoPinCard(
    repo: RepoData,
    theme: Theme = "dark",
): string {
    const c = THEMES[theme];
    const width = 400;
    const height = 125;
    const desc = repo.description ? truncate(repo.description, 58) : null;

    const starsX = repo.language ? 130 : 18;
    const forksX = starsX + 65;

    const svg = render(
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
        >
            <style>{`
        .gh-repo { font: 600 14px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${c.repoName}; }
        .gh-desc { font: 400 12px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${c.desc}; }
        .gh-lang { font: 400 12px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${c.langText}; }
        .gh-stat { font: 400 12px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${c.stat}; }
      `}</style>
            <rect
                width={width}
                height={height}
                rx="6"
                fill={c.bg}
                stroke={c.border}
                stroke-width="1"
            />
            {/* repository icon */}
            <svg
                x="14"
                y="14"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill={c.icon}
            >
                <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8Z" />
            </svg>
            <text x="36" y="26" class="gh-repo">
                {repo.full_name}
            </text>
            {desc ? (
                <text x="18" y="50" class="gh-desc">
                    {desc}
                </text>
            ) : null}
            {repo.language ? (
                <g>
                    <circle cx="24" cy="89" r="6" fill={getLangColor(repo.language)} />
                    <text x="35" y="94" class="gh-lang">
                        {repo.language}
                    </text>
                </g>
            ) : null}
            <text x={starsX} y="94" class="gh-stat">
                ★ {formatNumber(repo.stargazers_count)}
            </text>
            <text x={forksX} y="94" class="gh-stat">
                ⑂ {formatNumber(repo.forks_count)}
            </text>
        </svg>,
    );

    return `<?xml version="1.0" encoding="UTF-8"?>\n${svg}`;
}
