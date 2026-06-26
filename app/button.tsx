"use client";

import styles from "./page.module.css";

export function Button({
  text,
  onClick,
  variant = "regular",
}: {
  text: string;
  onClick: () => void;
  variant?: "regular" | "hero";
}) {
  const border = `+${"-".repeat(text.length + 2)}+`;
  const button = [border, `| ${text} |`, border].join("\n");
  const className =
    variant === "hero"
      ? `${styles.asciiButton} ${styles.asciiButtonHero}`
      : styles.asciiButton;

  return (
    <pre
      className={className}
      onClick={onClick}
    >
      {button}
    </pre>
  );
}
