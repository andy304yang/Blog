"use client";

import { Bell, Bug } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./page.module.css";

type PetState = "idle" | "happy" | "sad";

const FRAME_COUNTS: Record<PetState, number> = {
  idle: 6,
  happy: 9,
  sad: 8,
};

const FRAME_ROOT = "/stock-pet/pets/shuitunlulu";
const SPRITES: Record<PetState, string> = {
  idle: `${FRAME_ROOT}/sprite_idle.png`,
  happy: `${FRAME_ROOT}/sprite_happy.png`,
  sad: `${FRAME_ROOT}/sprite_sad.png`,
};

let spritesPreloaded = false;

export default function LiveStockPet({
  rate,
  notificationCount = 9,
}: {
  rate: number;
  notificationCount?: number;
}) {
  const [phase, setPhase] = useState<PetState>(() => rate < 0 ? "sad" : "idle");
  const [actionActive, setActionActive] = useState(false);
  const [newsOpen, setNewsOpen] = useState(false);
  const actionTimer = useRef<number | null>(null);

  useEffect(() => {
    if (spritesPreloaded) return;
    spritesPreloaded = true;
    Object.values(SPRITES).forEach((src) => {
      const image = new window.Image();
      image.src = src;
    });
  }, []);

  useEffect(() => {
    const expressivePhase: PetState = rate >= 0 ? "happy" : "sad";
    const expressive = rate >= 0 ? rate >= 1 : rate <= -0.5;

    if (actionActive) {
      if (phase !== expressivePhase) setPhase(expressivePhase);
      return;
    }

    if (!expressive) {
      if (phase !== "idle") setPhase("idle");
      return;
    }

    const phaseDuration = phase === "idle"
      ? FRAME_COUNTS.idle * 250
      : FRAME_COUNTS[expressivePhase] * 250;
    const phaseTimer = window.setTimeout(
      () => setPhase((current) => current === "idle" ? expressivePhase : "idle"),
      phaseDuration,
    );

    return () => window.clearTimeout(phaseTimer);
  }, [actionActive, phase, rate]);

  useEffect(() => () => {
    if (actionTimer.current !== null) window.clearTimeout(actionTimer.current);
  }, []);

  const isProfit = rate >= 0;
  const happiness = Math.min(1, Math.max(0, rate) / 5);
  const displayRate = `${rate > 0 ? "+" : ""}${rate.toFixed(2)}%`;

  const triggerAction = () => {
    if (actionTimer.current !== null) window.clearTimeout(actionTimer.current);
    setActionActive(false);
    setPhase(isProfit ? "happy" : "sad");
    window.requestAnimationFrame(() => {
      setActionActive(true);
      actionTimer.current = window.setTimeout(() => setActionActive(false), 950);
    });
  };

  const stageStyle = {
    "--pet-happiness": happiness,
    "--pet-jump-height": `${20 + happiness * 18}px`,
  } as CSSProperties;
  const spriteClass = {
    idle: styles.livePetFramesIdle,
    happy: styles.livePetFramesHappy,
    sad: styles.livePetFramesSad,
  }[phase];

  return (
    <div
      className={`${styles.livePetStage} ${isProfit ? styles.livePetProfit : styles.livePetLoss}`}
      style={stageStyle}
      onMouseEnter={isProfit ? triggerAction : undefined}
      data-testid={isProfit ? "live-pet-profit" : "live-pet-loss"}
      aria-label={`正在播放的水豚噜噜桌宠，当前收益 ${displayRate}`}
    >
      <div className={styles.livePetShadow} aria-hidden="true" />
      <div className={`${styles.livePetBody} ${actionActive ? (isProfit ? styles.livePetAction : styles.livePetBearAction) : ""}`}>
        <span className={styles.livePetFrame}>
          <img
            className={spriteClass}
            src={SPRITES[phase]}
            data-pet-frame={phase}
            width={FRAME_COUNTS[phase] * 192}
            height={208}
            draggable={false}
            alt=""
            aria-hidden="true"
          />
        </span>
      </div>

      <div className={styles.livePetControls}>
        <div className={styles.livePetControlSlot}>
          <button
            type="button"
            aria-label="查看持仓热门资讯"
            aria-expanded={newsOpen}
            onClick={() => setNewsOpen((open) => !open)}
          >
            <Bell fill="currentColor" aria-hidden="true" />
            <span>{Math.min(notificationCount, 9)}</span>
          </button>
          {newsOpen && <small className={styles.livePetPopover}>9 条持仓资讯</small>}
        </div>
        <button type="button" aria-label="播放宠物调试动作" onClick={triggerAction}>
          <Bug fill="currentColor" aria-hidden="true" />
        </button>
      </div>

      <b className={styles.livePetRate}>{displayRate}</b>
    </div>
  );
}
