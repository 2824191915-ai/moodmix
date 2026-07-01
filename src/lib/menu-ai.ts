import type { RecipeIngredient } from "./professional-specs.ts";
import { cocktailNameZh } from "./bar-localization.ts";

export type MenuDrink = {
  name: string;
  concept: string;
  basedOn: string;
  ingredients: RecipeIngredient[];
  steps: string[];
  glassware: string;
  ice: string;
  garnish: string;
  strength: string;
  keywords: string[];
};

export type GeneratedMenu = {
  title: string;
  serviceNote: string;
  drinks: MenuDrink[];
};

const images = ["/images/menu/amber-service.png", "/images/menu/pearl-service.png", "/images/menu/celadon-service.png"];

export function menuImage(index: number) {
  return images[index % images.length];
}

export function fallbackMenu(classic: string, mood: string): GeneratedMenu {
  const classicLabel = cocktailNameZh(classic);
  return {
    title: `${mood} · 今夜三幕`,
    serviceNote: "由浓至轻出杯；每杯保持克制改造与清晰经典骨架。",
    drinks: [
      {
        name: "暮金序饮",
        concept: `以${classicLabel}的结构开启夜晚，保留骨架，只加一层烘烤与柑橘。`,
        basedOn: classic,
        ingredients: [{ amount: "45 ml", item: "Bourbon" }, { amount: "20 ml", item: "Sweet vermouth" }, { amount: "7.5 ml", item: "Amontillado sherry" }, { amount: "2 dash", item: "Cacao bitters" }],
        steps: ["全部材料加满硬冰搅拌 22 秒。", "滤入预冷 Nick & Nora，表达橙皮油。"],
        glassware: "Nick & Nora",
        ice: "No service ice",
        garnish: "Orange peel and brandied cherry",
        strength: "Strong",
        keywords: ["spirit-forward", "dry", "amber"],
      },
      {
        name: "月白花信",
        concept: "以茉莉、梨与柠檬创造带细密泡沫的柔亮中场。",
        basedOn: "Clover Club",
        ingredients: [{ amount: "40 ml", item: "London dry gin" }, { amount: "20 ml", item: "Fresh lemon juice" }, { amount: "15 ml", item: "Jasmine pear cordial" }, { amount: "20 ml", item: "Aquafaba" }],
        steps: ["无冰干摇后加冰强力摇和。", "双重过滤至预冷 coupe。"],
        glassware: "Coupe",
        ice: "Dense shaker ice",
        garnish: "Lemon twist and edible white flower",
        strength: "Medium",
        keywords: ["floral", "silky", "pale"],
      },
      {
        name: "青瓷回声",
        concept: "以清透气泡收尾，让紫苏与黄瓜留下干净、低酒精度的余韵。",
        basedOn: "Americano",
        ingredients: [{ amount: "30 ml", item: "Dry vermouth" }, { amount: "20 ml", item: "Fino sherry" }, { amount: "15 ml", item: "Verjus" }, { amount: "75 ml", item: "Shiso soda" }],
        steps: ["前三项入加满硬冰的 highball。", "补紫苏苏打，轻提一次保持气泡。"],
        glassware: "Highball",
        ice: "Clear ice spear",
        garnish: "Cucumber ribbon and shiso leaf",
        strength: "Low",
        keywords: ["low ABV", "crisp", "high carbonation"],
      },
    ],
  };
}

export function parseGeneratedMenu(value: unknown): GeneratedMenu | null {
  if (!value || typeof value !== "object") return null;
  const menu = value as GeneratedMenu;
  if (typeof menu.title !== "string" || typeof menu.serviceNote !== "string" || !Array.isArray(menu.drinks) || menu.drinks.length !== 3) return null;
  const valid = menu.drinks.every((drink) => drink && typeof drink.name === "string" && typeof drink.concept === "string" && Array.isArray(drink.ingredients) && drink.ingredients.length >= 3 && Array.isArray(drink.steps) && drink.steps.length >= 2 && Array.isArray(drink.keywords));
  return valid ? menu : null;
}
