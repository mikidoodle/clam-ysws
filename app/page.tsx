"use client";
import styles from "./page.module.css";
import { asciis } from "./asciis";
import { Button } from "./button";
import type { CSSProperties } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";

const asciiArray = [
  asciis.shell,
  asciis.locket,
  asciis.raspi,
  asciis.plushie,
  asciis.cloud,
];
const asciiText = [
  "stuff",
  "a clam locket (4 hours)",
  "a raspberry pi (3 hours)",
  "a weighted clam plushie (5 hours)",
  "$10 in cloud credits (2 hours)",
];
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
  const [printedLineCount, setPrintedLineCount] = useState(0);
  const idleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cycleIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const currentAsciiLines = asciiArray[current].split("\n");
  const currentAsciiLineCount = currentAsciiLines.length;
  const printedAscii = currentAsciiLines.slice(0, printedLineCount).join("\n");
  const isPrinting = printedLineCount < currentAsciiLineCount;
  const currentAsciiStage = {
    columns: Math.max(...currentAsciiLines.map((line) => line.length)),
    lines: currentAsciiLineCount,
  };
  const advancePrize = useCallback(() => {
    setPrintedLineCount(0);
    setCurrent((prev) => (prev + 1) % asciiArray.length);
  }, []);

  const clearPrizeTimers = useCallback(() => {
    if (idleTimeoutRef.current) {
      clearTimeout(idleTimeoutRef.current);
      idleTimeoutRef.current = null;
    }

    if (cycleIntervalRef.current) {
      clearInterval(cycleIntervalRef.current);
      cycleIntervalRef.current = null;
    }
  }, []);

  const resetPrizeCycle = useCallback(() => {
    clearPrizeTimers();

    idleTimeoutRef.current = setTimeout(() => {
      advancePrize();
      cycleIntervalRef.current = setInterval(advancePrize, 5000);
    }, 10000);
  }, [advancePrize, clearPrizeTimers]);

  useEffect(() => {
    resetPrizeCycle();

    return clearPrizeTimers;
  }, [clearPrizeTimers, resetPrizeCycle]);

  useEffect(() => {
    if (printedLineCount >= currentAsciiLineCount) {
      return;
    }

    const printTimeout = setTimeout(() => {
      setPrintedLineCount((lineCount) =>
        Math.min(lineCount + 1, currentAsciiLineCount),
      );
    }, 38);

    return () => clearTimeout(printTimeout);
  }, [current, currentAsciiLineCount, printedLineCount]);

  const showNextPrize = () => {
    advancePrize();
    resetPrizeCycle();
  };

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h3 className={styles.sshCommand}>
          &gt; ssh clam.hackclub.com -p 6767
        </h3>
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
              <pre className={styles.asciiArt}>
                {printedAscii}
                {isPrinting ? <span className={styles.cursor}>█</span> : null}
              </pre>
            </div>
          </div>
          <div className={styles.introText}>
            <p>clam</p>
            <h1>ys: an ssh app</h1>
            <h1>
              ws:{" "}
              <span
                style={{
                  color: current == 0 ? "inherit" : "#F9B2D7",
                }}
              >
                {asciiText[current]}
              </span>
            </h1>
            <Button
              text={current == 0 ? "what stuff?" : "what else?"}
              variant="hero"
              onClick={showNextPrize}
            />
            <Link href="https://forms.hackclub.com/t/rXXdXDWnGyus">
              <Button text="submit project!" onClick={() => {}} />
            </Link>
          </div>
        </div>
        <div style={{ display: "flex", gap: "2rem", flexDirection: "column" }}>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem", fontFamily: "monospace" }}
          >
            <h1>whar</h1>
            <p style={{ fontFamily: "monospace" }}>
              an ssh app is a program that runs on a server and can be accessed
              through the command line using the{" "}
              <Link
                href="https://en.wikipedia.org/wiki/Secure_Shell"
                style={{
                  color: "#FD7979",
                }}
              >
                Secure Shell (SSH)
              </Link>{" "}
              protocol.
            </p>
            <p style={{ fontFamily: "monospace" }}>
              Some ssh apps you can check out are{" "}
              <Link href="https://github.com/zachlatta/sshtron">
                <code
                  style={{
                    backgroundColor: "#1E1E1E",
                    color: "#FD7979",
                    padding: "0.2rem 0.4rem",
                    borderRadius: "4px",
                  }}
                >
                  sshtron.zachlatta.com
                </code>
              </Link>
              ,{" "}
              <Link href="https://github.com/shazow/ssh-chat">
                <code
                  style={{
                    backgroundColor: "#1E1E1E",
                    color: "#FD7979",
                    padding: "0.2rem 0.4rem",
                    borderRadius: "4px",
                  }}
                >
                  ssh.chat
                </code>
              </Link>
              , and the one at the top of this page!
            </p>
          </div>
          <div
            style={{
              fontFamily: "monospace",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <h1>how do i clam?</h1>
            <p>
              You can write an ssh app using{" "}
              <Link 
                style={{ color: "#FD7979" }}
                href="https://github.com/gliderlabs/ssh"
              >
                gliderlabs/ssh
              </Link>
              ,{" "}
              <Link
                style={{ color: "#FD7979" }}
                href="https://github.com/charmbracelet/wish"
              >
                Wish
              </Link>
              ,{" "}
              <Link
                style={{ color: "#FD7979" }}
                href="https://www.paramiko.org/"
              >
                Paramiko
              </Link>
              , or any ssh server library of your choice!
            </p>
            <p>
              Here&apos;s a{" "}
              <Link href="https://github.com/ramonmeza/PythonSSHServerTutorial" style={{
                color: "#FD7979",
              }}>
                guide
              </Link>{" "}
              to help you get started with writing one with Paramiko, and <Link href="https://dev.to/jodaut/implementing-a-minimal-ssh-server-in-go-3b2k" style={{
                color: "#FD7979",
              }}> another one</Link> for Go with gliderlabs/ssh.
            </p>
          </div>
          <div
            style={{
              fontFamily: "monospace",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <h1>how do i submit?</h1>
            <p>For your ssh app to be eligible, it must:</p>
            <ul
              style={{
                fontFamily: "monospace",
                paddingLeft: "1rem",
                gap: "0.5rem",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <li>be open source</li>
              <li>
                be hosted either on{" "}
                <Link
                  style={{
                    color: "#FD7979",
                  }}
                  href="https://hackclub.app/"
                >
                  Nest
                </Link>{" "}
                or your own VPS
              </li>
              <li>
                contain a README with instructions on how to run the server and
                client
              </li>
              <li>contain a JOURNAL.md file with a log of your work</li>
            </ul>
            <p>
              Once your ssh app is ready, submit it by clicking the button at
              the top!
            </p>
          </div>
          <div
            style={{
              fontFamily: "monospace",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <h1>what can i clam?</h1>
            <p style={{ fontFamily: "monospace" }}>you could build...</p>
            <ul
              style={{
                fontFamily: "monospace",
                paddingLeft: "1rem",
                gap: "0.5rem",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <li>a game</li>
              <li>a chat app</li>
              <li>a file server</li>
              <li>your ascii art gallery</li>
              <li>
                and so much more! Run{" "}
                <code
                  style={{
                    backgroundColor: "#1E1E1E",
                    color: "#FD7979",
                    padding: "0.2rem 0.4rem",
                    borderRadius: "4px",
                  }}
                >
                  ssh git.charm.sh
                </code>{" "}
                in your terminal for more inspiration.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <footer className={styles.footer}>
        <div className={styles.footerTrack} aria-label="CLAM">
          {Array.from({ length: 24 }, (_, index) => (
            <span key={index}>CLAM</span>
          ))}
        </div>
      </footer>
      <span className={styles.bottomText}>everybody say thank you fox</span>
    </div>
  );
}
