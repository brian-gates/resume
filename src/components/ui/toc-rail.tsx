"use client";

import { useEffect, useMemo, useState } from "react";
import { roleAnchorId } from "~/lib/anchors";
import { cn } from "~/lib/utils";
import type { ResumeData } from "~/data/resume";

type RailItem = { id: string; label: string; sub?: string; depth: 0 | 1 };

export function TocRail({
  experience,
}: {
  experience: ResumeData["experience"];
}) {
  const items = useMemo<RailItem[]>(
    () => [
      { id: "skills", label: "Skills", depth: 0 },
      { id: "experience", label: "Experience", depth: 0 },
      ...experience.map((job): RailItem => ({
        id: roleAnchorId(job),
        label: job.company,
        sub: job.period,
        depth: 1,
      })),
    ],
    [experience]
  );

  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const els = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const topmost = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          )[0];
        if (topmost) setActiveId(topmost.target.id);
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    el.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <nav
      aria-label="Table of contents"
      className="fixed top-1/2 z-10 hidden w-40 max-h-[80vh] -translate-y-1/2 overflow-auto print:hidden xl:block left-[max(1rem,calc(50%-28rem-10rem-1rem))]"
    >
      <ul className="border-l border-border text-sm">
        {items.map((item) => {
          const active = activeId === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                aria-current={active ? "location" : undefined}
                className={cn(
                  "-ml-px flex flex-col border-l-2 py-1 transition-colors",
                  item.depth === 0 ? "pl-3 font-medium" : "pl-4",
                  active
                    ? "border-primary text-foreground"
                    : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
                )}
              >
                <span className="flex items-center gap-2">
                  {item.depth === 1 && (
                    <span
                      aria-hidden="true"
                      className={cn(
                        "h-1.5 w-1.5 shrink-0 rounded-full ring-1 transition-colors",
                        active
                          ? "bg-primary ring-primary"
                          : "bg-transparent ring-muted-foreground/50"
                      )}
                    />
                  )}
                  <span className="truncate">{item.label}</span>
                </span>
                {item.sub && (
                  <span className="truncate pl-3.5 text-xs text-muted-foreground/80">
                    {item.sub}
                  </span>
                )}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
