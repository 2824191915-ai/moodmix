import { barTextZh, cocktailNameZh } from "./bar-localization.ts";
import { fallbackMenu, type MenuDrink } from "./menu-ai.ts";

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

const poeticNames = [
  ["浪冠序饮", "珍珠微光", "睡莲尾声"],
  ["雨街开场", "春园花信", "金箔终章"],
  ["浮世蓝调", "月白凝望", "暮水回声"],
  ["黑伞序曲", "花园中段", "琥珀吻别"],
];

function rotateArtworks(seed: number) {
  const start = seed % artworks.length;
  return [0, 1, 2].map((offset) => artworks[(start + offset * 2) % artworks.length]);
}

export function buildArtFlightPlan(classic: string, mood: string, seed: number): ArtFlightDrink[] {
  const menu = fallbackMenu(classic, mood);
  const selectedArtworks = rotateArtworks(seed);
  const names = poeticNames[seed % poeticNames.length];
  return menu.drinks.map((drink, index) => {
    const artwork = selectedArtworks[index];
    const name = names[index];
    const serviceScript = [
      `${name}｜第 0${index + 1} 杯`,
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
