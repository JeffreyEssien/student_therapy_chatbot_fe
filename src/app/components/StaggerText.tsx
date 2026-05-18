"use client";

interface StaggerTextProps {
  text: string;
  delay?: number;
  step?: number;
  className?: string;
  as?: "span" | "h1" | "h2" | "h3" | "p";
}

export default function StaggerText({
  text,
  delay = 0,
  step = 35,
  className = "",
  as: Tag = "span",
}: StaggerTextProps) {
  const words = text.split(" ");
  let i = 0;
  return (
    <Tag className={`stagger-root ${className}`} aria-label={text}>
      {words.map((word, w) => (
        <span key={w} className="inline-block whitespace-nowrap">
          {word.split("").map((ch) => {
            const idx = i++;
            return (
              <span
                key={idx}
                aria-hidden
                className="stagger-char inline-block"
                style={{ animationDelay: `${delay + idx * step}ms` }}
              >
                {ch}
              </span>
            );
          })}
          {w < words.length - 1 && (
            <span aria-hidden className="inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </Tag>
  );
}
