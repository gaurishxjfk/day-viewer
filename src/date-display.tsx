import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { useState } from "react";
import parseDateInput from "./lib/parse-date-input";
import GlyphCharacter from "./glyph-character";

function handleCopyLink(formattedDate: string, setCopied: (copied: boolean) => void) {
  const currentUrl = window.location.origin;
  const clickableLink = `${currentUrl}/${formattedDate.replace(/\//g, "-")}`;
  navigator.clipboard.writeText(clickableLink);
  
  setCopied(true);
  setTimeout(() => setCopied(false), 2000);
}

function renderDigitalDate(date: Date, isError: boolean = false, copied: boolean, setCopied: (copied: boolean) => void) {
  const formattedDate = format(date, "dd-MM-yyyy");
  
  const buttonClasses = [
    "inline-flex",
    "h-12",
    "animate-shimmer",
    "items-center",
    "justify-center",    
    "bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)]",
    "bg-[length:200%_100%]",
    "px-6",
    "font-medium",
    "text-slate-400",
    "transition-colors",
    "focus:outline-none",
    "mt-6",
    "relative"
  ].join(" ");

  return (
    <div className="w-full overflow-hidden flex flex-col gap-4 bg-black h-screen justify-center items-center">
      {isError && (
        <div className="text-red-500 text-xl font-bold">
          🤔 That's not a date, that's a mystery! But here's today's date
          anyway.
        </div>
      )}
      <div className="flex flex-row gap-2 w-full justify-center items-center ">
        {formattedDate.split("").map((digit, index) => (
          <GlyphCharacter key={index} character={digit} />
        ))}
      </div>
      
      <button 
        onClick={() => handleCopyLink(formattedDate, setCopied)}
        className={buttonClasses}
      >
        <div className="absolute top-0 left-0 w-[.5px] h-14 bg-gray-900"></div>
        <div className="absolute bottom-0 right-0 w-[.5px] h-14 bg-gray-900"></div>
        <div className="absolute bottom-0 left-0 h-[.5px] w-32 bg-gray-900"></div>
        <div className="absolute top-0 right-0 h-[.5px] w-32 bg-gray-900"></div>
        {copied ? "Copied!" : "Copy Date"}
      </button>
    </div>
  );
}

export function DateDisplay() {
  const { date } = useParams();
  const [copied, setCopied] = useState(false);

  try {
    if (date) {
      const parsedDate = parseDateInput(date);
      return renderDigitalDate(parsedDate, false, copied, setCopied);
    }
  } catch {
    return renderDigitalDate(new Date(), true, copied, setCopied);
  }

  return renderDigitalDate(new Date(), false, copied, setCopied);
}
