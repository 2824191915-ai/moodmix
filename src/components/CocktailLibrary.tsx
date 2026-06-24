"use client";

import Image from "next/image";
import { Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { cocktails } from "@/lib/moodmix";

const categories = ["All", "Spirit-forward", "Sour", "Highball", "Tropical", "Sparkling", "Low ABV"] as const;
type Category = (typeof categories)[number];

const groups: Record<Exclude<Category, "All">, Set<string>> = {
  "Spirit-forward": new Set(["Manhattan", "Black Manhattan", "Negroni", "Boulevardier", "Old Fashioned", "Sazerac", "Dry Martini", "Coffee Negroni", "Vieux Carré", "Toronto", "Rusty Nail", "Adonis"]),
  Sour: new Set(["Gimlet", "Daiquiri", "Aviation", "Clover Club", "Margarita", "Mezcal Margarita", "Penicillin", "Whiskey Sour", "Last Word", "Paper Plane", "Sidecar", "Tommy's Margarita", "Bee's Knees", "Southside", "Naked and Famous", "Trinidad Sour", "Brandy Crusta", "Pisco Sour"]),
  Highball: new Set(["Mojito", "Paloma", "El Diablo", "Singapore Sling", "Gin Basil Smash"]),
  Tropical: new Set(["Mai Tai", "Jungle Bird", "Piña Colada", "Caipirinha"]),
  Sparkling: new Set(["French 75", "Champagne Cocktail", "Hugo Spritz", "Cosmopolitan"]),
  "Low ABV": new Set(["Low ABV Spritz", "Americano", "Bamboo"]),
};

function categoryFor(name: string): Exclude<Category, "All"> {
  return (Object.entries(groups).find(([, names]) => names.has(name))?.[0] as Exclude<Category, "All"> | undefined) ?? "Spirit-forward";
}

export default function CocktailLibrary() {
  const [category, setCategory] = useState<Category>("All");
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(false);
  const filtered = useMemo(() => cocktails.filter((cocktail) => {
    const matchesCategory = category === "All" || groups[category].has(cocktail[0]);
    const haystack = `${cocktail[0]} ${cocktail[1]}`.toLowerCase();
    return matchesCategory && haystack.includes(query.trim().toLowerCase());
  }), [category, query]);
  const visible = expanded || query ? filtered : filtered.slice(0, 12);

  return (
    <section className="cocktail-library">
      <div className="library-heading">
        <div><p className="kicker">THE CLASSIC LIBRARY</p><h2>48 款经典，七种夜晚语言</h2></div>
        <div className="library-count"><strong>48</strong><span>PROFESSIONAL<br />SPECIFICATIONS</span></div>
      </div>
      <div className="library-toolbar">
        <div className="library-search"><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索酒名或基酒" aria-label="搜索鸡尾酒" /></div>
        <div className="library-filters" aria-label="酒款类型"><SlidersHorizontal size={15} />{categories.map((item) => <button key={item} className={category === item ? "is-active" : ""} onClick={() => { setCategory(item); setExpanded(false); }}>{item}</button>)}</div>
      </div>
      <div className="library-collection-visual"><Image src="/images/collections/cocktail-lineup.png" alt="七款鸡尾酒组成的 MoodMix 酒款系列" fill sizes="100vw" /></div>
      <div className="library-grid">
        {visible.map((cocktail) => {
          const type = categoryFor(cocktail[0]);
          return <article className="library-card" data-category={type} key={cocktail[0]}>
            <div className="library-card-copy"><span>{type}</span><h3>{cocktail[0]}</h3><p>{cocktail[1]}</p><small>{cocktail[2]}</small></div>
          </article>;
        })}
      </div>
      {!query && filtered.length > 12 && <button className="secondary-action library-more" onClick={() => setExpanded(!expanded)}>{expanded ? "收起酒库" : `浏览全部 ${filtered.length} 款`}</button>}
      {!visible.length && <p className="library-empty">没有匹配的酒款，试试基酒或经典名称。</p>}
    </section>
  );
}
