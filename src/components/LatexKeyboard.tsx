import { useState, useEffect, useRef } from "react";
import { BlockMath } from "react-katex";
import { Trash2, Delete } from "lucide-react";
import { useTranslation } from "react-i18next";

interface LatexKeyboardProps {
  value: string;
  onChange: (val: string) => void;
}

const SYMBOL_BUTTONS = [
  "\\cdot", "\\div", "\\times", "+", "-", "=", "\\neq", "\\leq", "\\geq", "(", ")",
];

const FUNCTION_BUTTONS = [
  { label: "\\frac{a}{b}", insert: "\\frac{a}{b}" },
  { label: "\\sqrt{a}", insert: "\\sqrt{a}" },
  { label: "x^a", insert: "^" },
  { label: "x_a", insert: "_" },
  { label: "\\pi", insert: "\\pi" },
  { label: "\\infty", insert: "\\infty" },
  { label: "\\int", insert: "\\int" },
  { label: "\\sum", insert: "\\sum" },
  { label: "\\sin", insert: "\\sin" },
  { label: "\\cos", insert: "\\cos" },
  { label: "\\tan", insert: "\\tan" },
  { label: "\\ln", insert: "\\ln" },
  { label: "\\log", insert: "\\log" },
  { label: "\\left( a \\right)", insert: "\\left( \\right)" },
];

const NUMERIC_BUTTONS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const VARIABLE_BUTTONS = ["x", "y", "z"];

export default function LatexKeyboard({ value, onChange }: LatexKeyboardProps) {
  const { t } = useTranslation();
  const [cursor, setCursor] = useState(value.length);
  const [activeTab, setActiveTab] = useState<"numbers" | "symbols" | "functions">("numbers");
  const inputRef = useRef<HTMLInputElement>(null);

  const insertAtCursor = (text: string) => {
    const before = value.slice(0, cursor);
    const after = value.slice(cursor);
    const newValue = before + text + after;
    onChange(newValue);
    setCursor(cursor + text.length);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target === inputRef.current &&
        !["ArrowLeft", "ArrowRight", "Tab"].includes(e.key)
      ) {
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const renderButtons = () => {
    switch (activeTab) {
      case "numbers":
        return [...VARIABLE_BUTTONS, ...NUMERIC_BUTTONS].map((btn) => (
          <button key={btn} onClick={() => insertAtCursor(btn)} className="bg-[#FFD000] hover:bg-[#FFCA00] transition-all text-black py-2 rounded-lg text-base shadow-sm">
            {btn}
          </button>
        ));
      case "symbols":
        return SYMBOL_BUTTONS.map((btn, i) => (
          <button key={i} onClick={() => insertAtCursor(btn)} className="bg-[#FFD000] hover:bg-[#FFCA00] transition-all text-black p-2 rounded-lg text-xs flex items-center justify-center min-h-[48px] shadow-sm">
            <BlockMath math={btn} />
          </button>
        ));
      case "functions":
        return FUNCTION_BUTTONS.map(({ label, insert }, i) => (
          <button key={i} onClick={() => insertAtCursor(insert)} className="bg-[#FFD000] hover:bg-[#FFCA00] transition-all text-black p-2 rounded-lg text-xs flex items-center justify-center min-h-[48px] shadow-sm">
            <BlockMath math={label} />
          </button>
        ));
    }
  };

  return (
    <div className="w-full space-y-5 text-yellow-100 font-mono">
      <div className="w-full px-4 py-4 bg-yellow-900/20 border border-yellow-600 rounded-xl text-center min-h-[64px] shadow-sm">
        {value.trim() ? (
          <BlockMath math={value} />
        ) : (
          <span className="text-yellow-400 opacity-70">{t("latex.preview")}</span>
        )}
      </div>

      <input
        ref={inputRef}
        type="text"
        value={value}
        readOnly
        onClick={(e) => {
          const target = e.target as HTMLInputElement;
          setCursor(target.selectionStart ?? target.value.length);
        }}
        className="w-full px-4 py-3 rounded-lg bg-zinc-900 border border-yellow-500 text-yellow-100 placeholder-yellow-400 cursor-default select-none shadow-inner"
        placeholder={t("latex.placeholder")}
      />

      <div className="flex gap-2">
        <button onClick={() => setActiveTab("numbers")} className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${activeTab === "numbers" ? "bg-yellow-500 text-black" : "bg-yellow-700 text-yellow-100"}`}>
          {t("latex.tabs.numbers")}
        </button>
        <button onClick={() => setActiveTab("symbols")} className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${activeTab === "symbols" ? "bg-yellow-500 text-black" : "bg-yellow-700 text-yellow-100"}`}>
          {t("latex.tabs.symbols")}
        </button>
        <button onClick={() => setActiveTab("functions")} className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${activeTab === "functions" ? "bg-yellow-500 text-black" : "bg-yellow-700 text-yellow-100"}`}>
          {t("latex.tabs.functions")}
        </button>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
        {renderButtons()}

        <button
          onClick={() => {
            if (value.length > 0 && cursor > 0) {
              const newValue = value.slice(0, cursor - 1) + value.slice(cursor);
              onChange(newValue);
              setCursor((c) => Math.max(0, c - 1));
            }
          }}
          title={t("latex.delete")}
          className="bg-yellow-600 hover:bg-yellow-500 transition-all text-yellow-100 p-2 rounded-lg flex items-center justify-center min-h-[48px] shadow-sm"
        >
          <Delete className="w-5 h-5" />
        </button>

        <button
          onClick={() => {
            onChange("");
            setCursor(0);
          }}
          title={t("latex.clear")}
          className="bg-red-600 hover:bg-red-500 transition-all text-yellow-100 p-2 rounded-lg flex items-center justify-center min-h-[48px] shadow-sm"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}