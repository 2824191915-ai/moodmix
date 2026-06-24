import assert from "node:assert/strict";
import test from "node:test";
import {
  archetypes,
  cocktails,
  createResult,
  questions,
  symbols,
  themes,
} from "../src/lib/moodmix.ts";
import {
  applyRitualEnhancement,
  parseRitualContext,
  parseRitualEnhancement,
  toRitualContext,
} from "../src/lib/ritual-ai.ts";
import nextConfig from "../next.config.ts";
import { professionalSpecs } from "../src/lib/professional-specs.ts";

const tokyoAnswers = {
  q1: "tokyo",
  q2: "rain",
  q3: "wander",
  q4: "spark",
  q5: "decision",
  q6: "storm",
  q7: "departing",
  q8: "bar",
};

test("MVP data pools meet the PRD scope", () => {
  assert.equal(Object.keys(themes).length, 6);
  assert.equal(questions.length, 8);
  assert.equal(archetypes.length, 16);
  assert.equal(cocktails.length, 48);
  assert.equal(symbols.length, 20);
});

test("result generation supports an omitted MBTI", () => {
  const result = createResult(tokyoAnswers, "");
  assert.equal(result.theme, "tokyo");
  assert.ok(Number.isFinite(result.seed));
  assert.ok(result.cocktail.basedOn);
});

test("coffee reading always contains three unique symbols", () => {
  const result = createResult(tokyoAnswers);
  const names = result.coffeeSymbols.map((symbol) => symbol[0]);
  assert.equal(names.length, 3);
  assert.equal(new Set(names).size, 3);
});

test("every answer option produces bounded scores", () => {
  for (let optionIndex = 0; optionIndex < 4; optionIndex += 1) {
    const answers = Object.fromEntries(
      questions.map((question) => [question.id, question.options[optionIndex].id]),
    );
    const result = createResult(answers, "INTJ");
    Object.values(result.scores).forEach((score) => {
      assert.ok(score >= 0 && score <= 100);
    });
  }
});

test("AI context contains only the bounded ritual inputs", () => {
  const result = createResult(tokyoAnswers);
  const context = toRitualContext(result);
  const parsed = parseRitualContext(context);
  assert.deepEqual(parsed, context);
  assert.equal(parsed.atmosphere, "Tokyo Neon Rain");
  assert.equal(parsed.coffeeSymbols.length, 3);
  assert.equal(parseRitualContext({ ...context, coffeeSymbols: [] }), null);
});

test("AI enhancement preserves the classic recipe contract", () => {
  const result = createResult(tokyoAnswers);
  const enhancement = parseRitualEnhancement({
    cocktailName: "Rain Signal",
    story: "霓虹落进杯中，经典结构仍然清晰。",
    reading: "星辰、潮汐与镜子提醒你相信正在形成的判断。",
    message: "让今晚替你保留一点清醒的勇气。",
    bartenderNote: "按原配方完成后，以冷萃茶喷雾轻覆杯口。",
  });
  assert.ok(enhancement);
  const enhanced = applyRitualEnhancement(result, enhancement);
  assert.equal(enhanced.cocktail.name, "Rain Signal");
  assert.equal(enhanced.cocktail.basedOn, result.cocktail.basedOn);
  assert.equal(enhanced.cocktail.ingredients, result.cocktail.ingredients);
  assert.equal(enhanced.cocktail.method, result.cocktail.method);
  assert.equal(enhanced.cocktail.garnish, result.cocktail.garnish);
});

test("development origins keep the client interactive on local URLs", () => {
  assert.deepEqual(nextConfig.allowedDevOrigins, ["127.0.0.1", "localhost", "::1"]);
});

test("every recommended classic has an executable professional specification", () => {
  for (const archetype of archetypes) {
    for (const classic of archetype.bases) assert.ok(professionalSpecs[classic], classic);
  }
});
