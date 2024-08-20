import { useState } from "react";
import { toCurrency } from "../../utils/toCurrency";

export interface CurrencyInputProps {
  /**
   * HTML name
   */
  name?: string;
  /**
   * Initial value for this component
   */
  defaultValue?: number;
  /**
   * Value setter
   */
  onChange: (value: number) => void;
  /**
   * Currency you're handling
   */
  currency?: string;
  /**
   * Number formatting from your location. Example: en-US
   */
  locale?: string;
  /**
   * Use for Validation
   */
  required?: boolean;
  /**
   * Prevent actions
   */
  disabled?: boolean;
}
export function CurrencyInput({
  name,
  onChange,
  defaultValue = 0,
  locale = "pt-BR",
  currency = "BRL",
  required,
  disabled,
}: CurrencyInputProps) {
  const [displayValue, setDisplayValue] = useState(
    defaultValue?.toFixed(2).replace(/\D/g, "") || ""
  );
  const numericValue = Number(displayValue) / 100;

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const numbers = e.clipboardData.getData("text/plain").replace(/\D/g, "");
    if (numbers.trim()) setDisplayValue(numbers);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Delete" || e.key === "Backspace") {
      const hasSelection =
        e.currentTarget.selectionStart !== e.currentTarget.selectionEnd;
      if (hasSelection) {
        setDisplayValue("");
        return;
      }
    }
    if (e.key === "Backspace") {
      const value = displayValue
        .split("")
        .filter((_, i) => i < displayValue.length - 1)
        .join("");
      setDisplayValue(value);
    }
    if ("0123456789".includes(e.key)) {
      setDisplayValue(displayValue + e.key);
    }
  };

  return (
    <input
      name={name}
      className="outline-0 bg-transparent flex-1 text-slate-900 text-sm placeholder:text-slate-500 disabled:opacity-50 disabled:cursor-not-allowed"
      inputMode="numeric"
      type="text"
      onChange={(e) => {
        e.preventDefault();
        onChange(numericValue);
      }}
      value={toCurrency(numericValue, { locale, currency })}
      onPaste={handlePaste}
      onKeyDown={handleKeyDown}
      required={required}
      disabled={disabled}
    />
  );
}
