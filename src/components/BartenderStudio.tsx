"use client";

import Image from "next/image";
import { Check, Clipboard, GlassWater, LoaderCircle, MessageSquareText, Sparkles, WandSparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { barTextZh, cocktailNameZh, strengthZh } from "@/lib/bar-localization";
import { fallbackMenu, type GeneratedMenu } from "@/lib/menu-ai";
import { buildBartenderBrief, getProfessionalSpec } from "@/lib/professional-specs";

type Props = {
  classic: string;
  cocktailName: string;
  mood: string;
  portrait: string;
  story: string;
};

export default function BartenderStudio({ classic, cocktailName, mood, portrait, story }: Props) {
  const specification = useMemo(() => getProfessionalSpec(classic), [classic]);
  const [mode, setMode] = useState<"brief" | "menu">("brief");
  const [selectedKeywords, setSelectedKeywords] = useState(specification.keywords);
  const [copied, setCopied] = useState(false);
  const [occasion, setOccasion] = useState("一场私密晚宴");
  const [direction, setDirection] = useState("克制、现代、余韵清晰");
  const [menu, setMenu] = useState<GeneratedMenu | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "ready">("idle");

  const toggleKeyword = (keyword: string) => {
    setSelectedKeywords((current) => current.includes(keyword) ? current.filter((item) => item !== keyword) : [...current, keyword]);
  };

  const copyBrief = async () => {
    await navigator.clipboard.writeText(`${cocktailName}\n${buildBartenderBrief(specification, selectedKeywords)}`);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const generateMenu = async () => {
    setStatus("loading");
    const localMenu = fallbackMenu(classic, mood);
    try {
      const response = await fetch("/api/menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ classic, cocktailName, mood, portrait, story, occasion, direction }),
      });
      const data = await response.json();
      setMenu(data.generated && data.menu ? data.menu : localMenu);
    } catch {
      setMenu(localMenu);
    } finally {
      setStatus("ready");
    }
  };

  return (
    <section className="bartender-studio">
      <div className="studio-heading">
        <div>
          <p className="kicker">专业吧台交付</p>
          <h2>把情绪，翻译成吧台语言</h2>
        </div>
        <div className="studio-tabs" role="tablist" aria-label="调酒服务模式">
          <button className={mode === "brief" ? "is-active" : ""} onClick={() => setMode("brief")} role="tab" aria-selected={mode === "brief"}><MessageSquareText size={16} />给调酒师</button>
          <button className={mode === "menu" ? "is-active" : ""} onClick={() => setMode("menu")} role="tab" aria-selected={mode === "menu"}><WandSparkles size={16} />智能酒单</button>
        </div>
      </div>

      {mode === "brief" ? (
        <div className="spec-layout">
          <div className="spec-main">
            <div className="spec-status">
              <span>{specification.standard === "IBA OFFICIAL" ? "国际调酒师协会官方酒谱" : "MoodMix 创作酒谱"}</span>
              <i />
              <strong>{cocktailNameZh(specification.classic)}</strong>
              {specification.sourceUrl && <a href={specification.sourceUrl} target="_blank" rel="noreferrer">查看 IBA 原始酒谱</a>}
            </div>
            <div className="spec-ingredients">
              <small>单杯专业配方</small>
              {specification.ingredients.map((ingredient) => (
                <div key={`${ingredient.amount}-${ingredient.item}`}><b>{ingredient.amount}</b><span>{barTextZh(ingredient.item)}<em>{barTextZh(ingredient.note)}</em></span></div>
              ))}
            </div>
            <div className="spec-service-grid">
              <span><small>杯型</small>{barTextZh(specification.glassware)}</span>
              <span><small>冰型</small>{barTextZh(specification.ice)}</span>
              <span><small>技法</small>{barTextZh(specification.technique)}</span>
              <span><small>装饰</small>{barTextZh(specification.garnish)}</span>
            </div>
            <ol className="spec-steps">{specification.steps.map((step) => <li key={step}>{step}</li>)}</ol>
            <p className="spec-target"><GlassWater size={16} />{specification.target}</p>
          </div>

          <aside className="bartender-brief">
            <p className="kicker">与调酒师沟通的风味词</p>
            <h3>今晚请这样做</h3>
            <p>点击保留你在意的风味，再把完整指令交给调酒师。</p>
            <div className="keyword-list">
              {specification.keywords.map((keyword) => <button key={keyword} onClick={() => toggleKeyword(keyword)} className={selectedKeywords.includes(keyword) ? "is-selected" : ""}>{selectedKeywords.includes(keyword) && <Check size={13} />}{barTextZh(keyword)}</button>)}
            </div>
            <blockquote>“以{cocktailNameZh(classic)}为骨架，{selectedKeywords.length ? selectedKeywords.map(barTextZh).join("、") : "保持经典平衡"}。改造要克制，结构要清楚。”</blockquote>
            <button className="primary-action brief-copy" onClick={copyBrief}>{copied ? <Check size={17} /> : <Clipboard size={17} />}{copied ? "已复制专业指令" : "复制给调酒师"}</button>
          </aside>
        </div>
      ) : (
        <div className="menu-generator">
          <div className="menu-controls">
            <div><label htmlFor="occasion">今夜场合</label><input id="occasion" value={occasion} onChange={(event) => setOccasion(event.target.value)} /></div>
            <div><label htmlFor="direction">风味方向</label><input id="direction" value={direction} onChange={(event) => setDirection(event.target.value)} /></div>
            <button className="primary-action" onClick={generateMenu} disabled={status === "loading"}>{status === "loading" ? <LoaderCircle className="is-spinning" size={17} /> : <Sparkles size={17} />}{status === "loading" ? "正在编排" : menu ? "重新生成酒单" : "生成三杯式酒单"}</button>
          </div>
          {menu ? (
            <div className="generated-menu">
              <div className="generated-menu-title"><div><p className="kicker">三幕式今夜酒单</p><h3>{menu.title}</h3></div><span>{menu.serviceNote}</span></div>
              <div className="menu-collection-visual"><Image src="/images/collections/tasting-flight.png" alt="六款不同风格的 MoodMix tasting flight" fill sizes="100vw" /></div>
              <div className="menu-drink-grid">
                {menu.drinks.map((drink, index) => (
                  <article className="menu-drink" key={`${drink.name}-${index}`}>
                    <div className="menu-drink-copy">
                      <span>第 0{index + 1} 杯 · {strengthZh(drink.strength)}</span>
                      <h4>{barTextZh(drink.name)}</h4>
                      <p>{drink.concept}</p>
                      <dl><dt>配方</dt><dd>{drink.ingredients.map((item) => `${item.amount} ${barTextZh(item.item)}`).join(" · ")}</dd><dt>制作</dt><dd>{drink.steps.join("")}</dd><dt>出杯</dt><dd>{barTextZh(drink.glassware)} · {barTextZh(drink.ice)} · {barTextZh(drink.garnish)}</dd></dl>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ) : <div className="menu-empty"><WandSparkles size={28} /><p>输入场合与风味方向，生成一组从开场到收尾都可执行的酒单。</p></div>}
        </div>
      )}
    </section>
  );
}
