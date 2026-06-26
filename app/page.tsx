"use client"
import styles from "./page.module.css";
import { asciis } from "./asciis";
import { Button } from "./button";
import type { CSSProperties } from "react";
import { useState } from "react";
import Link from "next/link";

const asciiArray = [asciis.shell, asciis.locket, asciis.raspi, asciis.plushie, asciis.cloud];
const asciiText = ["stuff", "a clam locket (4 hours)", "a raspberry pi (3 hours)", "a weighted clam plushie (5 hours)", "$10 in cloud credits (2 hours)"]
const asciiStage = asciiArray.reduce(
  (stage, ascii) => {
    const lines = ascii.split("\n");

    return {
      columns: Math.max(stage.columns, ...lines.map((line) => line.length)),
      lines: Math.max(stage.lines, lines.length),
    };
  },
  { columns: 0, lines: 0 },
);

export default function Home() {
  const [current, setCurrent] = useState(0);
  const currentAsciiLines = asciiArray[current].split("\n");
  const currentAsciiStage = {
    columns: Math.max(...currentAsciiLines.map((line) => line.length)),
    lines: currentAsciiLines.length,
  };

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        
        <h3 className={styles.sshCommand}>&gt; ssh outer.one -p 6767</h3>
        <div className={styles.shellIntro}>
          <div>
          <div
            className={styles.asciiStage}
            style={
              {
                "--ascii-columns": asciiStage.columns,
                "--ascii-lines": asciiStage.lines,
                "--current-ascii-columns": currentAsciiStage.columns,
                "--current-ascii-lines": currentAsciiStage.lines,
              } as CSSProperties
            }
          >
            <pre key={current} className={styles.asciiArt}>
              {currentAsciiLines.map((line, index) => (
                <span
                  className={styles.asciiLine}
                  key={`${current}-${index}`}
                  style={{ "--line-index": index } as CSSProperties}
                >
                  {line}
                </span>
              ))}
            </pre>
          </div>
          </div>
          <div className={styles.introText}>
            <p>clam</p>
            <h1>ys: an ssh app</h1>
            <h1>ws: <span style={{
              color: current == 0 ? "inherit" : "#F9B2D7",
            }}>{asciiText[current]}</span></h1>
            <Button text="what stuff?" variant="hero" onClick={() => setCurrent((prev) => (prev + 1) % asciiArray.length)} />
            <Button text="submit project!" onClick={() => {}} />
          </div>
        </div>

      <div>
        <h1>how do i clam?</h1>
        <p style={{ fontFamily: "monospace" }}>write an ssh app using <Link style={{ color: "blue" }} href="https://github.com/charmbracelet/wish">Wish</Link>, <Link style={{ color: "blue" }} href="https://www.paramiko.org/">Paramiko</Link>, or any other ssh server library.</p>
        <p style={{ fontFamily: "monospace" }}>put it on github</p>
      </div>
       <div>

        <h1>what can i clam?</h1>
        <p style={{ fontFamily: "monospace" }}>you could build...</p>
        <ul style={{ fontFamily: "monospace" }}>
          <li>a personal page</li>
          <li>a game</li>
          <li>a chat app</li>
          <li>a file server</li>
          <li>your ascii art gallery</li>
        </ul>
      </div>
      </div>
      <footer className={styles.footer}>
        <div className={styles.footerTrack} aria-label="CLAM">
          {Array.from({ length: 24 }, (_, index) => (
            <span key={index}>CLAM</span>
          ))}
        </div>
      </footer>

    </div>
  );
}
