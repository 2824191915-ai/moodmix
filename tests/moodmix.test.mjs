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
import {
  validateGeneratedMenu,
  validateRitualEnhancement,
} from "../src/lib/quality-guard.ts";
import nextConfig from "../next.config.ts";
import { professionalSpecs } from "../src/lib/professional-specs.ts";
import { barTextZh, cocktailNameZh } from "../src/lib/bar-localization.ts";
import { fallbackMenu } from "../src/lib/menu-ai.ts";
import { ART_FLIGHT_SET_COUNT, buildArtFlightPlan } from "../src/lib/art-flight.ts";

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
  assert.equal(result.observations.length, 3);
  assert.ok(result.observations.every((note) => note.observation && note.evidence && note.inference && note.identity));
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

test("bar terms are Chinese first with English originals as supporting labels", () => {
  assert.equal(cocktailNameZh("Negroni"), "内格罗尼（Negroni）");
  assert.equal(barTextZh("Gin · Fresh lemon juice"), "金酒（Gin） · 鲜榨柠檬汁（Fresh lemon juice）");
});

test("ritual QA rejects English residue and missing symbol evidence", () => {
  const result = createResult(tokyoAnswers);
  const context = toRitualContext(result);
  const report = validateRitualEnhancement({
    cocktailName: "Night Signal",
    story: `这是属于${context.archetype.chineseName}的故事，线索很清楚，但这里留下 English residue。`,
    reading: `${context.coffeeSymbols[0].chineseName}提醒你慢下来，第二个线索没有出现，第三个线索也没有出现。`,
    message: "今晚请把判断还给自己。",
    bartenderNote: "保持经典比例，只在杯口加入一层轻柔香气。",
  }, context);
  assert.equal(report.passed, false);
  assert.ok(report.issues.includes("english_residue"));
  assert.ok(report.issues.includes("logic_conflict"));
});

test("menu QA rejects duplicate generated cocktails", () => {
  const menu = fallbackMenu("Negroni", "东京霓虹雨");
  const duplicated = {
    ...menu,
    drinks: [menu.drinks[0], menu.drinks[0], menu.drinks[2]],
  };
  const report = validateGeneratedMenu(duplicated);
  assert.equal(report.passed, false);
  assert.ok(report.issues.includes("duplicate_name"));
  assert.ok(report.issues.includes("duplicate_cocktail"));
});

test("art flight plan creates three actionable painting-backed cocktails", () => {
  const result = createResult(tokyoAnswers);
  const plan = buildArtFlightPlan(result.cocktail.basedOn, "东京霓虹雨", result.seed);
  assert.equal(plan.length, 3);
  assert.equal(new Set(plan.map((drink) => drink.name)).size, 3);
  assert.equal(new Set(plan.map((drink) => drink.artwork.id)).size, 3);
  assert.ok(plan.every((drink) => drink.actionLabel.includes("复制")));
  assert.ok(plan.every((drink) => drink.serviceScript.includes("配方：") && drink.serviceScript.includes("名画：")));
  assert.ok(plan.every((drink) => drink.artwork.imageUrl.startsWith("https://commons.wikimedia.org/")));
});

test("art flight plan rotates through at least eight rich three-drink sets", () => {
  assert.ok(ART_FLIGHT_SET_COUNT >= 8);
  const firstDrinks = new Set();
  const allDrinkNames = new Set();
  for (let seed = 0; seed < ART_FLIGHT_SET_COUNT; seed += 1) {
    const plan = buildArtFlightPlan("Negroni", "东京霓虹雨", seed);
    assert.equal(plan.length, 3);
    assert.ok(plan.every((drink) => drink.ingredients.length >= 4));
    assert.ok(plan.every((drink) => drink.steps.length >= 2));
    firstDrinks.add(plan[0].name);
    plan.forEach((drink) => allDrinkNames.add(drink.name));
  }
  assert.ok(firstDrinks.size >= 8);
  assert.ok(allDrinkNames.size >= 24);
});

test("development origins keep the client interactive on local URLs", () => {
  assert.deepEqual(nextConfig.allowedDevOrigins, ["127.0.0.1", "localhost", "::1"]);
});

test("every recommended classic has an executable professional specification", () => {
  for (const archetype of archetypes) {
    for (const classic of archetype.bases) assert.ok(professionalSpecs[classic], classic);
  }
});
