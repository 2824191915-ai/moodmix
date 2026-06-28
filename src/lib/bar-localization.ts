const cocktailNames: Record<string, string> = {
  Manhattan: "曼哈顿", "Black Manhattan": "黑曼哈顿", Negroni: "内格罗尼", Boulevardier: "花花公子", "Old Fashioned": "古典", Sazerac: "萨泽拉克", "Dry Martini": "干马天尼", Gimlet: "金酒酸橙", Daiquiri: "得其利", Mojito: "莫吉托", "French 75": "法式七五", Aviation: "飞行", "Clover Club": "三叶草俱乐部", "Mai Tai": "迈泰", Margarita: "玛格丽特", "Mezcal Margarita": "梅斯卡尔玛格丽特", "Jungle Bird": "丛林鸟", Penicillin: "盘尼西林", "Whiskey Sour": "威士忌酸", "Espresso Martini": "浓缩咖啡马天尼", "Coffee Negroni": "咖啡内格罗尼", "Vieux Carré": "老广场", "Last Word": "最后一语", "Paper Plane": "纸飞机", Sidecar: "边车", "Low ABV Spritz": "轻盈气泡特调", "Champagne Cocktail": "香槟鸡尾酒", Cosmopolitan: "大都会", "Tommy's Margarita": "汤米玛格丽特", Americano: "美式苦味酒", Bamboo: "竹", Adonis: "阿多尼斯", "Corpse Reviver No. 2": "亡者复苏二号", "Bee's Knees": "蜜蜂之膝", Southside: "南区", Paloma: "帕洛玛", "El Diablo": "恶魔", "Naked and Famous": "赤裸与成名", "Trinidad Sour": "特立尼达酸", Toronto: "多伦多", "Rusty Nail": "锈钉", "Brandy Crusta": "白兰地库斯塔", "Pisco Sour": "皮斯科酸", Caipirinha: "卡皮里尼亚", "Piña Colada": "椰林飘香", "Singapore Sling": "新加坡司令", "Gin Basil Smash": "金酒罗勒碎", "Hugo Spritz": "雨果气泡酒",
};

const terms: Array<[string, string]> = [
  ["Coffee-infused sweet vermouth", "咖啡浸渍甜味美思"], ["Honey-ginger syrup", "蜂蜜姜糖浆"], ["Fresh pineapple juice", "鲜榨菠萝汁"], ["Fresh grapefruit juice", "鲜榨西柚汁"], ["Fresh lemon juice", "鲜榨柠檬汁"], ["Fresh lime juice", "鲜榨青柠汁"], ["London dry gin", "伦敦干金酒"], ["Coffee liqueur", "咖啡利口酒"], ["Orange liqueur", "橙味利口酒"], ["Green Chartreuse", "绿查特酒"], ["Yellow Chartreuse", "黄查特酒"], ["Sweet vermouth", "甜味美思"], ["Dry vermouth", "干味美思"], ["Blanco tequila", "银龙舌兰"], ["Reposado tequila", "陈酿龙舌兰"], ["Aged Jamaican rum", "陈年牙买加朗姆"], ["White rum", "白朗姆"], ["Dark rum", "深色朗姆"], ["Rye whiskey", "黑麦威士忌"], ["Blended Scotch", "调和苏格兰威士忌"], ["Islay Scotch", "艾雷岛威士忌"], ["Aromatic bitters", "芳香苦精"], ["Orange bitters", "橙味苦精"], ["Peychaud's bitters", "佩乔苦精"], ["Angostura bitters", "安格仕苦精"], ["Demerara syrup", "德梅拉拉糖浆"], ["Simple syrup", "基础糖浆"], ["Cane syrup", "甘蔗糖浆"], ["Agave syrup", "龙舌兰糖浆"], ["Honey syrup", "蜂蜜糖浆"], ["Coconut cream", "椰浆"], ["Pineapple juice", "菠萝汁"], ["Cranberry juice", "蔓越莓汁"], ["Soda water", "苏打水"], ["Grapefruit soda", "西柚苏打"], ["Ginger beer", "姜汁啤酒"], ["Sparkling wine", "起泡酒"], ["Brut sparkling wine", "干型起泡酒"], ["Egg white or aquafaba", "蛋白或鹰嘴豆水"], ["Egg white", "蛋白"], ["Aquafaba", "鹰嘴豆水"], ["Crème de cassis", "黑加仑利口酒"], ["Crème de violette", "紫罗兰利口酒"], ["Maraschino liqueur", "黑樱桃利口酒"], ["Maraschino Luxardo", "卢萨朵黑樱桃酒"], ["Orange curaçao", "橙味库拉索"], ["Triple sec", "橙味利口酒"], ["Fino sherry", "菲诺雪莉"], ["Amontillado sherry", "阿蒙蒂亚雪莉"], ["Elderflower liqueur", "接骨木花利口酒"], ["Cherry liqueur", "樱桃利口酒"], ["Pineapple", "菠萝"], ["Bourbon", "波本威士忌"], ["Cognac", "干邑"], ["Gin", "金酒"], ["Vodka", "伏特加"], ["Mezcal", "梅斯卡尔"], ["Campari", "金巴利"], ["Aperol", "阿佩罗"], ["Pisco", "皮斯科"], ["Cachaça", "卡莎萨"], ["Absinthe", "苦艾酒"], ["Bénédictine", "本笃会利口酒"], ["Fernet-Branca", "布兰卡苦酒"], ["Drambuie", "蜂蜜威士忌利口酒"], ["Orgeat", "杏仁糖浆"], ["Grenadine", "红石榴糖浆"], ["Verjus", "未熟葡萄汁"], ["Mint leaves", "薄荷叶"], ["Basil leaves", "罗勒叶"], ["Cane sugar", "蔗糖"], ["White sugar", "白砂糖"], ["Fresh espresso", "新鲜浓缩咖啡"],
  ["Chilled cocktail glass", "预冷鸡尾酒杯"], ["Chilled martini glass", "预冷马天尼杯"], ["Chilled old fashioned", "预冷古典杯"], ["Chilled coupe", "预冷浅碟杯"], ["Double old fashioned", "双份古典杯"], ["Old fashioned", "古典杯"], ["Nick & Nora", "尼克与诺拉杯"], ["Wine glass", "葡萄酒杯"], ["Highball", "高球杯"], ["Hurricane", "飓风杯"], ["Flute", "笛形杯"], ["Coupe", "浅碟杯"], ["Rocks", "古典杯"],
  ["Large clear cube", "大块透明方冰"], ["Clear ice spear", "透明长条冰"], ["Kold-Draft cubes", "硬质方冰"], ["Dense shaker ice", "密实摇和冰"], ["Fresh cubes", "新鲜方冰"], ["Clear cubes", "透明方冰"], ["Crushed ice", "碎冰"], ["Shaker ice", "摇和冰"], ["No service ice", "出杯不带冰"], ["No ice", "不加冰"],
  ["Dry shake · shake", "干摇后加冰摇和"], ["Rinse · shake · fine strain", "润洗、摇和、双重过滤"], ["Shake · fine strain", "摇和、双重过滤"], ["Stir · rinse · strain", "搅拌、润洗、过滤"], ["Stir · strain", "搅拌、过滤"], ["Stir · rocks", "搅拌、注入冰杯"], ["Build · gentle lift", "杯中调制、轻柔提拉"], ["Build · top", "杯中调制、补满气泡"], ["Shake · top", "摇和、补满气泡"], ["Shake · rocks", "摇和、注入冰杯"], ["Shake · strain", "摇和、过滤"], ["Muddle · churn", "轻压、翻拌"], ["Flash blend", "快速搅打"], ["Hard shake · fine strain", "强力摇和、双重过滤"], ["Build", "杯中调制"], ["None", "无需装饰"],
  ["Orange peel and brandied cherry", "橙皮与白兰地渍樱桃"], ["Lemon twist and edible white flower", "柠檬卷与可食用白花"], ["Cucumber ribbon and shiso leaf", "黄瓜薄带与紫苏叶"], ["Brandied cherry", "白兰地渍樱桃"], ["Orange half-wheel", "半片橙轮"], ["Grapefruit half-wheel", "半片西柚轮"], ["Pineapple leaf", "菠萝叶"], ["Mint bouquet", "薄荷束"], ["Lemon twist", "柠檬卷"], ["Orange peel", "橙皮"], ["Lime wheel", "青柠轮"], ["Lime wedge", "青柠角"], ["Basil sprig", "罗勒枝"], ["Mint leaf", "薄荷叶"], ["Three coffee beans", "三颗咖啡豆"], ["Three bitters drops", "三滴苦精"],
  ["Strong", "浓烈"], ["Medium", "适中"], ["Low", "轻盈"], ["spirit-forward", "烈酒主导"], ["bittersweet", "苦甜交织"], ["high carbonation", "高气泡感"], ["low ABV", "低酒精度"], ["fresh espresso", "新鲜浓缩咖啡"], ["dense crema", "细密咖啡油脂"], ["not too sweet", "克制甜度"], ["bright", "明亮"], ["crisp", "清冽"], ["silky", "丝滑"], ["floral", "花香"], ["herbal", "草本"], ["dry", "干爽"], ["round", "圆润"], ["equal parts", "等份结构"],
];

export function cocktailNameZh(name: string) {
  const translated = cocktailNames[name];
  return translated ? `${translated}（${name}）` : name;
}

export function barTextZh(value: string | undefined) {
  if (!value) return "";
  return terms.reduce((text, [source, target]) => {
    const label = /[A-Za-z]/.test(source) ? `${target}（${source}）` : target;
    return text.replaceAll(source, label);
  }, value);
}

export function strengthZh(value: string) {
  return barTextZh(value);
}

export const categoryLabels: Record<string, string> = {
  All: "全部", "Spirit-forward": "烈酒型", Sour: "酸酒", Highball: "高球", Tropical: "热带", Sparkling: "起泡", "Low ABV": "轻酒精",
};

export const themeLabels: Record<string, string> = {
  "Golden Gramophone": "金色留声机", "Moon Library": "月光图书馆", "Velvet Speakeasy": "天鹅绒密语酒吧", "Tokyo Neon Rain": "东京霓虹雨", "Nordic Silence": "北境静默", "Vienna Café": "维也纳咖啡馆",
};

export const moodColorLabels: Record<string, string> = {
  "Amber Gold": "琥珀金", "Lunar Silver": "月光银", "Velvet Rouge": "天鹅绒绯红", "Electric Teal": "霓虹青绿", "Glacier Mist": "冰川薄雾", "Café Cream": "咖啡奶霜",
};
