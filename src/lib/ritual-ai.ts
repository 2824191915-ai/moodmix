import { themes, type MoodResult, type ScoreKey } from "./moodmix.ts";

export type RitualEnhancement = {
  cocktailName: string;
  story: string;
  reading: string;
  message: string;
  bartenderNote: string;
};

export type RitualContext = {
  atmosphere: string;
  moodColor: string;
  archetype: {
    name: string;
    chineseName: string;
    temperament: string;
  };
  coffeeSymbols: Array<{
    name: string;
    chineseName: string;
    meaning: string;
  }>;
  scores: MoodResult["scores"];
  cocktail: {
    basedOn: string;
    ingredients: string;
    method: string;
    strength: string;
    garnish: string;
    localModification: string;
  };
};

const limits: Record<keyof RitualEnhancement, number> = {
  cocktailName: 60,
  story: 280,
  reading: 280,
  message: 140,
  bartenderNote: 220,
};

export function toRitualContext(result: MoodResult): RitualContext {
  return {
    atmosphere: themes[result.theme].name,
    moodColor: themes[result.theme].moodColor,
    archetype: {
      name: result.archetype.name,
      chineseName: result.archetype.cn,
      temperament: result.archetype.note,
    },
    coffeeSymbols: result.coffeeSymbols.map((symbol) => ({
      name: symbol[0],
      chineseName: symbol[1],
      meaning: symbol[2],
    })),
    scores: result.scores,
    cocktail: {
      basedOn: result.cocktail.basedOn,
      ingredients: result.cocktail.ingredients,
      method: result.cocktail.method,
      strength: result.cocktail.strength,
      garnish: result.cocktail.garnish,
      localModification: result.cocktail.modification,
    },
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readString(
  record: Record<string, unknown>,
  key: string,
  maxLength = 240,
): string | null {
  const value = record[key];
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed && trimmed.length <= maxLength ? trimmed : null;
}

export function parseRitualContext(value: unknown): RitualContext | null {
  if (!isRecord(value)) return null;
  const archetype = value.archetype;
  const cocktail = value.cocktail;
  const scores = value.scores;
  const coffeeSymbols = value.coffeeSymbols;
  if (
    !isRecord(archetype) ||
    !isRecord(cocktail) ||
    !isRecord(scores) ||
    !Array.isArray(coffeeSymbols) ||
    coffeeSymbols.length !== 3
  ) return null;

  const scoreKeys: ScoreKey[] = [
    "emotionDepth",
    "socialDesire",
    "exploration",
    "romance",
    "control",
    "pressure",
  ];
  const parsedScores = {} as MoodResult["scores"];
  for (const key of scoreKeys) {
    const score = scores[key];
    if (typeof score !== "number" || !Number.isFinite(score) || score < 0 || score > 100) {
      return null;
    }
    parsedScores[key] = score;
  }

  const parsedSymbols = coffeeSymbols.map((symbol) => {
    if (!isRecord(symbol)) return null;
    const name = readString(symbol, "name", 40);
    const chineseName = readString(symbol, "chineseName", 20);
    const meaning = readString(symbol, "meaning", 100);
    return name && chineseName && meaning ? { name, chineseName, meaning } : null;
  });
  if (parsedSymbols.some((symbol) => symbol === null)) return null;

  const atmosphere = readString(value, "atmosphere", 60);
  const moodColor = readString(value, "moodColor", 40);
  const archetypeName = readString(archetype, "name", 60);
  const archetypeChineseName = readString(archetype, "chineseName", 30);
  const temperament = readString(archetype, "temperament", 120);
  const basedOn = readString(cocktail, "basedOn", 60);
  const ingredients = readString(cocktail, "ingredients", 300);
  const method = readString(cocktail, "method", 300);
  const strength = readString(cocktail, "strength", 30);
  const garnish = readString(cocktail, "garnish", 100);
  const localModification = readString(cocktail, "localModification", 180);
  if (
    !atmosphere ||
    !moodColor ||
    !archetypeName ||
    !archetypeChineseName ||
    !temperament ||
    !basedOn ||
    !ingredients ||
    !method ||
    !strength ||
    !garnish ||
    !localModification
  ) return null;

  return {
    atmosphere,
    moodColor,
    archetype: {
      name: archetypeName,
      chineseName: archetypeChineseName,
      temperament,
    },
    coffeeSymbols: parsedSymbols as RitualContext["coffeeSymbols"],
    scores: parsedScores,
    cocktail: {
      basedOn,
      ingredients,
      method,
      strength,
      garnish,
      localModification,
    },
  };
}

export function parseRitualEnhancement(value: unknown): RitualEnhancement | null {
  if (!isRecord(value)) return null;

  const output = {} as RitualEnhancement;
  for (const key of Object.keys(limits) as Array<keyof RitualEnhancement>) {
    const field = value[key];
    if (typeof field !== "string") return null;
    const trimmed = field.trim();
    if (!trimmed || trimmed.length > limits[key]) return null;
    output[key] = trimmed;
  }
  return output;
}

export function applyRitualEnhancement(
  result: MoodResult,
  enhancement: RitualEnhancement,
): MoodResult {
  return {
    ...result,
    reading: enhancement.reading,
    message: enhancement.message,
    cocktail: {
      ...result.cocktail,
      name: enhancement.cocktailName,
      story: enhancement.story,
      bartenderNote: enhancement.bartenderNote,
    },
  };
}
