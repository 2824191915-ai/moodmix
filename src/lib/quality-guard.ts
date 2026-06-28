import type { GeneratedMenu } from "./menu-ai.ts";
import type { RitualContext, RitualEnhancement } from "./ritual-ai.ts";

const englishToken = /\b[A-Za-z][A-Za-z'&.-]*(?:\s+[A-Za-z][A-Za-z'&.-]*)*\b/g;
const allowedEnglish = new Set(["ABV", "IBA", "ml", "dash"]);

export type QualityIssue =
  | "duplicate_name"
  | "duplicate_reasoning"
  | "duplicate_cocktail"
  | "logic_conflict"
  | "english_residue"
  | "unnatural_chinese";

export type QualityReport = {
  passed: boolean;
  issues: QualityIssue[];
};

function unique<T>(items: T[]) {
  return new Set(items).size === items.length;
}

function compactText(value: string) {
  return value.replace(/\s+/g, "").replace(/[，。；、：“”"']/g, "");
}

function hasRepeatedSentence(text: string) {
  const sentences = text
    .split(/[。！？!?；;]/)
    .map((item) => compactText(item))
    .filter((item) => item.length >= 8);
  return !unique(sentences);
}

function hasEnglishResidue(text: string, allowParenthetical = false) {
  const matches = text.match(englishToken) ?? [];
  return matches.some((match) => {
    if (allowedEnglish.has(match)) return false;
    if (allowParenthetical && new RegExp(`（${match.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}）`).test(text)) return false;
    return true;
  });
}

function hasChineseRhythm(text: string, minChineseChars: number) {
  const chineseChars = text.match(/[\u4e00-\u9fff]/g)?.length ?? 0;
  return chineseChars >= minChineseChars && !/[,.!?]{2,}/.test(text);
}

export function qualitySummary(report: QualityReport) {
  return report.issues.join(",") || "passed";
}

export function validateRitualEnhancement(
  enhancement: RitualEnhancement,
  context: RitualContext,
): QualityReport {
  const issues = new Set<QualityIssue>();
  const fields = [
    enhancement.cocktailName,
    enhancement.story,
    enhancement.reading,
    enhancement.message,
    enhancement.bartenderNote,
  ];

  if (hasEnglishResidue(fields.join("\n"))) issues.add("english_residue");
  if (!hasChineseRhythm(fields.join(""), 80)) issues.add("unnatural_chinese");
  if (hasRepeatedSentence(`${enhancement.story}。${enhancement.reading}。${enhancement.message}`)) {
    issues.add("duplicate_reasoning");
  }
  if (
    !context.coffeeSymbols.every((symbol) => enhancement.reading.includes(symbol.chineseName)) ||
    !enhancement.story.includes(context.archetype.chineseName)
  ) {
    issues.add("logic_conflict");
  }

  return { passed: issues.size === 0, issues: [...issues] };
}

export function validateGeneratedMenu(menu: GeneratedMenu): QualityReport {
  const issues = new Set<QualityIssue>();
  const names = menu.drinks.map((drink) => compactText(drink.name));
  const classics = menu.drinks.map((drink) => compactText(drink.basedOn));
  const concepts = menu.drinks.map((drink) => compactText(drink.concept));

  if (!unique(names)) issues.add("duplicate_name");
  if (!unique(classics)) issues.add("duplicate_cocktail");
  if (!unique(concepts)) issues.add("duplicate_reasoning");
  if (menu.drinks.some((drink) => drink.ingredients.length < 3 || drink.steps.length < 2)) {
    issues.add("logic_conflict");
  }

  const generatedCopy = [
    menu.title,
    menu.serviceNote,
    ...menu.drinks.flatMap((drink) => [drink.name, drink.concept, ...drink.steps]),
  ].join("\n");
  if (hasEnglishResidue(generatedCopy)) issues.add("english_residue");
  if (!hasChineseRhythm(generatedCopy, 90)) issues.add("unnatural_chinese");

  return { passed: issues.size === 0, issues: [...issues] };
}
