export type MoodAgentInput = {
  mood: string;
  city: string;
  style: string;
  alcoholPreference: string;
  userText: string;
};

export type MoodAgentResult = {
  emotion: string;
  city_style: string;
  cocktail_name: string;
  flavor_profile: string;
  visual_style: string;
  recommendation_reason: string;
  bartender_note: string;
  risk_note: string;
};

type InputErrorReason =
  | "empty"
  | "too_short"
  | "unsafe"
  | "invalid_request";

export type MoodAgentInputError = {
  reason: InputErrorReason;
  message: string;
};

const fieldLimits: Record<keyof MoodAgentInput, number> = {
  mood: 80,
  city: 80,
  style: 80,
  alcoholPreference: 80,
  userText: 420,
};

const resultLimits: Record<keyof MoodAgentResult, number> = {
  emotion: 80,
  city_style: 90,
  cocktail_name: 80,
  flavor_profile: 160,
  visual_style: 160,
  recommendation_reason: 320,
  bartender_note: 240,
  risk_note: 220,
};

const promptInjectionPattern =
  /(ignore|bypass|override|system prompt|developer message|api key|token|password|泄露|忽略.*指令|系统提示|开发者消息|越狱|绕过)/i;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function cleanString(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value.replace(/\s+/g, " ").trim().slice(0, maxLength);
}

export function parseMoodAgentInput(value: unknown): MoodAgentInput | MoodAgentInputError {
  if (!isRecord(value)) {
    return { reason: "invalid_request", message: "这次输入没有被正确送达，请刷新后再试一次。" };
  }

  const input: MoodAgentInput = {
    mood: cleanString(value.mood, fieldLimits.mood),
    city: cleanString(value.city, fieldLimits.city),
    style: cleanString(value.style, fieldLimits.style),
    alcoholPreference: cleanString(value.alcoholPreference, fieldLimits.alcoholPreference),
    userText: cleanString(value.userText, fieldLimits.userText),
  };

  const combined = Object.values(input).join(" ").trim();
  if (!combined) {
    return { reason: "empty", message: "先给我一点今晚的线索：心情、城市、审美或想喝的方向都可以。" };
  }
  if (combined.length < 2) {
    return { reason: "too_short", message: "再给我一两个字的线索就好，心情、颜色、地点都可以。" };
  }
  if (promptInjectionPattern.test(combined)) {
    return { reason: "unsafe", message: "这段内容像是在请求系统信息或绕过规则。我们只聊心情、城市和酒款本身。" };
  }

  return input;
}

function readResultString(record: Record<string, unknown>, key: keyof MoodAgentResult) {
  const value = record[key];
  if (typeof value !== "string") return null;
  const trimmed = value.replace(/\s+/g, " ").trim();
  return trimmed && trimmed.length <= resultLimits[key] ? trimmed : null;
}

export function parseMoodAgentResult(value: unknown): MoodAgentResult | null {
  if (!isRecord(value)) return null;
  const result = {} as MoodAgentResult;
  for (const key of Object.keys(resultLimits) as Array<keyof MoodAgentResult>) {
    const field = readResultString(value, key);
    if (!field) return null;
    result[key] = field;
  }
  return result;
}

export function moodAgentPrompt(input: MoodAgentInput) {
  return JSON.stringify({
    mood: input.mood,
    city: input.city,
    style: input.style,
    alcoholPreference: input.alcoholPreference,
    userText: input.userText,
  });
}

function pickFirstFilled(...values: string[]) {
  return values.find((value) => value.trim())?.trim() ?? "";
}

function includesAny(value: string, words: string[]) {
  const lower = value.toLowerCase();
  return words.some((word) => lower.includes(word.toLowerCase()));
}

export function fallbackMoodAgentResult(input: MoodAgentInput): MoodAgentResult {
  const combined = [input.mood, input.city, input.style, input.alcoholPreference, input.userText]
    .filter(Boolean)
    .join(" ");
  const noAlcohol = includesAny(combined, ["无酒精", "不喝酒", "不饮酒", "mocktail", "no alcohol"]);
  const lowAlcohol = noAlcohol || includesAny(combined, ["低酒精", "轻", "清爽", "low", "淡"]);
  const cityStyle = pickFirstFilled(input.city, input.style, "今晚的私人城市");
  const emotion = pickFirstFilled(input.mood, input.userText, "未命名心情").slice(0, 18);

  if (noAlcohol) {
    return {
      emotion,
      city_style: cityStyle,
      cocktail_name: "白桃月光苏打",
      flavor_profile: "白桃、柠檬、冷泡乌龙与细密气泡，清爽但有层次。",
      visual_style: "高球杯、透明大冰、淡金色气泡和一片轻薄柠檬皮。",
      recommendation_reason: "无酒精结构能保留仪式感，果香负责柔和入口，茶感让结尾更干净。",
      bartender_note: "用冷藏高球杯出杯，最后补气泡水并轻提一次。",
      risk_note: "这杯不含酒精；若改成含酒精版本，也建议保持低度慢饮。",
    };
  }

  if (lowAlcohol) {
    return {
      emotion,
      city_style: cityStyle,
      cocktail_name: "薄暮柚香 Spritz",
      flavor_profile: "葡萄柚、青柠、少量苦味利口酒与干型气泡，轻盈微苦。",
      visual_style: "淡玫瑰金酒体、长冰柱、柚皮卷和细小气泡。",
      recommendation_reason: "低酒精气泡能接住松弛心情，柑橘香气提亮氛围，微苦收尾避免甜腻。",
      bartender_note: "先入柑橘与苦味基底，加满冰后补干型气泡。",
      risk_note: "建议慢饮并配水；不想饮酒时可改为柚子苏打加无酒精苦味糖浆。",
    };
  }

  return {
    emotion,
    city_style: cityStyle,
    cocktail_name: "夜航内格罗尼",
    flavor_profile: "金酒草本、甜味美思、橙皮苦韵与一点可可般的暗香。",
    visual_style: "低球杯、大冰块、深红琥珀色酒体和明亮橙皮油。",
    recommendation_reason: "经典强度适合需要一点确定感的夜晚，苦甜结构稳，香气足够有画面。",
    bartender_note: "等量搅拌至冰冷顺滑，出杯后充分表达橙皮油。",
    risk_note: "这杯酒感明确，请慢饮并避免空腹；需要轻一点可改成低度 Americano。",
  };
}
