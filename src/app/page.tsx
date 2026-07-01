"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Bird,
  Compass,
  Copy,
  Download,
  Eye,
  Feather,
  Flame,
  Flower2,
  ExternalLink,
  Hourglass,
  KeyRound,
  Menu,
  Moon,
  Music2,
  Palette,
  RotateCcw,
  Share2,
  Sparkles,
  Star,
  Train,
  TreePine,
  Waves,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import BartenderStudio from "@/components/BartenderStudio";
import CocktailLibrary from "@/components/CocktailLibrary";
import { buildArtFlightPlan } from "@/lib/art-flight";
import { barTextZh, cocktailNameZh, moodColorLabels, strengthZh, themeLabels } from "@/lib/bar-localization";
import { archetypes, chooseTheme, questions, themes, type ThemeId } from "@/lib/moodmix";
import { getProfessionalSpec } from "@/lib/professional-specs";
import { useMoodMix } from "@/store/useMoodMix";

const iconMap = {
  Moon,
  Key: KeyRound,
  Deer: TreePine,
  Gramophone: Music2,
  Rose: Flower2,
  Lighthouse: Sparkles,
  Raven: Bird,
  Train,
  Compass,
  Star,
  Flame,
  Wave: Waves,
  Mountain: TreePine,
  Shell: Waves,
  Crown: Sparkles,
  Feather,
  Hourglass,
  Mirror: Eye,
  Lantern: Sparkles,
  Comet: Star,
} as const;

const mbtiTypes = ["INTJ", "INTP", "ENTJ", "ENTP", "INFJ", "INFP", "ENFJ", "ENFP", "ISTJ", "ISFJ", "ESTJ", "ESFJ", "ISTP", "ISFP", "ESTP", "ESFP"];

function EditionSeal({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`edition-seal ${compact ? "is-compact" : ""}`} aria-hidden="true">
      <span>MM</span>
      <i />
      <small>4.5</small>
    </span>
  );
}

function Brand() {
  return (
    <button className="brand" onClick={() => useMoodMix.getState().reset()} aria-label="返回 MoodMix 首页">
      <span className="brand-mark"><i>M</i></span>
      <span className="brand-word">MoodMix<small>巴黎 · 上海</small></span>
    </button>
  );
}

function Shell({ children, themeId }: { children: React.ReactNode; themeId: ThemeId }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <main className="app-shell" data-theme={themeId}>
      <div className="shell-grain" aria-hidden="true" />
      <div className="shell-rule shell-rule-left" aria-hidden="true" />
      <div className="shell-rule shell-rule-right" aria-hidden="true" />
      <header className="topbar">
        <Brand />
        <div className="topbar-meta"><span>私享夜间版</span><i />为今夜调制的情绪仪式<i /><span>第 04 夜</span></div>
        <button className="icon-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "关闭菜单" : "打开菜单"} title={menuOpen ? "关闭菜单" : "菜单"}>
          {menuOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
      </header>
      <AnimatePresence>
        {menuOpen && (
          <motion.div className="menu-panel" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <span>今夜仪式</span>
            <button onClick={() => useMoodMix.getState().reset()}>重新开始</button>
            <button disabled>双人灵魂测试 · 即将开启</button>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </main>
  );
}

function Welcome() {
  const { start, mbti, setMbti } = useMoodMix();
  return (
    <Shell themeId="golden">
      <section className="welcome">
        <div className="welcome-image" aria-hidden="true" />
        <div className="welcome-shade" aria-hidden="true" />
        <motion.div className="welcome-content" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
          <div className="welcome-prelude"><p className="kicker">Mood Reading · Cocktail Ritual</p><span>第 004 号夜间仪式</span></div>
          <h1>MoodMix</h1>
          <div className="welcome-signature"><span>一幅可饮用的情绪肖像</span><i /> <span>仅为今晚调制</span></div>
          <p className="welcome-copy">八个瞬间，读出你的夜间人格、专属人格色，以及一杯真正可被调出的酒。</p>
          <div className="welcome-proof" aria-label="MoodMix 核心系统">
            <span><b>32</b>人格色谱</span>
            <span><b>08</b>夜间提问</span>
            <span><b>03</b>名画酒单</span>
          </div>
          <div className="welcome-actions">
            <button className="primary-action" onClick={start}>
              开启今夜配方 <ArrowRight size={17} />
            </button>
            <label className="mbti-select">
              <span>MBTI · 选填</span>
              <select value={mbti} onChange={(event) => setMbti(event.target.value)} aria-label="可选 MBTI 类型">
                <option value="">暂时略过</option>
                {mbtiTypes.map((type) => <option key={type}>{type}</option>)}
              </select>
            </label>
          </div>
        </motion.div>
        <aside className="welcome-rail" aria-label="今夜系统">
          <span>THE NIGHT INDEX</span>
          <dl>
            <div><dt>人格</dt><dd>像星座一样被看见，但保留一点未说透的暗面。</dd></div>
            <div><dt>色彩</dt><dd>每一种人格对应一种高级低饱和色。</dd></div>
            <div><dt>酒单</dt><dd>名画、风味和测试结果彼此关联。</dd></div>
          </dl>
        </aside>
        <div className="welcome-edition"><EditionSeal /><span>萃取<br />今夜</span></div>
        <div className="welcome-foot">
          <span>PERSONA / COLOR / COCKTAIL</span><span>MOODMIX 04</span><span className="welcome-foot-line" /><span>把今夜，调成一杯酒</span>
        </div>
      </section>
    </Shell>
  );
}

function Quiz() {
  const { currentQuestion, answers, answer, back } = useMoodMix();
  const question = questions[currentQuestion];
  const themeId = Object.keys(answers).length > 0 ? chooseTheme(answers) : "golden";
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <Shell themeId={themeId}>
      <section className="quiz-shell">
        <aside className="quiz-aside">
          <div className="quiz-aside-head">
            <span>{question.chapter === "atmosphere" ? "调制你的今夜" : "读取情绪暗纹"}</span>
            <EditionSeal compact />
          </div>
          <strong>{String(currentQuestion + 1).padStart(2, "0")}</strong>
          <div className="progress-scale" aria-label={`第 ${currentQuestion + 1} 题，共 ${questions.length} 题`}>
            {questions.map((item, index) => <i key={item.id} className={index <= currentQuestion ? "is-active" : ""} />)}
          </div>
          <div className="progress-track"><motion.div animate={{ width: `${progress}%` }} /></div>
          <small>{themes[themeId].name}<em>{themes[themeId].subtitle}</em></small>
        </aside>
        <AnimatePresence mode="wait">
          <motion.div key={question.id} className="question-panel" initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -28 }} transition={{ duration: 0.35 }}>
            <p className="kicker">{question.eyebrow}</p>
            <h2>{question.prompt}</h2>
            <div className="option-grid">
              {question.options.map((option, index) => (
                <button key={option.id} className="option" onClick={() => answer(question.id, option.id)}>
                  <span className="option-index">{String.fromCharCode(65 + index)}</span>
                  <span className="option-copy"><strong>{option.title}</strong><small>{option.note}</small></span>
                  <span className="option-gem" aria-hidden="true" />
                  <ArrowRight className="option-arrow" size={18} />
                </button>
              ))}
            </div>
            <button className="text-action" onClick={back} disabled={currentQuestion === 0}>
              <ArrowLeft size={15} /> 上一题
            </button>
          </motion.div>
        </AnimatePresence>
      </section>
    </Shell>
  );
}

function Coffee() {
  const { result, reveal, enhancementStatus } = useMoodMix();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 3000);
    return () => window.clearTimeout(timer);
  }, []);
  if (!result) return null;
  return (
    <Shell themeId={result.theme}>
      <section className="coffee-stage">
        <div className="coffee-object" aria-hidden="true">
          <span className="coffee-orbit orbit-one" /><span className="coffee-orbit orbit-two" />
          <div className={`coffee-cup ${ready ? "is-ready" : ""}`}>
            <span className="coffee-handle" />
            <div className="coffee-liquid"><i /><i /><i /><i /><i /><i /></div>
          </div>
          <span className="coffee-plate-mark">MOODMIX · 咖啡象征解读 · 004</span>
        </div>
        <div className="coffee-copy">
          <p className="kicker">咖啡杯底象征解读</p>
          <span className="coffee-folio">三枚征兆 / 一夜答案</span>
          <h2>{ready ? "杯底已经安静下来" : "让未说出口的部分慢慢沉淀"}</h2>
          <p>{ready ? "三个象征正在等待被看见。" : "咖啡渣会在旋转之后留下今晚的线索。"}</p>
          <div className="coffee-status"><i className={enhancementStatus === "loading" ? "is-pulsing" : ""} />{enhancementStatus === "loading" ? "正在读取你的情绪风味" : "今夜肖像已经显影"}</div>
          <button className="primary-action" onClick={reveal} disabled={!ready}>
            <Sparkles size={17} /> 揭晓杯底征兆
          </button>
        </div>
      </section>
    </Shell>
  );
}

function ScoreBar({ label, value }: { label: string; value: number }) {
  return <div className="score-row"><span>{label}</span><div><i style={{ width: `${value}%` }} /></div><b>{value}</b></div>;
}

function Portrait() {
  const { result, reset } = useMoodMix();
  const [shared, setShared] = useState(false);
  const [posterBusy, setPosterBusy] = useState(false);
  const [copiedArtPlan, setCopiedArtPlan] = useState<number | null>(null);
  const theme = result ? themes[result.theme] : themes.golden;
  const symbolIcons = useMemo(() => result?.coffeeSymbols.map((symbol) => iconMap[symbol[0] as keyof typeof iconMap] ?? Star), [result]);
  const artFlight = useMemo(() => result ? buildArtFlightPlan(result.cocktail.basedOn, themeLabels[theme.name] ?? theme.name, result.seed, {
    archetypeId: result.archetype.id,
    colorName: result.archetype.colorName,
    scores: result.scores,
    themeId: result.theme,
  }) : [], [result, theme.name]);
  if (!result) return null;
  const recipeSpec = getProfessionalSpec(result.cocktail.basedOn);

  const downloadPoster = async () => {
    setPosterBusy(true);
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1920;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      setPosterBusy(false);
      return;
    }
    ctx.fillStyle = "#08090a";
    ctx.fillRect(0, 0, 1080, 1920);
    const image = new window.Image();
    image.src = "/images/moodmix-cocktail-portrait.png";
    try {
      await image.decode();
      ctx.globalAlpha = 0.74;
      ctx.drawImage(image, 430, 0, 650, 810);
      ctx.globalAlpha = 1;
      const fade = ctx.createLinearGradient(300, 0, 900, 0);
      fade.addColorStop(0, "#08090a");
      fade.addColorStop(1, "rgba(8,9,10,0)");
      ctx.fillStyle = fade;
      ctx.fillRect(300, 0, 650, 820);
    } catch {
      // The poster remains complete without the optional editorial image.
    }
    ctx.fillStyle = result.archetype.color;
    ctx.fillRect(68, 68, 5, 1784);
    ctx.strokeStyle = `${result.archetype.color}66`;
    ctx.lineWidth = 1;
    ctx.strokeRect(106, 106, 868, 1708);
    ctx.strokeRect(126, 126, 828, 1668);
    ctx.fillStyle = "#f4f0e8";
    ctx.font = "30px Arial";
    ctx.fillText("MOODMIX  ·  私享夜间版", 156, 202);
    ctx.font = "94px Didot, Georgia";
    ctx.fillText(result.archetype.cn, 156, 470);
    ctx.font = "48px sans-serif";
    ctx.fillStyle = result.archetype.color;
    ctx.fillText("今夜人格肖像", 156, 548);
    ctx.font = "34px sans-serif";
    ctx.fillStyle = "#b8b4ad";
    ctx.fillText(`${themeLabels[theme.name] ?? theme.name}  /  ${moodColorLabels[theme.moodColor] ?? theme.moodColor}`, 156, 680);
    ctx.font = "84px Didot, Georgia";
    ctx.fillStyle = "#f4f0e8";
    ctx.fillText(result.cocktail.name, 156, 1050);
    ctx.font = "30px sans-serif";
    ctx.fillStyle = result.archetype.color;
    ctx.fillText(`经典骨架  ${cocktailNameZh(result.cocktail.basedOn)}`, 156, 1122);
    ctx.font = "34px Georgia";
    ctx.fillStyle = "#d6d1c7";
    const quote = result.message;
    const lines = [quote.slice(0, 18), quote.slice(18, 36), quote.slice(36)];
    lines.filter(Boolean).forEach((line, index) => ctx.fillText(line, 156, 1370 + index * 58));
    ctx.font = "28px sans-serif";
    ctx.fillStyle = "#8e8a83";
    ctx.fillText(result.coffeeSymbols.map((symbol) => symbol[1]).join("  ·  "), 156, 1700);
    ctx.font = "22px Arial";
    ctx.fillText("MM 04  /  把今夜，调成一杯酒", 156, 1780);
    const link = document.createElement("a");
    link.download = `MoodMix-${result.archetype.name.replaceAll(" ", "-")}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    setPosterBusy(false);
  };

  const shareResult = async () => {
    const text = `今夜，我是${result.archetype.cn}，人格色是${result.archetype.colorName}。MoodMix 为我调制了「${result.cocktail.name}」，以${cocktailNameZh(result.cocktail.basedOn)}为经典骨架。`;
    const copyText = async () => {
      try {
        if (!navigator.clipboard?.writeText) throw new Error("clipboard_unavailable");
        await navigator.clipboard?.writeText(text);
        return true;
      } catch {
        const fallback = document.createElement("textarea");
        fallback.value = text;
        fallback.setAttribute("readonly", "");
        fallback.style.position = "fixed";
        fallback.style.left = "-999px";
        document.body.appendChild(fallback);
        fallback.select();
        const copied = document.execCommand("copy");
        document.body.removeChild(fallback);
        return copied;
      }
    };

    try {
      await copyText();
      setShared(true);
      if (navigator.share) {
        window.setTimeout(() => {
          void navigator.share({ title: "我的 MoodMix 今夜肖像", text }).catch(() => undefined);
        }, 0);
      }
    } catch {
      setShared(false);
    }
  };

  const copyArtDrink = async (index: number, script: string) => {
    const copyText = async () => {
      try {
        if (!navigator.clipboard?.writeText) throw new Error("clipboard_unavailable");
        await navigator.clipboard.writeText(script);
        return true;
      } catch {
        const fallback = document.createElement("textarea");
        fallback.value = script;
        fallback.setAttribute("readonly", "");
        fallback.style.position = "fixed";
        fallback.style.left = "-999px";
        document.body.appendChild(fallback);
        fallback.select();
        const copied = document.execCommand("copy");
        document.body.removeChild(fallback);
        return copied;
      }
    };

    const copied = await copyText();
    if (!copied) return;
    setCopiedArtPlan(index);
    window.setTimeout(() => setCopiedArtPlan((current) => current === index ? null : current), 1800);
  };

  return (
    <Shell themeId={result.theme}>
      <section className="portrait-wrap" style={{ "--accent": result.archetype.color } as React.CSSProperties}>
        <div className="portrait-masthead"><span>MOODMIX 私享夜间版</span><i /><span>肖像 {String((result.seed % archetypes.length) + 1).padStart(2, "0")} / {archetypes.length}</span></div>
        <motion.div className="portrait-hero" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="portrait-number">{String((result.seed % archetypes.length) + 1).padStart(2, "0")}</div>
          <p className="kicker">你的今夜人格肖像</p>
          <h1>{result.archetype.cn}</h1>
          <h2>{themeLabels[theme.name] ?? theme.name}</h2>
          <p className="archetype-note">{result.archetype.note}</p>
          <span className="portrait-signature">把今夜，调成一杯酒。</span>
          <div className="portrait-meta">
            <span><small>今夜氛围</small>{themeLabels[theme.name] ?? theme.name}</span>
            <span><small>人格色彩</small><i style={{ background: result.archetype.color }} />{result.archetype.colorName}</span>
            <span><small>酒体浓度</small>{strengthZh(result.cocktail.strength)}</span>
          </div>
        </motion.div>

        <section className="observation-panel">
          <div className="observation-heading">
            <p className="kicker">Observation Engine</p>
            <h2>从线索到身份</h2>
          </div>
          <div className="observation-rail">
            {result.observations.map((note, index) => (
              <article className="observation-card" key={`${note.observation}-${index}`}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <dl>
                  <dt>观察</dt><dd>{note.observation}</dd>
                  <dt>证据</dt><dd>{note.evidence}</dd>
                  <dt>推理</dt><dd>{note.inference}</dd>
                  <dt>身份</dt><dd>{note.identity}</dd>
                </dl>
              </article>
            ))}
          </div>
        </section>

        <div className="portrait-grid">
          <section className="symbols-panel">
            <p className="kicker">杯底留下的三枚征兆</p>
            <div className="symbol-row">
              {result.coffeeSymbols.map((symbol, index) => {
                const SymbolIcon = symbolIcons?.[index] ?? Star;
                return <div className="symbol" key={`${symbol[0]}-${index}`}><SymbolIcon /><strong>{symbol[1]}</strong><span>{symbol[2]}</span></div>;
              })}
            </div>
            <p className="reading">{result.reading}</p>
          </section>

          <section className="scores-panel">
            <p className="kicker">你的内在天气</p>
            <ScoreBar label="情绪深度" value={result.scores.emotionDepth} />
            <ScoreBar label="社交欲" value={result.scores.socialDesire} />
            <ScoreBar label="探索欲" value={result.scores.exploration} />
            <ScoreBar label="浪漫" value={result.scores.romance} />
            <ScoreBar label="控制感" value={result.scores.control} />
            <ScoreBar label="压力" value={result.scores.pressure} />
          </section>
        </div>

        <section className="cocktail-panel">
          <div className="cocktail-visual">
            <Image src="/images/collections/cocktail-lineup.png" alt="七款不同风格的 MoodMix 鸡尾酒陈列" fill sizes="100vw" />
            <div className="cocktail-visual-frame" aria-hidden="true" />
            <span className="cocktail-visual-index">MM<br />04</span>
            <div className="cocktail-visual-caption"><span>今夜酒款陈列</span><i />七种风味方向</div>
          </div>
          <div className="cocktail-editorial">
            <div className="cocktail-title">
              <p className="kicker">你的今夜特调</p>
              <h2>{result.cocktail.name}</h2>
              <span>以 {cocktailNameZh(result.cocktail.basedOn)} 为经典骨架</span>
            </div>
            <blockquote>{result.cocktail.story}</blockquote>
            <div className="recipe-grid">
              <div><small>单杯配方</small><p>{recipeSpec.ingredients.map((item) => `${item.amount} ${barTextZh(item.item)}`).join(" · ")}</p><p>{result.cocktail.modification}</p></div>
              <div><small>制作方式</small><p>{recipeSpec.steps.join("")}</p><p>装饰：{barTextZh(recipeSpec.garnish)}</p><p>{result.cocktail.bartenderNote}</p></div>
            </div>
          </div>
        </section>

        <BartenderStudio
          classic={result.cocktail.basedOn}
          cocktailName={result.cocktail.name}
          mood={themeLabels[theme.name] ?? theme.name}
          portrait={result.archetype.name}
          story={result.cocktail.story}
        />

        <CocktailLibrary />

        <section className="message-panel">
          <span className="message-ornament"><i /><Music2 size={20} /><i /></span>
          <p>{result.message}</p>
          <span>{result.music}</span>
        </section>

        <section className="experiences">
          <p className="kicker">为你搭配的微醺体验</p>
          <div className="experience-grid">
            <article><span>01</span><h3>独处者的夜间仪式</h3><p>专属鸡尾酒 · 咖啡占卜卡 · 音乐推荐</p></article>
            <article><span>02</span><h3>双人灵魂密谈</h3><p>双人测试 · 味觉契合度 · 共享鸡尾酒</p><small>即将开启</small></article>
            <article><span>03</span><h3>艺术家的三杯旅程</h3><p>三种情绪阶段 · 三杯风味递进</p></article>
          </div>
        </section>

        <section className="art-flight-panel">
          <div className="art-flight-heading">
            <div>
              <p className="kicker">三杯名画计划</p>
              <h2>把今晚，挂进一间流动美术馆</h2>
            </div>
            <p>三杯从开场、中段到收尾递进，名画会依据你的人格类型、人格色与内在分数匹配，不再只是装饰背景。</p>
          </div>
          <div className="art-flight-grid">
            {artFlight.map((drink, index) => (
              <article
                className="art-flight-card"
                key={`${drink.name}-${drink.artwork.id}`}
                style={{ "--art-bg": `url("${drink.artwork.imageUrl}")` } as React.CSSProperties}
              >
                <div className="art-flight-copy">
                  <span>第 {String(index + 1).padStart(2, "0")} 杯 · {drink.act} · {strengthZh(drink.strength)}</span>
                  <h3>{drink.name}</h3>
                  <p>{drink.concept}</p>
                  <dl>
                    <dt>配方</dt>
                    <dd>{drink.ingredients.map((item) => `${item.amount} ${barTextZh(item.item)}`).join(" · ")}</dd>
                    <dt>制作</dt>
                    <dd>{drink.steps.map(barTextZh).join("")}</dd>
                    <dt>出杯</dt>
                    <dd>{barTextZh(drink.glassware)} · {barTextZh(drink.ice)} · {barTextZh(drink.garnish)}</dd>
                  </dl>
                  <div className="art-context">
                    <span><Palette size={13} /> {drink.artwork.period}</span>
                    <strong>{drink.artwork.title}</strong>
                    <small>{drink.artwork.artist} · {drink.artwork.originalTitle}</small>
                    <p>{drink.matchNote}</p>
                    <p>{drink.artwork.note}</p>
                    <a href={drink.artwork.sourceUrl} target="_blank" rel="noreferrer"><ExternalLink size={12} /> 查看名画来源</a>
                  </div>
                  <button className="art-action" onClick={() => copyArtDrink(index, drink.serviceScript)}>
                    <Copy size={14} /> {copiedArtPlan === index ? "已复制做法" : drink.actionLabel}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="result-actions">
          <button className="primary-action" onClick={downloadPoster} disabled={posterBusy}><Download size={17} /> {posterBusy ? "正在绘制今夜海报" : "下载今夜海报"}</button>
          <button className="secondary-action" onClick={shareResult}><Share2 size={17} /> {shared ? "分享文案已准备" : "分享今夜结果"}</button>
          <button className="icon-button" onClick={reset} title="重新开始" aria-label="重新开始"><RotateCcw size={18} /></button>
        </div>
      </section>
    </Shell>
  );
}

export default function Home() {
  const stage = useMoodMix((state) => state.stage);
  return <AnimatePresence mode="wait">{stage === "welcome" ? <Welcome key="welcome" /> : stage === "quiz" ? <Quiz key="quiz" /> : stage === "coffee" ? <Coffee key="coffee" /> : <Portrait key="portrait" />}</AnimatePresence>;
}
