import { barTextZh, cocktailNameZh } from "./bar-localization.ts";
import type { MenuDrink } from "./menu-ai.ts";

export type ArtworkPairing = {
  id: string;
  title: string;
  originalTitle: string;
  artist: string;
  period: string;
  palette: string;
  imageUrl: string;
  sourceUrl: string;
  note: string;
};

export type ArtFlightDrink = MenuDrink & {
  act: string;
  artwork: ArtworkPairing;
  actionLabel: string;
  serviceScript: string;
};

const artworks: ArtworkPairing[] = [
  {
    id: "great-wave",
    title: "神奈川冲浪里",
    originalTitle: "The Great Wave off Kanagawa",
    artist: "葛饰北斋",
    period: "江户时代 · 浮世绘 · 约 1831",
    palette: "普鲁士蓝、浪白、纸本米色",
    imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Tsunami%20by%20hokusai%2019th%20century.jpg?width=1600",
    sourceUrl: "https://en.wikipedia.org/wiki/The_Great_Wave_off_Kanagawa",
    note: "浪峰像刀锋一样收紧，远处富士山却保持静默，适合开场时唤醒感官。",
  },
  {
    id: "pearl-earring",
    title: "戴珍珠耳环的少女",
    originalTitle: "Girl with a Pearl Earring",
    artist: "约翰内斯·维米尔",
    period: "荷兰黄金时代 · 约 1665",
    palette: "乌黑、青蓝、珍珠白",
    imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/1665%20Girl%20with%20a%20Pearl%20Earring.jpg?width=1400",
    sourceUrl: "https://en.wikipedia.org/wiki/Girl_with_a_Pearl_Earring",
    note: "一束光落在回眸与珍珠上，安静却有张力，适合中段放慢谈话。",
  },
  {
    id: "water-lilies",
    title: "睡莲",
    originalTitle: "Water Lilies",
    artist: "克洛德·莫奈",
    period: "印象派晚期 · 1919",
    palette: "暮紫、水绿、莲粉",
    imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/WLA%20metmuseum%20Water%20Lilies%20by%20Claude%20Monet.jpg?width=1800",
    sourceUrl: "https://en.wikipedia.org/wiki/Water_Lilies_(1919)",
    note: "水面把夕光揉成色块，边界不再锋利，适合收尾时留下柔和余韵。",
  },
  {
    id: "paris-rain",
    title: "巴黎街道，雨天",
    originalTitle: "Paris Street; Rainy Day",
    artist: "古斯塔夫·卡耶博特",
    period: "印象派与现代都市 · 1877",
    palette: "雨灰、黑伞、石板蓝",
    imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Gustave%20Caillebotte%20-%20Paris%20Street%3B%20Rainy%20Day%20-%20Google%20Art%20Project.jpg?width=1800",
    sourceUrl: "https://en.wikipedia.org/wiki/Paris_Street%3B_Rainy_Day",
    note: "雨伞、街角与透视线把城市整理得冷静克制，适合需要结构感的夜晚。",
  },
  {
    id: "primavera",
    title: "春",
    originalTitle: "Primavera",
    artist: "桑德罗·波提切利",
    period: "意大利文艺复兴 · 约 1480",
    palette: "月桂绿、花瓣白、古典金",
    imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Sandro%20Botticelli%20-%20La%20Primavera%20-%20Google%20Art%20Project.jpg?width=1800",
    sourceUrl: "https://en.wikipedia.org/wiki/Primavera_(Botticelli)",
    note: "花园、神话与节奏感让画面像一场低声庆典，适合浪漫而明亮的中场。",
  },
  {
    id: "the-kiss",
    title: "吻",
    originalTitle: "The Kiss",
    artist: "古斯塔夫·克里姆特",
    period: "维也纳分离派 · 1907-1908",
    palette: "金箔、黑纹、花毯绿",
    imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/The%20Kiss%20-%20Gustav%20Klimt%20-%20Google%20Cultural%20Institute.jpg?width=1600",
    sourceUrl: "https://en.wikipedia.org/wiki/The_Kiss_(Klimt)",
    note: "金色装饰吞没背景，只留下亲密姿态，适合把夜晚推向更华丽的高潮。",
  },
];

const flightSets: Array<{ title: string; drinks: MenuDrink[] }> = [
  {
    title: "蓝色序厅",
    drinks: [
      {
        name: "浪冠序饮",
        concept: "以金酒、菲诺雪莉与海盐柚子打开味觉，清冷、明亮，适合作为第一杯唤醒感官。",
        basedOn: "Martini Highball",
        ingredients: [{ amount: "35 ml", item: "伦敦干金酒" }, { amount: "15 ml", item: "菲诺雪莉" }, { amount: "20 ml", item: "鲜榨西柚汁" }, { amount: "10 ml", item: "海盐柚子糖浆" }, { amount: "60 ml", item: "干型起泡水" }],
        steps: ["前四项加冰摇和 8 秒。", "滤入装有透明长条冰的高球杯，补起泡水，轻提一次。"],
        glassware: "Highball",
        ice: "Clear ice spear",
        garnish: "西柚皮与海盐雾",
        strength: "Medium",
        keywords: ["crisp", "sparkling", "citrus"],
      },
      {
        name: "月白凝望",
        concept: "伏特加与茉莉梨 cordial 做成柔亮酸酒，细密泡沫让中段更有亲密感。",
        basedOn: "White Lady",
        ingredients: [{ amount: "40 ml", item: "伏特加" }, { amount: "18 ml", item: "鲜榨柠檬汁" }, { amount: "18 ml", item: "茉莉梨糖浆" }, { amount: "15 ml", item: "接骨木花利口酒" }, { amount: "20 ml", item: "鹰嘴豆水" }],
        steps: ["无冰干摇 10 秒。", "加密实摇和冰强力摇和，双重过滤至预冷浅碟杯。"],
        glassware: "Coupe",
        ice: "No service ice",
        garnish: "柠檬卷与白色可食用花",
        strength: "Medium",
        keywords: ["floral", "silky", "sour"],
      },
      {
        name: "暮水回声",
        concept: "干味美思、竹叶茶与未熟葡萄汁做成低酒精收尾，干净、轻盈、有余韵。",
        basedOn: "Bamboo",
        ingredients: [{ amount: "40 ml", item: "干味美思" }, { amount: "25 ml", item: "竹叶冷萃茶" }, { amount: "15 ml", item: "未熟葡萄汁" }, { amount: "2 dash", item: "橙味苦精" }, { amount: "45 ml", item: "苏打水" }],
        steps: ["除苏打外加冰搅拌 16 秒。", "滤入冰镇葡萄酒杯，补苏打水。"],
        glassware: "Wine glass",
        ice: "Clear cubes",
        garnish: "黄瓜薄片与竹叶",
        strength: "Low",
        keywords: ["low ABV", "dry", "tea"],
      },
    ],
  },
  {
    title: "金色剧场",
    drinks: [
      {
        name: "金箔开幕",
        concept: "香槟、干邑与少量杏桃让开场有庆典感，但甜度保持克制。",
        basedOn: "Champagne Cocktail",
        ingredients: [{ amount: "20 ml", item: "干邑" }, { amount: "10 ml", item: "杏桃利口酒" }, { amount: "2 dash", item: "芳香苦精" }, { amount: "90 ml", item: "干型香槟" }],
        steps: ["前三项入冰镇笛形杯。", "缓慢补香槟，轻搅一次。"],
        glassware: "Flute",
        ice: "No ice",
        garnish: "柠檬卷与金箔",
        strength: "Medium",
        keywords: ["sparkling", "celebration", "bright"],
      },
      {
        name: "花园中段",
        concept: "罗勒、白朗姆和青柠形成绿意中场，像在花园里把情绪重新拉亮。",
        basedOn: "Gin Basil Smash",
        ingredients: [{ amount: "45 ml", item: "白朗姆" }, { amount: "22.5 ml", item: "鲜榨青柠汁" }, { amount: "15 ml", item: "罗勒糖浆" }, { amount: "6 片", item: "罗勒叶" }],
        steps: ["罗勒轻拍后与其他材料加冰摇和。", "双重过滤至预冷浅碟杯。"],
        glassware: "Coupe",
        ice: "No service ice",
        garnish: "罗勒枝与青柠油",
        strength: "Medium",
        keywords: ["herbal", "bright", "sour"],
      },
      {
        name: "琥珀吻别",
        concept: "波本、阿蒙蒂亚雪莉和可可苦精收尾，温暖、有木质感，适合慢慢喝完。",
        basedOn: "Manhattan",
        ingredients: [{ amount: "45 ml", item: "波本威士忌" }, { amount: "20 ml", item: "阿蒙蒂亚雪莉" }, { amount: "10 ml", item: "甜味美思" }, { amount: "2 dash", item: "可可苦精" }],
        steps: ["全部材料加满硬冰搅拌 24 秒。", "滤入预冷尼克与诺拉杯。"],
        glassware: "Nick & Nora",
        ice: "No service ice",
        garnish: "橙皮与白兰地渍樱桃",
        strength: "Strong",
        keywords: ["spirit-forward", "amber", "dry"],
      },
    ],
  },
  {
    title: "雨街电影",
    drinks: [
      {
        name: "黑伞序曲",
        concept: "黑麦、冷萃咖啡与樱桃从第一杯就给出城市夜雨的轮廓。",
        basedOn: "Coffee Manhattan",
        ingredients: [{ amount: "40 ml", item: "黑麦威士忌" }, { amount: "20 ml", item: "咖啡浸渍甜味美思" }, { amount: "7.5 ml", item: "樱桃利口酒" }, { amount: "2 dash", item: "芳香苦精" }],
        steps: ["全部材料加冰搅拌 22 秒。", "滤入预冷鸡尾酒杯。"],
        glassware: "Chilled cocktail glass",
        ice: "No service ice",
        garnish: "樱桃与橙皮",
        strength: "Strong",
        keywords: ["spirit-forward", "coffee", "urban"],
      },
      {
        name: "雨窗玫瑰",
        concept: "金酒、覆盆子与玫瑰水组成丝滑中段，酸甜更轻，香气更细。",
        basedOn: "Clover Club",
        ingredients: [{ amount: "40 ml", item: "伦敦干金酒" }, { amount: "20 ml", item: "鲜榨柠檬汁" }, { amount: "15 ml", item: "覆盆子玫瑰糖浆" }, { amount: "20 ml", item: "蛋白或鹰嘴豆水" }],
        steps: ["无冰干摇后加冰摇和。", "双重过滤至预冷浅碟杯。"],
        glassware: "Coupe",
        ice: "No service ice",
        garnish: "玫瑰花瓣与三滴苦精",
        strength: "Medium",
        keywords: ["silky", "floral", "sour"],
      },
      {
        name: "街灯余温",
        concept: "阿佩罗、干味美思与橙花苏打做成低酒精苦甜收尾，明亮但不喧哗。",
        basedOn: "Low ABV Spritz",
        ingredients: [{ amount: "35 ml", item: "阿佩罗" }, { amount: "25 ml", item: "干味美思" }, { amount: "10 ml", item: "橙花蜂蜜" }, { amount: "80 ml", item: "苏打水" }],
        steps: ["杯中加冰依次倒入前三项。", "补苏打水，轻提一次。"],
        glassware: "Wine glass",
        ice: "Clear cubes",
        garnish: "橙片与迷迭香",
        strength: "Low",
        keywords: ["low ABV", "bittersweet", "sparkling"],
      },
    ],
  },
  {
    title: "烟与海盐",
    drinks: [
      {
        name: "盐岸醒神",
        concept: "龙舌兰、青柠和海盐泡沫让开场锋利清醒，带一点海风。",
        basedOn: "Tommy's Margarita",
        ingredients: [{ amount: "45 ml", item: "银龙舌兰" }, { amount: "22.5 ml", item: "鲜榨青柠汁" }, { amount: "15 ml", item: "龙舌兰糖浆" }, { amount: "3 dash", item: "海盐溶液" }],
        steps: ["全部材料加冰摇和。", "双重过滤至预冷古典杯的大冰上。"],
        glassware: "Old fashioned",
        ice: "Large clear cube",
        garnish: "青柠轮与盐雾",
        strength: "Medium",
        keywords: ["citrus", "mineral", "bright"],
      },
      {
        name: "烟紫中庭",
        concept: "梅斯卡尔、紫罗兰与葡萄柚让中段从烟熏转向花香，非常有记忆点。",
        basedOn: "Mezcal Paloma",
        ingredients: [{ amount: "40 ml", item: "梅斯卡尔" }, { amount: "15 ml", item: "紫罗兰利口酒" }, { amount: "25 ml", item: "鲜榨西柚汁" }, { amount: "10 ml", item: "鲜榨青柠汁" }, { amount: "45 ml", item: "西柚苏打" }],
        steps: ["前四项加冰摇和。", "滤入高球杯，补西柚苏打。"],
        glassware: "Highball",
        ice: "Clear ice spear",
        garnish: "西柚皮与紫罗兰糖",
        strength: "Medium",
        keywords: ["smoky", "floral", "high carbonation"],
      },
      {
        name: "炉火终章",
        concept: "艾雷岛威士忌只用少量点烟，配蜂蜜姜与柠檬，收尾温暖但不厚重。",
        basedOn: "Penicillin",
        ingredients: [{ amount: "35 ml", item: "调和苏格兰威士忌" }, { amount: "7.5 ml", item: "艾雷岛威士忌" }, { amount: "20 ml", item: "蜂蜜姜糖浆" }, { amount: "20 ml", item: "鲜榨柠檬汁" }],
        steps: ["全部材料加冰摇和。", "滤入装有大冰的古典杯。"],
        glassware: "Rocks",
        ice: "Large clear cube",
        garnish: "糖渍姜与柠檬皮",
        strength: "Strong",
        keywords: ["smoky", "ginger", "round"],
      },
    ],
  },
  {
    title: "热带夜航",
    drinks: [
      {
        name: "菠萝晨星",
        concept: "朗姆、菠萝和香料从一开始就有热带感，但酸度把甜度收住。",
        basedOn: "Jungle Bird",
        ingredients: [{ amount: "40 ml", item: "陈年牙买加朗姆" }, { amount: "25 ml", item: "鲜榨菠萝汁" }, { amount: "15 ml", item: "金巴利" }, { amount: "15 ml", item: "鲜榨青柠汁" }, { amount: "10 ml", item: "德梅拉拉糖浆" }],
        steps: ["全部材料加冰摇和。", "滤入装有碎冰的古典杯。"],
        glassware: "Rocks",
        ice: "Crushed ice",
        garnish: "菠萝叶与青柠轮",
        strength: "Medium",
        keywords: ["tropical", "bittersweet", "bright"],
      },
      {
        name: "椰月中段",
        concept: "椰浆、白朗姆和菲诺雪莉让中段有奶油感，但仍保持干净。",
        basedOn: "Piña Colada",
        ingredients: [{ amount: "35 ml", item: "白朗姆" }, { amount: "15 ml", item: "菲诺雪莉" }, { amount: "30 ml", item: "椰浆" }, { amount: "25 ml", item: "菠萝汁" }, { amount: "15 ml", item: "鲜榨青柠汁" }],
        steps: ["全部材料快速搅打 6 秒。", "倒入冰镇飓风杯。"],
        glassware: "Hurricane",
        ice: "Crushed ice",
        garnish: "椰片与菠萝叶",
        strength: "Medium",
        keywords: ["tropical", "creamy", "round"],
      },
      {
        name: "薄荷离港",
        concept: "低酒精莫吉托式收尾，用薄荷、青柠和起泡酒把热带夜晚拉得轻盈。",
        basedOn: "Mojito Spritz",
        ingredients: [{ amount: "25 ml", item: "白朗姆" }, { amount: "20 ml", item: "鲜榨青柠汁" }, { amount: "12.5 ml", item: "甘蔗糖浆" }, { amount: "8 片", item: "薄荷叶" }, { amount: "70 ml", item: "干型起泡酒" }],
        steps: ["薄荷轻拍后与前三项杯中调制。", "加冰，补干型起泡酒，轻提一次。"],
        glassware: "Highball",
        ice: "Fresh cubes",
        garnish: "薄荷束",
        strength: "Low",
        keywords: ["low ABV", "mint", "sparkling"],
      },
    ],
  },
  {
    title: "苦甜画室",
    drinks: [
      {
        name: "朱红第一笔",
        concept: "内格罗尼结构改成更轻的苦甜开场，橙香明显，颜色有视觉冲击。",
        basedOn: "Negroni Sbagliato",
        ingredients: [{ amount: "30 ml", item: "金巴利" }, { amount: "30 ml", item: "甜味美思" }, { amount: "60 ml", item: "干型起泡酒" }, { amount: "2 dash", item: "橙味苦精" }],
        steps: ["金巴利、甜味美思与苦精入冰杯搅拌。", "补起泡酒，轻提一次。"],
        glassware: "Wine glass",
        ice: "Clear cubes",
        garnish: "橙皮",
        strength: "Low",
        keywords: ["bittersweet", "sparkling", "orange"],
      },
      {
        name: "墨绿中场",
        concept: "绿查特、金酒、青柠与马拉斯奇诺等份构成草本中段，复杂而锋利。",
        basedOn: "Last Word",
        ingredients: [{ amount: "22.5 ml", item: "伦敦干金酒" }, { amount: "22.5 ml", item: "绿查特酒" }, { amount: "22.5 ml", item: "黑樱桃利口酒" }, { amount: "22.5 ml", item: "鲜榨青柠汁" }],
        steps: ["全部材料加冰摇和。", "双重过滤至预冷浅碟杯。"],
        glassware: "Coupe",
        ice: "No service ice",
        garnish: "黑樱桃",
        strength: "Strong",
        keywords: ["herbal", "equal parts", "sour"],
      },
      {
        name: "咖啡暗线",
        concept: "咖啡、伏特加和少量盐水收尾，像画布最后一条暗线，适合继续聊天。",
        basedOn: "Espresso Martini",
        ingredients: [{ amount: "35 ml", item: "伏特加" }, { amount: "25 ml", item: "新鲜浓缩咖啡" }, { amount: "20 ml", item: "咖啡利口酒" }, { amount: "5 ml", item: "基础糖浆" }, { amount: "2 dash", item: "盐水" }],
        steps: ["全部材料加冰强力摇和。", "双重过滤至预冷马天尼杯。"],
        glassware: "Chilled martini glass",
        ice: "No service ice",
        garnish: "三颗咖啡豆",
        strength: "Medium",
        keywords: ["coffee", "silky", "not too sweet"],
      },
    ],
  },
  {
    title: "白昼余晖",
    drinks: [
      {
        name: "杏光序饮",
        concept: "皮斯科、杏桃和柠檬做成明亮酸酒，开场像白昼最后一束光。",
        basedOn: "Pisco Sour",
        ingredients: [{ amount: "45 ml", item: "皮斯科" }, { amount: "20 ml", item: "鲜榨柠檬汁" }, { amount: "12.5 ml", item: "杏桃糖浆" }, { amount: "20 ml", item: "蛋白或鹰嘴豆水" }, { amount: "2 dash", item: "芳香苦精" }],
        steps: ["无冰干摇后加冰摇和。", "双重过滤至预冷浅碟杯。"],
        glassware: "Coupe",
        ice: "No service ice",
        garnish: "苦精点与柠檬油",
        strength: "Medium",
        keywords: ["silky", "stone fruit", "sour"],
      },
      {
        name: "茶烟中庭",
        concept: "乌龙、干邑和蜂蜜把中段做得温柔，有茶香也有木质底色。",
        basedOn: "Sidecar",
        ingredients: [{ amount: "35 ml", item: "干邑" }, { amount: "25 ml", item: "乌龙冷萃茶" }, { amount: "15 ml", item: "橙味利口酒" }, { amount: "15 ml", item: "鲜榨柠檬汁" }, { amount: "7.5 ml", item: "蜂蜜糖浆" }],
        steps: ["全部材料加冰摇和。", "双重过滤至半糖边浅碟杯。"],
        glassware: "Coupe",
        ice: "No service ice",
        garnish: "橙皮与轻糖边",
        strength: "Medium",
        keywords: ["tea", "cognac", "round"],
      },
      {
        name: "白桃晚风",
        concept: "白桃、接骨木和苏打做成低酒精收尾，香气清楚但不会压住前两杯。",
        basedOn: "Hugo Spritz",
        ingredients: [{ amount: "30 ml", item: "接骨木花利口酒" }, { amount: "25 ml", item: "白桃汁" }, { amount: "10 ml", item: "鲜榨柠檬汁" }, { amount: "80 ml", item: "苏打水" }],
        steps: ["前三项入装冰葡萄酒杯。", "补苏打水，轻提一次。"],
        glassware: "Wine glass",
        ice: "Fresh cubes",
        garnish: "白桃片与薄荷叶",
        strength: "Low",
        keywords: ["low ABV", "floral", "peach"],
      },
    ],
  },
  {
    title: "午夜图书馆",
    drinks: [
      {
        name: "纸页开场",
        concept: "纸飞机结构的开场，波本、阿佩罗与柠檬让苦甜酸三条线同时出现。",
        basedOn: "Paper Plane",
        ingredients: [{ amount: "22.5 ml", item: "波本威士忌" }, { amount: "22.5 ml", item: "阿佩罗" }, { amount: "22.5 ml", item: "阿马罗" }, { amount: "22.5 ml", item: "鲜榨柠檬汁" }],
        steps: ["全部材料加冰摇和。", "双重过滤至预冷浅碟杯。"],
        glassware: "Coupe",
        ice: "No service ice",
        garnish: "柠檬卷",
        strength: "Strong",
        keywords: ["equal parts", "bittersweet", "sour"],
      },
      {
        name: "墨香高球",
        concept: "威士忌、烤茶与姜汁啤酒组成高球中段，气泡让厚重感变轻。",
        basedOn: "Whiskey Highball",
        ingredients: [{ amount: "40 ml", item: "调和苏格兰威士忌" }, { amount: "25 ml", item: "焙茶冷萃" }, { amount: "10 ml", item: "蜂蜜姜糖浆" }, { amount: "75 ml", item: "姜汁啤酒" }],
        steps: ["前三项入高球杯加冰搅拌。", "补姜汁啤酒，轻提一次。"],
        glassware: "Highball",
        ice: "Clear ice spear",
        garnish: "柠檬皮与姜片",
        strength: "Medium",
        keywords: ["tea", "ginger", "high carbonation"],
      },
      {
        name: "晚安雪莉",
        concept: "阿多尼斯式低酒精收尾，雪莉和甜味美思带来坚果、干果与安静结尾。",
        basedOn: "Adonis",
        ingredients: [{ amount: "35 ml", item: "阿蒙蒂亚雪莉" }, { amount: "15 ml", item: "菲诺雪莉" }, { amount: "30 ml", item: "甜味美思" }, { amount: "2 dash", item: "橙味苦精" }, { amount: "2 dash", item: "盐水" }],
        steps: ["全部材料加冰搅拌 20 秒。", "滤入预冷尼克与诺拉杯。"],
        glassware: "Nick & Nora",
        ice: "No service ice",
        garnish: "橙皮",
        strength: "Low",
        keywords: ["low ABV", "nutty", "dry"],
      },
    ],
  },
];

function rotateArtworks(seed: number) {
  const start = seed % artworks.length;
  return [0, 1, 2].map((offset) => artworks[(start + offset * 2) % artworks.length]);
}

export const ART_FLIGHT_SET_COUNT = flightSets.length;

export function buildArtFlightPlan(classic: string, mood: string, seed: number): ArtFlightDrink[] {
  const menu = flightSets[seed % flightSets.length];
  const selectedArtworks = rotateArtworks(seed);
  return menu.drinks.map((drink, index) => {
    const artwork = selectedArtworks[index];
    const name = drink.name;
    const serviceScript = [
      `${name}｜第 0${index + 1} 杯`,
      `三杯主题：${menu.title} / ${mood}`,
      `今夜参考经典：${cocktailNameZh(classic)}`,
      `经典骨架：${cocktailNameZh(drink.basedOn)}`,
      `配方：${drink.ingredients.map((item) => `${item.amount} ${barTextZh(item.item)}`).join(" · ")}`,
      `制作：${drink.steps.map(barTextZh).join("")}`,
      `出杯：${barTextZh(drink.glassware)} · ${barTextZh(drink.ice)} · ${barTextZh(drink.garnish)}`,
      `名画：${artwork.title}，${artwork.artist}，${artwork.period}`,
      `审美提示：${artwork.note}`,
    ].join("\n");

    return {
      ...drink,
      name,
      artwork,
      act: ["开场", "中段", "收尾"][index],
      actionLabel: ["复制开场做法", "复制中段做法", "复制收尾做法"][index],
      serviceScript,
    };
  });
}
