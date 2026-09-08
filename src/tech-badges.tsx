import { Fragment } from "preact";

const badgeInfo: Record<string, { color: string; logo?: string; logoColor?: string }> = {
  React: { color: "20232a", logo: "react", logoColor: "61DAFB" },
  TypeScript: { color: "3178C6", logo: "typescript", logoColor: "white" },
  JavaScript: { color: "F7DF1E", logo: "javascript", logoColor: "black" },
  "Node.js": { color: "339933", logo: "nodedotjs", logoColor: "white" },
  "TanStack Start": { color: "FF4154", logo: "tanstack", logoColor: "white" },
  "TanStack Table": { color: "FF4154", logo: "tanstack", logoColor: "white" },
  "Cloudflare Workers": { color: "F38020", logo: "cloudflare", logoColor: "white" },
  "Cloudflare Pages": { color: "F38020", logo: "cloudflare", logoColor: "white" },
  "Cloudflare Workers KV": { color: "F38020", logo: "cloudflare", logoColor: "white" },
  PostgreSQL: { color: "4169E1", logo: "postgresql", logoColor: "white" },
  "ASP.NET Core": { color: "512BD4", logo: "dotnet", logoColor: "white" },
  SignalR: { color: "512BD4", logo: "dotnet", logoColor: "white" },
  "EF Core": { color: "512BD4", logo: "dotnet", logoColor: "white" },
  C: { color: "A8B9CC", logo: "c", logoColor: "white" },
};

function createBadgeSrc(tech: string) {
  const info = badgeInfo[tech];
  const label = encodeURIComponent(tech.replace(/-/g, "--"));
  const params = new URLSearchParams({ style: "flat-square" });

  if (info?.logo) {
    params.set("logo", info.logo);
    params.set("logoColor", info.logoColor ?? "white");
  }

  const color = info?.color ?? "555";
  return `https://img.shields.io/badge/${label}-${color}?${params.toString()}`;
}

export function renderTechBadges(techs: string[]) {
  return (
    <>
      {techs.map((tech, index) => (
        <Fragment key={index}>
          {index > 0 ? " " : null}
          <img
            src={createBadgeSrc(tech)}
            alt={tech}
            style={{ verticalAlign: "middle" }}
          />
        </Fragment>
      ))}
    </>
  );
}
