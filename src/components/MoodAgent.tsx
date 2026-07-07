"use client";

import { AlertCircle, Loader2, RotateCcw, Send, Sparkles } from "lucide-react";
import { FormEvent, useState } from "react";
import type { MoodAgentInput, MoodAgentResult } from "@/lib/agent-ai";

type AgentState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; result: MoodAgentResult }
  | { status: "error"; message: string };

const initialInput: MoodAgentInput = {
  mood: "",
  city: "",
  style: "",
  alcoholPreference: "",
  userText: "",
};

const styleOptions = ["电影感 · 暗调", "复古黄铜", "东京霓虹", "北欧留白", "玫瑰丝绒", "自然草本"];
const alcoholOptions = ["无酒精", "低酒精度", "中低酒精度", "经典强度", "烈酒感明显"];

export default function MoodAgent() {
  const [input, setInput] = useState<MoodAgentInput>(initialInput);
  const [lastPayload, setLastPayload] = useState<MoodAgentInput | null>(null);
  const [agentState, setAgentState] = useState<AgentState>({ status: "idle" });

  const updateField = (field: keyof MoodAgentInput, value: string) => {
    setInput((current) => ({ ...current, [field]: value }));
  };

  const runAgent = async (payload: MoodAgentInput) => {
    setAgentState({ status: "loading" });
    setLastPayload(payload);
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 18_000);

    try {
      const response = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      const body: unknown = await response.json().catch(() => null);
      if (!response.ok || !body || typeof body !== "object") {
        const message =
          body && typeof body === "object" && "message" in body && typeof body.message === "string"
            ? body.message
            : "这次推荐没有生成成功，请稍后再试。";
        setAgentState({ status: "error", message });
        return;
      }
      if ("generated" in body && body.generated === true && "result" in body) {
        setAgentState({ status: "success", result: body.result as MoodAgentResult });
        return;
      }
      const message =
        "message" in body && typeof body.message === "string"
          ? body.message
          : "这次推荐没有生成成功，请换一句心情再试。";
      setAgentState({ status: "error", message });
    } catch {
      setAgentState({ status: "error", message: "连接超时或网络不稳定，请再试一次。" });
    } finally {
      window.clearTimeout(timer);
    }
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void runAgent(input);
  };

  const retry = () => {
    if (!lastPayload) return;
    void runAgent(lastPayload);
  };

  return (
    <section className="agent-panel" aria-label="MoodMix AI Agent">
      <div className="agent-copy">
        <p className="kicker">AI Bartender Agent</p>
        <h2>把今晚交给一位调酒师</h2>
        <p>输入几枚线索，生成一张专属酒款推荐卡。</p>
      </div>

      <form className="agent-form" onSubmit={submit}>
        <label>
          <span>心情</span>
          <input value={input.mood} onChange={(event) => updateField("mood", event.target.value)} placeholder="例如：有点松弛，但想被点亮" required />
        </label>
        <label>
          <span>城市风格</span>
          <input value={input.city} onChange={(event) => updateField("city", event.target.value)} placeholder="例如：雨夜巴黎 / 东京霓虹" required />
        </label>
        <label>
          <span>审美偏好</span>
          <select value={input.style} onChange={(event) => updateField("style", event.target.value)} required>
            <option value="" disabled>选择审美方向</option>
            {styleOptions.map((option) => <option key={option}>{option}</option>)}
          </select>
        </label>
        <label>
          <span>酒精偏好</span>
          <select value={input.alcoholPreference} onChange={(event) => updateField("alcoholPreference", event.target.value)} required>
            <option value="" disabled>选择酒精强度</option>
            {alcoholOptions.map((option) => <option key={option}>{option}</option>)}
          </select>
        </label>
        <label className="agent-wide-field">
          <span>补充一句</span>
          <textarea value={input.userText} onChange={(event) => updateField("userText", event.target.value)} placeholder="今晚想喝到怎样的颜色、气味或故事？" rows={3} />
        </label>
        <button className="agent-submit" disabled={agentState.status === "loading"} type="submit">
          {agentState.status === "loading" ? <Loader2 className="is-spinning" size={16} /> : <Send size={16} />}
          生成推荐
        </button>
      </form>

      <div className="agent-result" data-state={agentState.status}>
        {agentState.status === "idle" && (
          <div className="agent-empty">
            <Sparkles size={24} />
            <span>等待今晚的第一枚线索</span>
          </div>
        )}
        {agentState.status === "loading" && (
          <div className="agent-empty">
            <Loader2 className="is-spinning" size={24} />
            <span>正在调制推荐卡</span>
          </div>
        )}
        {agentState.status === "error" && (
          <div className="agent-error">
            <AlertCircle size={22} />
            <p>{agentState.message}</p>
            <button type="button" onClick={retry} disabled={!lastPayload}>
              <RotateCcw size={15} /> 重试
            </button>
          </div>
        )}
        {agentState.status === "success" && (
          <article className="agent-card">
            <div className="agent-card-head">
              <span>{agentState.result.emotion}</span>
              <strong>{agentState.result.city_style}</strong>
            </div>
            <h3>{agentState.result.cocktail_name}</h3>
            <dl>
              <div><dt>风味</dt><dd>{agentState.result.flavor_profile}</dd></div>
              <div><dt>视觉</dt><dd>{agentState.result.visual_style}</dd></div>
              <div><dt>理由</dt><dd>{agentState.result.recommendation_reason}</dd></div>
              <div><dt>调酒师</dt><dd>{agentState.result.bartender_note}</dd></div>
            </dl>
            <p>{agentState.result.risk_note}</p>
          </article>
        )}
      </div>
    </section>
  );
}
