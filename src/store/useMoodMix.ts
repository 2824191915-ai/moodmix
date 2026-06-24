"use client";

import { create } from "zustand";
import { createResult, type MoodResult } from "@/lib/moodmix";
import {
  applyRitualEnhancement,
  parseRitualEnhancement,
  toRitualContext,
} from "@/lib/ritual-ai";

type Stage = "welcome" | "quiz" | "coffee" | "portrait";
type EnhancementStatus = "idle" | "loading" | "enhanced" | "fallback";

type MoodMixState = {
  stage: Stage;
  currentQuestion: number;
  answers: Record<string, string>;
  mbti: string;
  result: MoodResult | null;
  enhancementStatus: EnhancementStatus;
  start: () => void;
  setMbti: (mbti: string) => void;
  answer: (questionId: string, optionId: string) => void;
  back: () => void;
  reveal: () => void;
  enhance: (result: MoodResult) => Promise<void>;
  reset: () => void;
};

const initial = {
  stage: "welcome" as Stage,
  currentQuestion: 0,
  answers: {},
  mbti: "",
  result: null,
  enhancementStatus: "idle" as EnhancementStatus,
};

export const useMoodMix = create<MoodMixState>((set, get) => ({
  ...initial,
  start: () => set({ stage: "quiz" }),
  setMbti: (mbti) => set({ mbti }),
  answer: (questionId, optionId) => {
    const nextAnswers = { ...get().answers, [questionId]: optionId };
    const nextQuestion = get().currentQuestion + 1;
    if (nextQuestion >= 8) {
      const result = createResult(nextAnswers, get().mbti);
      set({ answers: nextAnswers, stage: "coffee", result, enhancementStatus: "loading" });
      void get().enhance(result);
      return;
    }
    set({ answers: nextAnswers, currentQuestion: nextQuestion });
  },
  back: () => set((state) => ({ currentQuestion: Math.max(0, state.currentQuestion - 1) })),
  reveal: () => set({ stage: "portrait" }),
  enhance: async (result) => {
    try {
      const response = await fetch("/api/ritual", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(toRitualContext(result)),
        signal: AbortSignal.timeout(15_000),
      });
      if (!response.ok) throw new Error("Enhancement request failed");
      const payload: unknown = await response.json();
      const enhancement =
        typeof payload === "object" && payload !== null && "enhancement" in payload
          ? parseRitualEnhancement(payload.enhancement)
          : null;
      if (!enhancement) {
        if (get().result?.seed === result.seed) set({ enhancementStatus: "fallback" });
        return;
      }
      if (get().result?.seed === result.seed) {
        set({
          result: applyRitualEnhancement(result, enhancement),
          enhancementStatus: "enhanced",
        });
      }
    } catch {
      if (get().result?.seed === result.seed) set({ enhancementStatus: "fallback" });
    }
  },
  reset: () => set(initial),
}));
