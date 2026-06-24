export type RecipeIngredient = {
  amount: string;
  item: string;
  note?: string;
};

export type ProfessionalSpec = {
  classic: string;
  standard: "IBA OFFICIAL" | "MOODMIX HOUSE SPEC";
  sourceUrl?: string;
  glassware: string;
  ice: string;
  technique: string;
  ingredients: RecipeIngredient[];
  steps: string[];
  garnish: string;
  target: string;
  keywords: string[];
};

const spec = (
  classic: string,
  ingredients: RecipeIngredient[],
  glassware: string,
  ice: string,
  technique: string,
  garnish: string,
  steps: string[],
  keywords: string[],
  target = "成酒温度 -4 至 -2°C；稀释率约 20–25%",
): ProfessionalSpec => ({
  classic,
  standard: "MOODMIX HOUSE SPEC",
  ingredients,
  glassware,
  ice,
  technique,
  garnish,
  steps,
  keywords,
  target,
});

const I = (amount: string, item: string, note?: string): RecipeIngredient => ({ amount, item, note });

export const professionalSpecs: Record<string, ProfessionalSpec> = {
  Manhattan: spec("Manhattan", [I("50 ml", "Rye whiskey"), I("20 ml", "Sweet vermouth"), I("2 dash", "Aromatic bitters")], "Chilled coupe", "Kold-Draft cubes", "Stir · strain", "Brandied cherry", ["杯中加满硬冰，搅拌 20–25 秒。", "滤入预冷 coupe，轻放樱桃。"], ["spirit-forward", "dry finish", "orange oil"]),
  "Black Manhattan": spec("Black Manhattan", [I("60 ml", "Rye whiskey"), I("30 ml", "Averna amaro"), I("1 dash", "Angostura bitters"), I("1 dash", "Orange bitters")], "Chilled coupe", "Kold-Draft cubes", "Stir · strain", "Brandied cherry", ["全部材料加冰搅拌至充分冰镇。", "滤入预冷杯，加入樱桃。"], ["dark herbal", "silky", "restrained sweetness"]),
  Negroni: spec("Negroni", [I("30 ml", "London dry gin"), I("30 ml", "Campari"), I("30 ml", "Sweet vermouth")], "Old fashioned", "Large clear cube", "Stir · rocks", "Orange peel", ["搅拌杯加冰搅拌 18–22 秒。", "滤至大冰块，挤压橙皮油。"], ["bittersweet", "juniper", "orange oil"]),
  Boulevardier: spec("Boulevardier", [I("45 ml", "Bourbon"), I("30 ml", "Sweet vermouth"), I("30 ml", "Campari")], "Old fashioned", "Large clear cube", "Stir · rocks", "Orange peel", ["全部材料加冰搅拌。", "滤至大冰块，表达橙皮油。"], ["warm oak", "bittersweet", "round"]),
  "Old Fashioned": spec("Old Fashioned", [I("60 ml", "Bourbon or rye"), I("7.5 ml", "Demerara syrup", "2:1"), I("2 dash", "Aromatic bitters")], "Old fashioned", "Large clear cube", "Stir · rocks", "Orange peel", ["杯中加入材料和大冰块。", "搅拌至冰镇，挤压橙皮油。"], ["spirit-led", "low sweetness", "clean dilution"]),
  Sazerac: spec("Sazerac", [I("60 ml", "Rye whiskey"), I("7.5 ml", "Demerara syrup", "2:1"), I("4 dash", "Peychaud's bitters"), I("5 ml", "Absinthe", "rinse only")], "Chilled old fashioned", "No service ice", "Stir · rinse · strain", "Expressed lemon peel, discard", ["冷杯以 absinthe 润洗后倒除。", "其余材料加冰搅拌，滤入杯中。", "挤压柠檬油后弃皮。"], ["anise perfume", "rye spice", "bone dry"]),
  "Dry Martini": {
    ...spec("Dry Martini", [I("60 ml", "Gin"), I("10 ml", "Dry vermouth")], "Chilled martini glass", "Kold-Draft cubes", "Stir · strain", "Lemon peel or green olive", ["将材料倒入装满冰块的搅拌杯。", "充分搅拌，滤入预冷 martini 杯。", "按客人偏好加柠檬皮油或青橄榄。"], ["very cold", "crisp", "lemon oil"], "成酒应极冷、清澈；避免过度稀释"),
    standard: "IBA OFFICIAL",
    sourceUrl: "https://iba-world.com/iba-cocktail/dry-martini/",
  },
  Gimlet: spec("Gimlet", [I("60 ml", "London dry gin"), I("25 ml", "Fresh lime juice"), I("15 ml", "Simple syrup", "1:1")], "Chilled coupe", "Dense shaker ice", "Shake · fine strain", "Lime coin", ["所有材料强力摇和 10–12 秒。", "双重过滤至预冷杯。"], ["bright lime", "crisp", "dry edge"]),
  Daiquiri: spec("Daiquiri", [I("60 ml", "White rum"), I("25 ml", "Fresh lime juice"), I("15 ml", "Cane syrup", "1:1")], "Chilled coupe", "Dense shaker ice", "Shake · fine strain", "No garnish", ["强力摇和至充分冰镇。", "双重过滤至预冷 coupe。"], ["clean rum", "sharp lime", "silky"]),
  Mojito: spec("Mojito", [I("50 ml", "White rum"), I("25 ml", "Fresh lime juice"), I("15 ml", "Cane syrup"), I("8–10", "Mint leaves"), I("60 ml", "Soda water")], "Highball", "Crushed ice", "Build · churn", "Mint bouquet", ["轻拍薄荷，与朗姆、青柠和糖浆入杯。", "加碎冰翻拌，补苏打与碎冰。"], ["fresh mint", "high carbonation", "clean"]),
  "French 75": spec("French 75", [I("30 ml", "Gin"), I("15 ml", "Fresh lemon juice"), I("15 ml", "Simple syrup"), I("60 ml", "Brut sparkling wine")], "Flute", "Shaker ice", "Shake · top", "Lemon twist", ["前三项加冰短摇。", "滤入 flute，缓慢补起泡酒。"], ["brut", "citrus lift", "fine bubbles"]),
  Aviation: spec("Aviation", [I("45 ml", "Gin"), I("15 ml", "Maraschino liqueur"), I("15 ml", "Fresh lemon juice"), I("5 ml", "Crème de violette")], "Chilled coupe", "Shaker ice", "Shake · fine strain", "Brandied cherry", ["全部材料加冰摇和。", "双重过滤至预冷杯。"], ["violet perfume", "dry floral", "pale blue"]),
  "Clover Club": spec("Clover Club", [I("45 ml", "Gin"), I("15 ml", "Raspberry syrup"), I("20 ml", "Fresh lemon juice"), I("20 ml", "Egg white or aquafaba")], "Chilled coupe", "Shaker ice", "Dry shake · shake", "Three raspberries", ["先无冰干摇，再加冰强力摇和。", "双重过滤至预冷杯。"], ["fine foam", "tart raspberry", "elegant"]),
  "Mai Tai": spec("Mai Tai", [I("45 ml", "Aged Jamaican rum"), I("15 ml", "Rhum agricole vieux"), I("15 ml", "Orange curaçao"), I("25 ml", "Fresh lime juice"), I("10 ml", "Orgeat"), I("5 ml", "Rich syrup")], "Double old fashioned", "Crushed ice", "Shake · open pour", "Mint bouquet and spent lime shell", ["材料加冰短摇。", "连冰倒入杯中，补碎冰并装饰。"], ["rum funk", "almond", "dry tropical"]),
  Margarita: spec("Margarita", [I("50 ml", "Blanco tequila"), I("20 ml", "Triple sec"), I("25 ml", "Fresh lime juice"), I("5 ml", "Agave syrup")], "Coupe or rocks", "Fresh cubes if rocks", "Shake · fine strain", "Half salt rim and lime", ["先做半圈盐边。", "材料加冰摇和，滤入预冷杯或新冰。"], ["agave forward", "bright lime", "half salt rim"]),
  "Mezcal Margarita": spec("Mezcal Margarita", [I("50 ml", "Espadín mezcal"), I("20 ml", "Orange liqueur"), I("25 ml", "Fresh lime juice"), I("10 ml", "Agave syrup")], "Rocks", "Large clear cube", "Shake · rocks", "Grapefruit peel", ["材料加冰强力摇和。", "滤至大冰块，表达西柚皮油。"], ["mineral smoke", "bright citrus", "moderate sweetness"]),
  "Jungle Bird": spec("Jungle Bird", [I("45 ml", "Dark rum"), I("22.5 ml", "Campari"), I("45 ml", "Pineapple juice"), I("15 ml", "Fresh lime juice"), I("15 ml", "Demerara syrup")], "Double old fashioned", "Fresh cubes", "Shake · rocks", "Pineapple leaf", ["材料加冰摇和。", "滤至新冰，整洁放置菠萝叶。"], ["bitter tropical", "rum depth", "fresh pineapple"]),
  Penicillin: spec("Penicillin", [I("60 ml", "Blended Scotch"), I("22.5 ml", "Fresh lemon juice"), I("22.5 ml", "Honey-ginger syrup"), I("7.5 ml", "Islay Scotch", "float")], "Rocks", "Large clear cube", "Shake · float", "Candied ginger", ["前三项加冰摇和，滤至大冰块。", "以吧匙背轻浮泥煤威士忌。"], ["ginger heat", "honey", "peat aroma"]),
  "Whiskey Sour": spec("Whiskey Sour", [I("60 ml", "Bourbon"), I("30 ml", "Fresh lemon juice"), I("20 ml", "Simple syrup"), I("20 ml", "Egg white or aquafaba")], "Rocks", "Fresh cubes", "Dry shake · shake", "Three bitters drops", ["无冰干摇，再加冰强摇。", "双重过滤至新冰，点三滴苦精。"], ["silky foam", "balanced sour", "bourbon"]),
  "Espresso Martini": spec("Espresso Martini", [I("40 ml", "Vodka"), I("30 ml", "Fresh espresso"), I("20 ml", "Coffee liqueur"), I("10 ml", "Demerara syrup")], "Chilled coupe", "Dense shaker ice", "Hard shake · fine strain", "Three coffee beans", ["使用新鲜浓缩咖啡，所有材料强力摇和。", "双重过滤，确保细密泡沫。"], ["fresh espresso", "dense crema", "not too sweet"]),
  "Coffee Negroni": spec("Coffee Negroni", [I("30 ml", "Gin"), I("30 ml", "Coffee-infused sweet vermouth"), I("30 ml", "Campari")], "Old fashioned", "Large clear cube", "Stir · rocks", "Orange peel", ["全部材料加冰搅拌。", "滤至大冰块，挤压橙皮油。"], ["coffee aroma", "bittersweet", "orange oil"]),
  "Vieux Carré": spec("Vieux Carré", [I("30 ml", "Rye whiskey"), I("30 ml", "Cognac"), I("30 ml", "Sweet vermouth"), I("7.5 ml", "Bénédictine"), I("2 dash", "Peychaud's bitters"), I("2 dash", "Angostura bitters")], "Old fashioned", "Large clear cube", "Stir · rocks", "Lemon peel", ["全部材料加冰充分搅拌。", "滤至大冰块，表达柠檬油。"], ["layered spice", "cognac warmth", "herbal"]),
  "Last Word": {
    ...spec("Last Word", [I("22.5 ml", "Gin"), I("22.5 ml", "Green Chartreuse"), I("22.5 ml", "Maraschino Luxardo"), I("22.5 ml", "Fresh lime juice")], "Chilled cocktail glass", "Shaker ice", "Shake · strain", "None", ["全部材料倒入摇壶。", "加冰摇和，过滤至预冷 cocktail 杯。"], ["equal parts", "herbal", "sharp lime"], "成酒应冰冷、清澈且四项风味等强"),
    standard: "IBA OFFICIAL",
    sourceUrl: "https://iba-world.com/iba-cocktail/last-word/",
  },
  "Paper Plane": spec("Paper Plane", [I("22.5 ml", "Bourbon"), I("22.5 ml", "Aperol"), I("22.5 ml", "Amaro Nonino"), I("22.5 ml", "Fresh lemon juice")], "Chilled coupe", "Shaker ice", "Shake · fine strain", "None", ["全部材料加冰摇和。", "双重过滤至预冷 coupe。"], ["equal parts", "bittersweet", "bright lemon"]),
  Sidecar: spec("Sidecar", [I("50 ml", "Cognac"), I("25 ml", "Orange liqueur"), I("25 ml", "Fresh lemon juice")], "Chilled coupe", "Shaker ice", "Shake · fine strain", "Orange twist", ["材料加冰摇和至充分冰镇。", "双重过滤并表达橙皮油。"], ["cognac", "dry citrus", "silky"]),
  "Low ABV Spritz": spec("Low ABV Spritz", [I("45 ml", "Dry vermouth"), I("20 ml", "Elderflower liqueur"), I("20 ml", "Verjus"), I("75 ml", "Soda water")], "Wine glass", "Large cubes", "Build · gentle lift", "Cucumber ribbon", ["杯中加冰，依次加入前三项。", "补苏打，轻提一次保持气泡。"], ["low ABV", "botanical", "high carbonation"]),
  "Champagne Cocktail": spec("Champagne Cocktail", [I("1 cube", "White sugar"), I("2 dash", "Angostura bitters"), I("10 ml", "Cognac"), I("90 ml", "Brut Champagne")], "Flute", "No ice", "Build", "Lemon twist", ["方糖以苦精浸湿后入杯，加 Cognac。", "沿杯壁缓慢补 Champagne。"], ["fine bubbles", "brut", "lemon oil"]),
  Cosmopolitan: spec("Cosmopolitan", [I("40 ml", "Citron vodka"), I("20 ml", "Cointreau"), I("20 ml", "Cranberry juice"), I("15 ml", "Fresh lime juice")], "Chilled coupe", "Shaker ice", "Shake · fine strain", "Flamed orange peel", ["材料加冰摇和。", "双重过滤，表达橙皮油。"], ["pale blush", "dry cranberry", "bright citrus"]),
  "Tommy's Margarita": spec("Tommy's Margarita", [I("60 ml", "Blanco tequila"), I("30 ml", "Fresh lime juice"), I("15 ml", "Agave nectar")], "Rocks", "Fresh cubes", "Shake · rocks", "Lime wheel", ["材料加冰摇和。", "滤至装有新冰的 rocks 杯。"], ["pure agave", "fresh lime", "clean"]),
  Americano: spec("Americano", [I("30 ml", "Campari"), I("30 ml", "Sweet vermouth"), I("60 ml", "Soda water")], "Highball", "Fresh cubes", "Build · gentle lift", "Orange half-wheel", ["杯中加冰，加入 Campari 与 vermouth。", "补苏打，轻提一次并装饰。"], ["low ABV", "bittersweet", "high carbonation"]),
  Bamboo: spec("Bamboo", [I("45 ml", "Fino sherry"), I("45 ml", "Dry vermouth"), I("1 dash", "Orange bitters"), I("1 dash", "Aromatic bitters")], "Chilled coupe", "Kold-Draft cubes", "Stir · strain", "Lemon twist", ["全部材料加冰搅拌 18 秒。", "滤入预冷杯，表达柠檬油。"], ["low ABV", "bone dry", "nutty"]),
  Adonis: spec("Adonis", [I("45 ml", "Fino sherry"), I("45 ml", "Sweet vermouth"), I("2 dash", "Orange bitters")], "Chilled coupe", "Kold-Draft cubes", "Stir · strain", "Orange peel", ["全部材料加冰搅拌。", "滤入预冷杯并表达橙皮油。"], ["low ABV", "round", "orange oil"]),
  "Corpse Reviver No. 2": spec("Corpse Reviver No. 2", [I("22.5 ml", "Gin"), I("22.5 ml", "Cointreau"), I("22.5 ml", "Lillet Blanc"), I("22.5 ml", "Fresh lemon juice"), I("5 ml", "Absinthe", "rinse")], "Chilled coupe", "Shaker ice", "Rinse · shake · fine strain", "Orange twist", ["以 absinthe 润洗预冷杯。", "其余材料加冰摇和并双重过滤。"], ["equal parts", "bright", "anise lift"]),
  "Bee's Knees": spec("Bee's Knees", [I("60 ml", "Gin"), I("22.5 ml", "Fresh lemon juice"), I("15 ml", "Honey syrup", "2:1")], "Chilled coupe", "Shaker ice", "Shake · fine strain", "Lemon twist", ["材料加冰强力摇和。", "双重过滤，表达柠檬油。"], ["honey", "bright lemon", "botanical"]),
  Southside: spec("Southside", [I("60 ml", "Gin"), I("25 ml", "Fresh lime juice"), I("15 ml", "Simple syrup"), I("8", "Mint leaves")], "Chilled coupe", "Shaker ice", "Shake · fine strain", "Mint leaf", ["轻拍薄荷，与其余材料加冰摇和。", "双重过滤至预冷杯。"], ["fresh mint", "crisp", "dry"]),
  Paloma: spec("Paloma", [I("50 ml", "Blanco tequila"), I("15 ml", "Fresh lime juice"), I("10 ml", "Agave syrup"), I("75 ml", "Grapefruit soda")], "Highball", "Clear cubes", "Build · top", "Grapefruit half-wheel", ["杯中加冰，加入 tequila、青柠与 agave。", "补西柚苏打，轻提一次。"], ["grapefruit", "high carbonation", "saline"]),
  "El Diablo": spec("El Diablo", [I("45 ml", "Reposado tequila"), I("15 ml", "Crème de cassis"), I("22.5 ml", "Fresh lime juice"), I("60 ml", "Ginger beer")], "Highball", "Fresh cubes", "Shake · top", "Lime wheel", ["前三项加冰摇和并滤至新冰。", "补 ginger beer，轻提一次。"], ["dark berry", "ginger heat", "agave"]),
  "Naked and Famous": spec("Naked and Famous", [I("22.5 ml", "Mezcal"), I("22.5 ml", "Yellow Chartreuse"), I("22.5 ml", "Aperol"), I("22.5 ml", "Fresh lime juice")], "Chilled coupe", "Shaker ice", "Shake · fine strain", "None", ["全部材料加冰摇和。", "双重过滤至预冷 coupe。"], ["equal parts", "mineral smoke", "bittersweet"]),
  "Trinidad Sour": spec("Trinidad Sour", [I("45 ml", "Angostura bitters"), I("15 ml", "Rye whiskey"), I("30 ml", "Orgeat"), I("22.5 ml", "Fresh lemon juice")], "Chilled coupe", "Shaker ice", "Shake · fine strain", "Lemon twist", ["全部材料加冰强力摇和。", "双重过滤并表达柠檬油。"], ["aromatic", "spiced", "silky"]),
  Toronto: spec("Toronto", [I("60 ml", "Rye whiskey"), I("7.5 ml", "Fernet-Branca"), I("7.5 ml", "Demerara syrup"), I("2 dash", "Aromatic bitters")], "Chilled coupe", "Kold-Draft cubes", "Stir · strain", "Orange peel", ["全部材料加冰充分搅拌。", "滤入预冷杯，表达橙皮油。"], ["rye spice", "bitter herbal", "dry"]),
  "Rusty Nail": spec("Rusty Nail", [I("45 ml", "Blended Scotch"), I("20 ml", "Drambuie")], "Old fashioned", "Large clear cube", "Stir · rocks", "Lemon peel", ["材料加冰搅拌至充分冰镇。", "滤至大冰块，表达柠檬油。"], ["heather honey", "Scotch", "round"]),
  "Brandy Crusta": spec("Brandy Crusta", [I("52.5 ml", "Cognac"), I("7.5 ml", "Orange curaçao"), I("7.5 ml", "Maraschino"), I("15 ml", "Fresh lemon juice"), I("2 dash", "Aromatic bitters")], "Sugar-rimmed coupe", "Shaker ice", "Shake · strain", "Long lemon peel", ["杯口做细糖边并铺入长柠檬皮。", "材料加冰摇和，滤入杯中。"], ["cognac", "citrus", "historic classic"]),
  "Pisco Sour": spec("Pisco Sour", [I("60 ml", "Pisco"), I("30 ml", "Fresh lime juice"), I("20 ml", "Simple syrup"), I("20 ml", "Egg white or aquafaba")], "Chilled coupe", "Shaker ice", "Dry shake · shake", "Three bitters drops", ["无冰干摇后加冰强摇。", "双重过滤，点三滴苦精。"], ["fine foam", "grape spirit", "bright lime"]),
  Caipirinha: spec("Caipirinha", [I("60 ml", "Cachaça"), I("1", "Fresh lime", "cut into wedges"), I("2 tsp", "Cane sugar")], "Double old fashioned", "Crushed ice", "Muddle · churn", "Lime wedge", ["青柠与糖轻压出汁，不碾碎白瓤。", "加入 cachaça 与碎冰，充分翻拌。"], ["cachaça", "rustic lime", "cane"]),
  "Piña Colada": spec("Piña Colada", [I("50 ml", "White rum"), I("30 ml", "Coconut cream"), I("50 ml", "Fresh pineapple juice"), I("10 ml", "Fresh lime juice")], "Hurricane", "Crushed ice", "Flash blend", "Pineapple leaf", ["材料与碎冰快速搅打至均匀。", "倒入预冷杯并补碎冰。"], ["creamy", "fresh pineapple", "tropical"]),
  "Singapore Sling": spec("Singapore Sling", [I("30 ml", "Gin"), I("15 ml", "Cherry liqueur"), I("7.5 ml", "Bénédictine"), I("7.5 ml", "Cointreau"), I("15 ml", "Lime juice"), I("60 ml", "Pineapple juice"), I("10 ml", "Grenadine")], "Highball", "Fresh cubes", "Shake · rocks", "Pineapple and cherry", ["全部材料加冰摇和。", "滤至新冰，整洁装饰。"], ["layered tropical", "cherry", "bright"]),
  "Gin Basil Smash": spec("Gin Basil Smash", [I("60 ml", "Gin"), I("25 ml", "Fresh lemon juice"), I("15 ml", "Simple syrup"), I("10", "Basil leaves")], "Rocks", "Fresh cubes", "Shake · fine strain", "Basil sprig", ["轻压 basil 后加入其余材料与冰强摇。", "双重过滤至新冰。"], ["fresh basil", "green", "bright"]),
  "Hugo Spritz": spec("Hugo Spritz", [I("20 ml", "Elderflower liqueur"), I("90 ml", "Brut sparkling wine"), I("30 ml", "Soda water"), I("6", "Mint leaves")], "Wine glass", "Large cubes", "Build · gentle lift", "Mint and lime wheel", ["杯中加满冰与 elderflower。", "补起泡酒与苏打，轻提一次。"], ["low ABV", "elderflower", "fine bubbles"]),
};

export function getProfessionalSpec(classic: string): ProfessionalSpec {
  return professionalSpecs[classic] ?? professionalSpecs.Manhattan;
}

export function buildBartenderBrief(specification: ProfessionalSpec, selectedKeywords: string[]) {
  const ingredients = specification.ingredients.map((item) => `${item.amount} ${item.item}${item.note ? ` (${item.note})` : ""}`).join("；");
  return [
    `基底：${specification.classic}｜标准：${specification.standard}`,
    `配方：${ingredients}`,
    `杯型/冰：${specification.glassware}｜${specification.ice}`,
    `技法：${specification.technique}。${specification.steps.join("")}`,
    `装饰：${specification.garnish}｜目标：${specification.target}`,
    `沟通关键词：${selectedKeywords.join(" / ")}`,
  ].join("\n");
}
