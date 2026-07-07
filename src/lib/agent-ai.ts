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
  | "off_topic"
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

const moodmixTopicPattern =
  /(心情|情绪|城市|审美|风格|酒|鸡尾酒|微醺|口味|酸|甜|苦|清爽|浓烈|mood|city|style|cocktail|drink|bar|alcohol|flavor)/i;

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
  if (combined.length < 8) {
    return { reason: "too_short", message: "线索有点太少了。再写一句心情或口味，我会更好地为你调配。" };
  }
  if (promptInjectionPattern.test(combined)) {
    return { reason: "unsafe", message: "这段内容像是在请求系统信息或绕过规则。我们只聊心情、城市和酒款本身。" };
  }
  if (!moodmixTopicPattern.test(combined)) {
    return { reason: "off_topic", message: "这次输入和 MoodMix 的心情、城市、审美或鸡尾酒推荐关系不太大，换一个今晚的线索吧。" };
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
