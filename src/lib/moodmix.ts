export type ThemeId =
  | "golden"
  | "moon"
  | "velvet"
  | "tokyo"
  | "nordic"
  | "vienna";

export type ScoreKey =
  | "emotionDepth"
  | "socialDesire"
  | "exploration"
  | "romance"
  | "control"
  | "pressure";

export type Scores = Record<ScoreKey, number>;

export type AnswerOption = {
  id: string;
  title: string;
  note: string;
  themes?: ThemeId[];
  scores: Partial<Scores>;
};

export type Question = {
  id: string;
  chapter: "atmosphere" | "reading";
  eyebrow: string;
  prompt: string;
  options: AnswerOption[];
};

export const themes: Record<
  ThemeId,
  { name: string; subtitle: string; color: string; moodColor: string }
> = {
  golden: {
    name: "Golden Gramophone",
    subtitle: "黑胶、黄铜与理性的浪漫",
    color: "#d3a84c",
    moodColor: "Amber Gold",
  },
  moon: {
    name: "Moon Library",
    subtitle: "月光落在未读完的书页上",
    color: "#aebbd2",
    moodColor: "Lunar Silver",
  },
  velvet: {
    name: "Velvet Speakeasy",
    subtitle: "暗红帷幕后的秘密与热烈",
    color: "#c4776d",
    moodColor: "Velvet Rouge",
  },
  tokyo: {
    name: "Tokyo Neon Rain",
    subtitle: "霓虹穿过雨夜与玻璃",
    color: "#4fd1c5",
    moodColor: "Electric Teal",
  },
  nordic: {
    name: "Nordic Silence",
    subtitle: "雾、冰川与克制的留白",
    color: "#b8d5d8",
    moodColor: "Glacier Mist",
  },
  vienna: {
    name: "Vienna Café",
    subtitle: "咖啡、乐谱与温柔的旧时光",
    color: "#d8b487",
    moodColor: "Café Cream",
  },
};

export const questions: Question[] = [
  {
    id: "q1",
    chapter: "atmosphere",
    eyebrow: "01 / 一座城市",
    prompt: "如果今晚是一座城市，你会走进哪里？",
    options: [
      { id: "vienna", title: "维也纳", note: "咖啡馆与金色大厅", themes: ["vienna", "golden"], scores: { control: 10, romance: 5 } },
      { id: "paris", title: "巴黎", note: "玫瑰、画室与雨夜", themes: ["velvet", "moon"], scores: { romance: 14, emotionDepth: 6 } },
      { id: "tokyo", title: "东京", note: "霓虹、秩序与孤独", themes: ["tokyo"], scores: { control: 7, exploration: 8 } },
      { id: "reykjavik", title: "雷克雅未克", note: "冰川、极光与安静", themes: ["nordic", "moon"], scores: { pressure: -8, emotionDepth: 8 } },
    ],
  },
  {
    id: "q2",
    chapter: "atmosphere",
    eyebrow: "02 / 一种声音",
    prompt: "此刻，哪一种声音最接近你？",
    options: [
      { id: "vinyl", title: "黑胶沙沙声", note: "旧旋律仍有温度", themes: ["golden", "vienna"], scores: { emotionDepth: 8, control: 5 } },
      { id: "rain", title: "雨滴敲窗", note: "让世界退到玻璃之外", themes: ["moon", "tokyo"], scores: { emotionDepth: 12, romance: 6 } },
      { id: "jazz", title: "爵士现场", note: "每个停顿都在邀请你", themes: ["velvet", "golden"], scores: { socialDesire: 11, exploration: 6 } },
      { id: "waves", title: "海浪与风", note: "呼吸回到自然节拍", themes: ["nordic"], scores: { pressure: -10, control: -5 } },
    ],
  },
  {
    id: "q3",
    chapter: "atmosphere",
    eyebrow: "03 / 今夜速度",
    prompt: "你希望今晚以怎样的速度经过？",
    options: [
      { id: "settle", title: "慢慢沉淀", note: "让余韵比答案更久", themes: ["vienna", "golden"], scores: { emotionDepth: 10, socialDesire: -7 } },
      { id: "wander", title: "自由漫游", note: "没有路线，也无需抵达", themes: ["tokyo", "moon"], scores: { exploration: 13, control: -8 } },
      { id: "burn", title: "热烈燃烧", note: "把克制留给明天", themes: ["velvet", "tokyo"], scores: { socialDesire: 13, pressure: 7 } },
      { id: "observe", title: "安静观察", note: "站在光影的边缘", themes: ["nordic", "moon"], scores: { control: 9, socialDesire: -9 } },
    ],
  },
  {
    id: "q4",
    chapter: "atmosphere",
    eyebrow: "04 / 想带走的事物",
    prompt: "你最想从今晚带走什么？",
    options: [
      { id: "spark", title: "灵感", note: "一个尚未命名的新念头", themes: ["tokyo", "golden"], scores: { exploration: 12 } },
      { id: "company", title: "陪伴", note: "有人听见你的沉默", themes: ["velvet", "vienna"], scores: { socialDesire: 12, romance: 9 } },
      { id: "answer", title: "答案", note: "让混乱变得清晰", themes: ["moon", "nordic"], scores: { control: 13, emotionDepth: 5 } },
      { id: "courage", title: "勇气", note: "向前一步的火光", themes: ["velvet", "golden"], scores: { exploration: 9, pressure: 5 } },
    ],
  },
  {
    id: "q5",
    chapter: "reading",
    eyebrow: "05 / 最近的回声",
    prompt: "最近，你最常想起什么？",
    options: [
      { id: "person", title: "一个人", note: "名字没有说出口", scores: { romance: 15, emotionDepth: 8 } },
      { id: "place", title: "一个地方", note: "记忆替你保留了光线", scores: { exploration: 8, emotionDepth: 7 } },
      { id: "goal", title: "一个目标", note: "它仍在远处发亮", scores: { control: 14, pressure: 7 } },
      { id: "decision", title: "一个决定", note: "门已经出现，只差转动钥匙", scores: { pressure: 12, control: 7 } },
    ],
  },
  {
    id: "q6",
    chapter: "reading",
    eyebrow: "06 / 内在天气",
    prompt: "如果把最近一周变成天气？",
    options: [
      { id: "fog", title: "雾", note: "边界变得柔软", scores: { emotionDepth: 10, pressure: 6 } },
      { id: "storm", title: "暴雨", note: "所有声音同时抵达", scores: { pressure: 18, emotionDepth: 9 } },
      { id: "clear", title: "晴空", note: "轻盈而没有遮挡", scores: { socialDesire: 12, pressure: -12 } },
      { id: "snow", title: "初雪", note: "世界忽然安静", scores: { romance: 10, control: 7, pressure: -4 } },
    ],
  },
  {
    id: "q7",
    chapter: "reading",
    eyebrow: "07 / 此刻状态",
    prompt: "现在，哪个词离你最近？",
    options: [
      { id: "drifting", title: "漂流", note: "允许水流暂时决定方向", scores: { control: -13, exploration: 7 } },
      { id: "waiting", title: "等待", note: "在门前听一会儿风", scores: { pressure: 8, emotionDepth: 9 } },
      { id: "departing", title: "出发", note: "行李比昨天更轻", scores: { exploration: 16, socialDesire: 5 } },
      { id: "returning", title: "回归", note: "重新认出自己的房间", scores: { control: 10, pressure: -7 } },
    ],
  },
  {
    id: "q8",
    chapter: "reading",
    eyebrow: "08 / 第一眼",
    prompt: "走进一家酒吧，你最先注意什么？",
    options: [
      { id: "light", title: "灯光", note: "颜色先于语言抵达", scores: { romance: 10, emotionDepth: 5 } },
      { id: "music", title: "音乐", note: "今晚需要一条隐形线索", scores: { exploration: 7, romance: 6 } },
      { id: "crowd", title: "人群", note: "房间里的能量正在流动", scores: { socialDesire: 17 } },
      { id: "bar", title: "酒杯与吧台", note: "细节决定信任", scores: { control: 15, exploration: 4 } },
    ],
  },
];

export const archetypes = [
  { id: "moon-collector", name: "Moon Collector", cn: "月光收藏家", note: "敏感、内省、善于保存细微的光", bases: ["Black Manhattan", "Espresso Martini", "Toronto"] },
  { id: "velvet-dreamer", name: "Velvet Dreamer", cn: "天鹅绒梦想家", note: "浪漫、艺术，让柔软成为力量", bases: ["Aviation", "Clover Club", "Bee's Knees"] },
  { id: "silent-composer", name: "Silent Composer", cn: "沉默作曲家", note: "克制、优雅，在秩序中安排情绪", bases: ["Manhattan", "Dry Martini", "Bamboo"] },
  { id: "golden-wanderer", name: "Golden Wanderer", cn: "黄金漫游者", note: "自由、新鲜，愿意为好奇心绕远路", bases: ["Mai Tai", "Margarita", "Caipirinha"] },
  { id: "midnight-philosopher", name: "Midnight Philosopher", cn: "午夜哲学家", note: "深度、理性，总能看见问题的背面", bases: ["Boulevardier", "Negroni", "Trinidad Sour"] },
  { id: "burning-rebel", name: "Burning Rebel", cn: "燃烧反叛者", note: "热烈、戏剧性，不为掌声修改自己", bases: ["Mezcal Margarita", "Jungle Bird", "Naked and Famous"] },
  { id: "lost-navigator", name: "Lost Navigator", cn: "迷途领航员", note: "即使暂时迷雾，也仍然向前", bases: ["Penicillin", "Whiskey Sour", "El Diablo"] },
  { id: "cafe-poet", name: "Café Poet", cn: "咖啡馆诗人", note: "用文字、咖啡和雨天收纳世界", bases: ["Espresso Martini", "Coffee Negroni", "Rusty Nail"] },
  { id: "neon-observer", name: "Neon Observer", cn: "霓虹观察者", note: "都市、冷静，与喧闹保持一寸距离", bases: ["Gimlet", "Dry Martini", "Southside"] },
  { id: "rose-strategist", name: "Rose Strategist", cn: "玫瑰战略家", note: "外柔内强，魅力与判断从不冲突", bases: ["French 75", "Vieux Carré", "Brandy Crusta"] },
  { id: "sea-listener", name: "Sea Listener", cn: "海岸倾听者", note: "温和、舒展，能给他人留下空间", bases: ["Daiquiri", "Mojito", "Paloma"] },
  { id: "glass-alchemist", name: "Glass Alchemist", cn: "玻璃炼金术师", note: "实验、奇想，习惯重写旧规则", bases: ["Last Word", "Paper Plane", "Corpse Reviver No. 2"] },
  { id: "amber-guardian", name: "Amber Guardian", cn: "琥珀守护者", note: "可靠、成熟，是房间里稳定的火光", bases: ["Old Fashioned", "Sazerac", "Adonis"] },
  { id: "rain-romantic", name: "Rain Romantic", cn: "雨夜浪漫者", note: "感性、念旧，相信关系留下的回声", bases: ["Sidecar", "French 75", "Pisco Sour"] },
  { id: "snow-minimalist", name: "Snow Minimalist", cn: "雪地极简者", note: "清醒、自持，知道什么可以舍去", bases: ["Dry Martini", "Low ABV Spritz", "Hugo Spritz"] },
  { id: "stage-charmer", name: "Stage Charmer", cn: "舞台魅力者", note: "闪耀、慷慨，擅长点亮共同的夜晚", bases: ["Champagne Cocktail", "Cosmopolitan", "Singapore Sling"] },
] as const;

export const cocktails = [
  ["Manhattan", "Rye whiskey · sweet vermouth · aromatic bitters", "Stir with ice, strain into a chilled coupe, garnish with cherry."],
  ["Black Manhattan", "Rye whiskey · amaro · aromatic bitters", "Stir with ice, strain into a chilled coupe, garnish with orange peel."],
  ["Negroni", "Gin · sweet vermouth · Campari", "Stir over ice, strain over a large cube, garnish with orange peel."],
  ["Boulevardier", "Bourbon · sweet vermouth · Campari", "Stir with ice, strain over a large cube, garnish with orange peel."],
  ["Old Fashioned", "Bourbon · demerara · aromatic bitters", "Stir over a large cube, express an orange peel."],
  ["Sazerac", "Rye · demerara · Peychaud's · absinthe rinse", "Stir and strain into an absinthe-rinsed chilled glass; lemon peel."],
  ["Dry Martini", "London dry gin · dry vermouth · orange bitters", "Stir until cold, strain into a chilled coupe, garnish with lemon twist."],
  ["Gimlet", "Gin · fresh lime · simple syrup", "Shake with ice, fine strain into a chilled coupe, garnish with lime."],
  ["Daiquiri", "White rum · fresh lime · cane syrup", "Shake hard with ice, fine strain into a chilled coupe."],
  ["Mojito", "White rum · lime · mint · cane sugar · soda", "Build over crushed ice, churn gently, crown with soda and mint."],
  ["French 75", "Gin · lemon · sugar · sparkling wine", "Shake the first three, strain into a flute, top with sparkling wine."],
  ["Aviation", "Gin · maraschino · lemon · crème de violette", "Shake with ice, fine strain into a chilled coupe, garnish with cherry."],
  ["Clover Club", "Gin · raspberry · lemon · egg white", "Dry shake, shake with ice, fine strain into a coupe."],
  ["Mai Tai", "Aged rum · lime · orange curaçao · orgeat", "Shake with ice, pour over crushed ice, garnish with mint."],
  ["Margarita", "Blanco tequila · orange liqueur · lime · agave", "Shake with ice, strain over fresh ice, garnish with lime."],
  ["Mezcal Margarita", "Mezcal · orange liqueur · lime · agave", "Shake with ice, strain over fresh ice, garnish with grapefruit peel."],
  ["Jungle Bird", "Dark rum · Campari · pineapple · lime · sugar", "Shake with ice, strain over fresh ice, garnish with pineapple leaf."],
  ["Penicillin", "Blended Scotch · lemon · honey-ginger · smoky Scotch", "Shake the first three over ice, strain, float smoky Scotch."],
  ["Whiskey Sour", "Bourbon · lemon · sugar · egg white", "Dry shake, shake with ice, strain over fresh ice, add bitters."],
  ["Espresso Martini", "Vodka · espresso · coffee liqueur · syrup", "Shake hard with ice, fine strain into a chilled coupe."],
  ["Coffee Negroni", "Gin · coffee-infused vermouth · Campari", "Stir with ice, strain over a large cube, garnish with orange."],
  ["Vieux Carré", "Rye · Cognac · sweet vermouth · Bénédictine · bitters", "Stir with ice, strain over a large cube, garnish with lemon peel."],
  ["Last Word", "Gin · green Chartreuse · maraschino · lime", "Shake with ice, fine strain into a chilled coupe."],
  ["Paper Plane", "Bourbon · Aperol · amaro · lemon", "Shake with ice, fine strain into a chilled coupe."],
  ["Sidecar", "Cognac · orange liqueur · lemon", "Shake with ice, fine strain into a chilled coupe, garnish with orange."],
  ["Low ABV Spritz", "Dry vermouth · elderflower · verjus · soda", "Build over ice, top with soda, garnish with cucumber ribbon."],
  ["Champagne Cocktail", "Cognac · bitters-soaked sugar · sparkling wine", "Build in a flute, top slowly with sparkling wine, lemon twist."],
  ["Cosmopolitan", "Citrus vodka · orange liqueur · cranberry · lime", "Shake with ice, fine strain into a chilled coupe, orange peel."],
  ["Tommy's Margarita", "Blanco tequila · fresh lime · agave", "Shake with ice, strain over fresh ice, garnish with lime."],
  ["Americano", "Campari · sweet vermouth · soda", "Build over ice, top with soda, garnish with orange half-wheel."],
  ["Bamboo", "Fino sherry · dry vermouth · orange bitters · aromatic bitters", "Stir with ice, strain into a chilled coupe, garnish with lemon twist."],
  ["Adonis", "Fino sherry · sweet vermouth · orange bitters", "Stir with ice, strain into a chilled coupe, garnish with orange peel."],
  ["Corpse Reviver No. 2", "Gin · Cointreau · Lillet Blanc · lemon · absinthe", "Shake with ice, fine strain into an absinthe-rinsed chilled coupe."],
  ["Bee's Knees", "Gin · fresh lemon · honey syrup", "Shake with ice, fine strain into a chilled coupe, garnish with lemon twist."],
  ["Southside", "Gin · fresh lime · mint · sugar", "Shake with ice, fine strain into a chilled coupe, garnish with mint."],
  ["Paloma", "Blanco tequila · grapefruit · lime · agave · soda", "Build over ice, top with grapefruit soda, garnish with grapefruit."],
  ["El Diablo", "Reposado tequila · crème de cassis · lime · ginger beer", "Shake first three, strain over ice, top with ginger beer."],
  ["Naked and Famous", "Mezcal · Yellow Chartreuse · Aperol · lime", "Shake with ice, fine strain into a chilled coupe."],
  ["Trinidad Sour", "Angostura bitters · rye · orgeat · lemon", "Shake with ice, fine strain into a chilled coupe."],
  ["Toronto", "Rye whiskey · Fernet-Branca · demerara · aromatic bitters", "Stir with ice, strain into a chilled coupe, garnish with orange peel."],
  ["Rusty Nail", "Scotch whisky · Drambuie", "Stir over a large cube, garnish with lemon peel."],
  ["Brandy Crusta", "Cognac · curaçao · maraschino · lemon · bitters", "Shake with ice, strain into a sugar-rimmed coupe with long lemon peel."],
  ["Pisco Sour", "Pisco · lime · sugar · egg white · bitters", "Dry shake, shake with ice, fine strain, finish with bitters."],
  ["Caipirinha", "Cachaça · fresh lime · cane sugar", "Muddle lime with sugar, churn with crushed ice and cachaça."],
  ["Piña Colada", "White rum · coconut cream · pineapple · lime", "Flash blend with crushed ice, pour into a chilled hurricane glass."],
  ["Singapore Sling", "Gin · cherry liqueur · Bénédictine · citrus · pineapple · soda", "Shake with ice, strain into a highball, top with soda."],
  ["Gin Basil Smash", "Gin · fresh lemon · basil · sugar", "Shake hard with ice, fine strain over fresh ice, garnish with basil."],
  ["Hugo Spritz", "Elderflower · sparkling wine · soda · mint · lime", "Build over ice, gently lift once, garnish with mint and lime."],
] as const;

export const symbols = [
  ["Moon", "月亮", "直觉正在替你辨认方向", ["moon", "vienna"]],
  ["Key", "钥匙", "机会已经来到门前", ["velvet", "golden"]],
  ["Deer", "鹿", "温柔并不妨碍你继续生长", ["moon", "nordic"]],
  ["Gramophone", "留声机", "旧旋律里藏着新的答案", ["golden", "vienna"]],
  ["Rose", "玫瑰", "关系需要勇气，也需要边界", ["velvet", "vienna"]],
  ["Lighthouse", "灯塔", "等待也可以是一种方向", ["nordic", "moon"]],
  ["Raven", "乌鸦", "变化会带来更清醒的视野", ["tokyo", "velvet"]],
  ["Train", "火车", "旅程已经在你决定之前开始", ["vienna", "tokyo"]],
  ["Compass", "罗盘", "你比想象中更信任自己的判断", ["golden", "nordic"]],
  ["Star", "星辰", "微小的光足以校准长夜", ["moon", "tokyo"]],
  ["Flame", "火焰", "真正的渴望不需要解释", ["velvet", "golden"]],
  ["Wave", "潮汐", "顺势不是放弃选择", ["nordic", "tokyo"]],
  ["Mountain", "山", "稳定来自一次次小的抵达", ["nordic", "golden"]],
  ["Shell", "贝壳", "倾听会让隐藏的声音出现", ["nordic", "moon"]],
  ["Crown", "王冠", "请为自己的决定保留尊严", ["velvet", "golden"]],
  ["Feather", "羽毛", "轻盈也可以拥有力量", ["vienna", "moon"]],
  ["Hourglass", "沙漏", "有些答案只接受时间的邀请", ["vienna", "golden"]],
  ["Mirror", "镜子", "你正在看见更诚实的自己", ["tokyo", "velvet"]],
  ["Lantern", "提灯", "下一步只需要照亮一步", ["golden", "nordic"]],
  ["Comet", "彗星", "短暂的勇气也会留下轨迹", ["tokyo", "moon"]],
] as const;

const clamp = (value: number) => Math.max(0, Math.min(100, value));

function hashAnswers(answers: Record<string, string>) {
  return Object.values(answers)
    .join("")
    .split("")
    .reduce((total, char) => total + char.charCodeAt(0), 0);
}

export function calculateScores(answers: Record<string, string>): Scores {
  const scores: Scores = {
    emotionDepth: 50,
    socialDesire: 50,
    exploration: 50,
    romance: 50,
    control: 50,
    pressure: 50,
  };

  questions.forEach((question) => {
    const option = question.options.find((item) => item.id === answers[question.id]);
    if (!option) return;
    Object.entries(option.scores).forEach(([key, value]) => {
      scores[key as ScoreKey] = clamp(scores[key as ScoreKey] + (value ?? 0));
    });
  });
  return scores;
}

export function chooseTheme(answers: Record<string, string>): ThemeId {
  const votes = Object.fromEntries(Object.keys(themes).map((key) => [key, 0])) as Record<ThemeId, number>;
  questions.slice(0, 4).forEach((question) => {
    const option = question.options.find((item) => item.id === answers[question.id]);
    option?.themes?.forEach((themeId, index) => {
      votes[themeId] += index === 0 ? 2 : 1;
    });
  });
  return (Object.entries(votes) as [ThemeId, number][]).sort((a, b) => b[1] - a[1])[0][0];
}

function chooseArchetype(scores: Scores, theme: ThemeId, seed: number) {
  if (scores.socialDesire >= 72) return archetypes[15];
  if (scores.exploration >= 74) return seed % 2 ? archetypes[3] : archetypes[11];
  if (scores.pressure >= 72) {
    if (scores.control >= 65) return archetypes[14];
    if (scores.romance >= 65) return archetypes[7];
    return archetypes[6];
  }
  if (scores.emotionDepth >= 72) return scores.control >= 64 ? archetypes[4] : archetypes[0];
  if (scores.romance >= 72) return seed % 2 ? archetypes[1] : archetypes[13];
  if (scores.control >= 73) return seed % 3 === 0 ? archetypes[9] : seed % 2 ? archetypes[2] : archetypes[12];
  const themed = { golden: 2, moon: 0, velvet: 5, tokyo: 8, nordic: 10, vienna: 7 } as const;
  return archetypes[themed[theme]];
}

export type MoodResult = ReturnType<typeof createResult>;

export function createResult(answers: Record<string, string>, mbti?: string) {
  const seed = hashAnswers(answers) + (mbti ? mbti.charCodeAt(0) : 0);
  const scores = calculateScores(answers);
  const theme = chooseTheme(answers);
  const archetype = chooseArchetype(scores, theme, seed);
  const base = archetype.bases[seed % archetype.bases.length];
  const cocktail = cocktails.find((item) => item[0] === base) ?? cocktails[0];
  const eligible = symbols.filter((symbol) => (symbol[3] as readonly string[]).includes(theme));
  const coffeeSymbols = [0, 1, 2].map((offset) => eligible[(seed + offset) % eligible.length]);
  const namePrefix = ["夜曲", "天鹅绒", "隐秘", "琥珀", "月光", "余晖"][seed % 6];
  const nameSuffix = ["钥匙", "罗盘", "仪式", `第 ${((seed % 8) + 1).toString()} 夜`, "回声", "暗号"][(seed >> 2) % 6];
  const strength = scores.pressure > 72 ? "Low" : scores.control > 70 || scores.emotionDepth > 72 ? "Strong" : "Medium";
  const modifications = scores.pressure > 70
    ? "以冷萃茶和少量蜂蜜降低刺激，让尾韵更柔和"
    : scores.romance > 68
      ? "加入少量玫瑰与红莓，把香气推向更明亮的层次"
      : scores.exploration > 68
        ? "加入烘烤香料与一滴盐水，扩展经典结构的边界"
        : "加入冷萃咖啡与黑樱桃苦精，让夜色更深但仍然清晰";
  const reading = `${coffeeSymbols[0][1]}提醒你相信直觉，${coffeeSymbols[1][1]}指向正在发生的变化，而${coffeeSymbols[2][1]}把注意力带回下一步。今晚无需急着证明什么，先让真正重要的声音被你听见。`;
  const story = `这杯酒保留 ${cocktail[0]} 的经典骨架，${modifications}。它属于${archetype.cn}：不追逐喧闹的答案，只在光线变暗之后，让判断、渴望与一点勇气慢慢显形。`;

  return {
    seed,
    scores,
    theme,
    archetype,
    coffeeSymbols,
    cocktail: {
      name: `${namePrefix}·${nameSuffix}`,
      basedOn: cocktail[0],
      ingredients: cocktail[1],
      method: cocktail[2],
      strength,
      modification: modifications,
      garnish: scores.romance > 68 ? "Rose petal & lemon oil" : "Expressed orange peel",
      bartenderNote: "保持经典比例与稀释度，改造风味只作为一层克制的尾韵。",
      story,
    },
    reading,
    music: theme === "tokyo" ? "氛围电子 · 都市流行" : theme === "velvet" ? "暗夜爵士 · 慢板铜管" : "德彪西 · 黑色爵士 · 深夜钢琴",
    message: scores.pressure > 68
      ? "你并不缺少方向。你只是需要一个更安静的夜晚，听见自己真正的判断。"
      : "今晚不必成为答案。让它成为你重新认出自己的那束光。",
  };
}
