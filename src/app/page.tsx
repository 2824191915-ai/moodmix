"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Bird,
  Compass,
  Download,
  Eye,
  Feather,
  Flame,
  Flower2,
  Hourglass,
  KeyRound,
  Menu,
  Moon,
  Music2,
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
import { chooseTheme, questions, themes, type ThemeId } from "@/lib/moodmix";
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
      <span className="brand-word">MoodMix<small>PARIS · SHANGHAI</small></span>
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
        <div className="topbar-meta"><span>PRIVATE EDITION</span><i />A COCKTAIL RITUAL FOR THE NIGHT<i /><span>MM · 04</span></div>
        <button className="icon-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "关闭菜单" : "打开菜单"} title={menuOpen ? "关闭菜单" : "菜单"}>
          {menuOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
      </header>
      <AnimatePresence>
        {menuOpen && (
          <motion.div className="menu-panel" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <span>TONIGHT&apos;S RITUAL</span>
            <button onClick={() => useMoodMix.getState().reset()}>重新开始</button>
            <button disabled>Two Souls · Soon</button>
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
          <div className="welcome-prelude"><p className="kicker">MOOD · SYMBOL · CLASSIC</p><span>RITUAL NO. 004</span></div>
          <h1>MoodMix</h1>
          <div className="welcome-signature"><span>A cocktail portrait</span><i /> <span>composed for tonight</span></div>
          <p className="welcome-copy">用八个瞬间，读出今晚的情绪、人格与一杯真正可被调出的酒。</p>
          <div className="welcome-actions">
            <button className="primary-action" onClick={start}>
              Create your night <ArrowRight size={17} />
            </button>
            <label className="mbti-select">
              <span>MBTI · OPTIONAL</span>
              <select value={mbti} onChange={(event) => setMbti(event.target.value)} aria-label="可选 MBTI 类型">
                <option value="">Skip for now</option>
                {mbtiTypes.map((type) => <option key={type}>{type}</option>)}
              </select>
            </label>
          </div>
        </motion.div>
        <div className="welcome-edition"><EditionSeal /><span>THE NIGHT<br />DISTILLED</span></div>
        <div className="welcome-foot">
          <span>08 QUESTIONS</span><span>01 PORTRAIT</span><span className="welcome-foot-line" /><span>YOUR NIGHT, DISTILLED</span>
        </div>
      </section>
    </Shell>
  );
}

function Quiz() {
  const { currentQuestion, answers, answer, back } = useMoodMix();
  const question = questions[currentQuestion];
  const themeId = currentQuestion >= 4 ? chooseTheme(answers) : "golden";
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <Shell themeId={themeId}>
      <section className="quiz-shell">
        <aside className="quiz-aside">
          <div className="quiz-aside-head">
            <span>{question.chapter === "atmosphere" ? "CREATE YOUR NIGHT" : "MOOD READING"}</span>
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
          <span className="coffee-plate-mark">MOODMIX · SYMBOL READING · 004</span>
        </div>
        <div className="coffee-copy">
          <p className="kicker">COFFEE SYMBOL ENGINE</p>
          <span className="coffee-folio">III SIGNS / I NIGHT</span>
          <h2>{ready ? "杯底已经安静下来" : "让未说出口的部分慢慢沉淀"}</h2>
          <p>{ready ? "三个象征正在等待被看见。" : "咖啡渣会在旋转之后留下今晚的线索。"}</p>
          <div className="coffee-status"><i className={enhancementStatus === "loading" ? "is-pulsing" : ""} />{enhancementStatus === "loading" ? "THE PORTRAIT IS FORMING" : "THE PORTRAIT IS READY"}</div>
          <button className="primary-action" onClick={reveal} disabled={!ready}>
            <Sparkles size={17} /> Reveal my symbols
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
  const theme = result ? themes[result.theme] : themes.golden;
  const symbolIcons = useMemo(() => result?.coffeeSymbols.map((symbol) => iconMap[symbol[0] as keyof typeof iconMap] ?? Star), [result]);
  if (!result) return null;

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
    ctx.fillStyle = theme.color;
    ctx.fillRect(68, 68, 5, 1784);
    ctx.strokeStyle = `${theme.color}66`;
    ctx.lineWidth = 1;
    ctx.strokeRect(106, 106, 868, 1708);
    ctx.strokeRect(126, 126, 828, 1668);
    ctx.fillStyle = "#f4f0e8";
    ctx.font = "30px Arial";
    ctx.fillText("MOODMIX  ·  PRIVATE NIGHT EDITION", 156, 202);
    ctx.font = "94px Didot, Georgia";
    ctx.fillText(result.archetype.name, 156, 470);
    ctx.font = "48px sans-serif";
    ctx.fillStyle = theme.color;
    ctx.fillText(result.archetype.cn, 156, 548);
    ctx.font = "34px sans-serif";
    ctx.fillStyle = "#b8b4ad";
    ctx.fillText(`${theme.name}  /  ${theme.moodColor}`, 156, 680);
    ctx.font = "84px Didot, Georgia";
    ctx.fillStyle = "#f4f0e8";
    ctx.fillText(result.cocktail.name, 156, 1050);
    ctx.font = "30px sans-serif";
    ctx.fillStyle = theme.color;
    ctx.fillText(`BASED ON  ${result.cocktail.basedOn.toUpperCase()}`, 156, 1122);
    ctx.font = "34px Georgia";
    ctx.fillStyle = "#d6d1c7";
    const quote = result.message;
    const lines = [quote.slice(0, 18), quote.slice(18, 36), quote.slice(36)];
    lines.filter(Boolean).forEach((line, index) => ctx.fillText(line, 156, 1370 + index * 58));
    ctx.font = "28px sans-serif";
    ctx.fillStyle = "#8e8a83";
    ctx.fillText(result.coffeeSymbols.map((symbol) => symbol[0].toUpperCase()).join("  ·  "), 156, 1700);
    ctx.font = "22px Arial";
    ctx.fillText("MM 04  /  YOUR NIGHT, DISTILLED", 156, 1780);
    const link = document.createElement("a");
    link.download = `MoodMix-${result.archetype.name.replaceAll(" ", "-")}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    setPosterBusy(false);
  };

  const shareResult = async () => {
    const text = `Tonight I am ${result.archetype.name}. My MoodMix cocktail is ${result.cocktail.name}, based on ${result.cocktail.basedOn}.`;
    try {
      if (navigator.share) await navigator.share({ title: "My MoodMix Portrait", text });
      else await navigator.clipboard.writeText(text);
      setShared(true);
    } catch {
      setShared(false);
    }
  };

  return (
    <Shell themeId={result.theme}>
      <section className="portrait-wrap">
        <div className="portrait-masthead"><span>MOODMIX PRIVATE EDITION</span><i /><span>PORTRAIT {String((result.seed % 16) + 1).padStart(2, "0")} / 16</span></div>
        <motion.div className="portrait-hero" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="portrait-number">{String((result.seed % 16) + 1).padStart(2, "0")}</div>
          <p className="kicker">TONIGHT&apos;S PORTRAIT</p>
          <h1>{result.archetype.name}</h1>
          <h2>{result.archetype.cn}</h2>
          <p className="archetype-note">{result.archetype.note}</p>
          <span className="portrait-signature">Tonight, distilled.</span>
          <div className="portrait-meta">
            <span><small>ATMOSPHERE</small>{theme.name}</span>
            <span><small>MOOD COLOR</small><i style={{ background: theme.color }} />{theme.moodColor}</span>
            <span><small>STRENGTH</small>{result.cocktail.strength}</span>
          </div>
        </motion.div>

        <div className="portrait-grid">
          <section className="symbols-panel">
            <p className="kicker">COFFEE SYMBOLS</p>
            <div className="symbol-row">
              {result.coffeeSymbols.map((symbol, index) => {
                const SymbolIcon = symbolIcons?.[index] ?? Star;
                return <div className="symbol" key={`${symbol[0]}-${index}`}><SymbolIcon /><strong>{symbol[0]}</strong><span>{symbol[1]}</span></div>;
              })}
            </div>
            <p className="reading">{result.reading}</p>
          </section>

          <section className="scores-panel">
            <p className="kicker">INNER WEATHER</p>
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
            <div className="cocktail-visual-caption"><span>THE COLLECTION</span><i />SEVEN DIRECTIONS</div>
          </div>
          <div className="cocktail-editorial">
            <div className="cocktail-title">
              <p className="kicker">YOUR COCKTAIL</p>
              <h2>{result.cocktail.name}</h2>
              <span>Based on {result.cocktail.basedOn}</span>
            </div>
            <blockquote>{result.cocktail.story}</blockquote>
            <div className="recipe-grid">
              <div><small>INGREDIENTS</small><p>{result.cocktail.ingredients}</p><p>{result.cocktail.modification}</p></div>
              <div><small>METHOD</small><p>{result.cocktail.method}</p><p>Garnish: {result.cocktail.garnish}</p><p>{result.cocktail.bartenderNote}</p></div>
            </div>
          </div>
        </section>

        <BartenderStudio
          classic={result.cocktail.basedOn}
          cocktailName={result.cocktail.name}
          mood={theme.name}
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
          <p className="kicker">CURATED EXPERIENCES</p>
          <div className="experience-grid">
            <article><span>01</span><h3>The Solitude Ritual</h3><p>专属鸡尾酒 · 咖啡占卜卡 · 音乐推荐</p></article>
            <article><span>02</span><h3>The Two Souls Session</h3><p>双人测试 · 味觉契合度 · 共享鸡尾酒</p><small>COMING SOON</small></article>
            <article><span>03</span><h3>The Artist&apos;s Flight</h3><p>三种情绪阶段 · 三杯 tasting flight</p></article>
          </div>
        </section>

        <div className="result-actions">
          <button className="primary-action" onClick={downloadPoster} disabled={posterBusy}><Download size={17} /> {posterBusy ? "Composing" : "Download poster"}</button>
          <button className="secondary-action" onClick={shareResult}><Share2 size={17} /> {shared ? "Copied" : "Share result"}</button>
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
