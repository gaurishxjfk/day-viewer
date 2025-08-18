import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { useState } from "react";
import parseDateInput from "./lib/parse-date-input";
import GlyphCharacter from "./glyph-character";

function handleCopyLink(formattedDate: string, markdownContent: string, setCopied: (copied: boolean) => void) {
  const currentUrl = window.location.origin;
  const encodedContent = encodeURIComponent(markdownContent);
  const clickableLink = `${currentUrl}/${formattedDate.replace(/\//g, "-")}?content=${encodedContent}`;
  const markdownLink = `Date: [${formattedDate.replace(/-/g, "/")}](${clickableLink})`;
  const fullMessage = `${markdownLink}\n${markdownContent}`;
  navigator.clipboard.writeText(fullMessage);
  
  setCopied(true);
  setTimeout(() => setCopied(false), 2000);
}

function renderDigitalDate(date: Date, isError: boolean = false, copied: boolean, setCopied: (copied: boolean) => void, markdownContent: string, setMarkdownContent: (content: string) => void) {
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
      
      <div className="relative mt-4 w-[80%] md:w-fit">
      <div className="absolute top-0 right-0 w-[2px] h-36 bg-gray-900"></div>
        <div className="absolute bottom-1 left-0 w-[2px] h-36 bg-gray-900"></div>
        <div className="absolute bottom-1 left-0 h-[2px] w-[105%] bg-gray-900"></div>
        <div className="absolute top- right-0 h-[2px] w-[105%] bg-gray-900"></div>

      <textarea
        value={markdownContent}
        onChange={(e) => setMarkdownContent(e.target.value)}
        placeholder="Enter your markdown content here..."
        className="w-96 h-32 p-3 bg-[linear-gradient(160deg,#000103,45%,#1e2631,55%,#000103)] text-gray-300 resize-none focus:outline-none"
      />
      </div>
      
      
      <button 
        onClick={() => handleCopyLink(formattedDate, markdownContent, setCopied)}
        className={buttonClasses}
      >
        <div className="absolute top-0 left-0 w-[.5px] h-14 bg-gray-900"></div>
        <div className="absolute bottom-0 right-0 w-[.5px] h-14 bg-gray-900"></div>
        <div className="absolute bottom-0 left-0 h-[.5px] w-32 bg-gray-900"></div>
        <div className="absolute top-0 right-0 h-[.5px] w-32 bg-gray-900"></div>
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
}

export function DateDisplay() {
  const { date } = useParams();
  const [copied, setCopied] = useState(false);
  
  // Get content from URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const contentFromUrl = urlParams.get('content');
  const defaultContent = "Tasks worked on:\n1. \n2. ";
  const [markdownContent, setMarkdownContent] = useState(contentFromUrl ? decodeURIComponent(contentFromUrl) : defaultContent);

  try {
    if (date) {
      const parsedDate = parseDateInput(date);
      return renderDigitalDate(parsedDate, false, copied, setCopied, markdownContent, setMarkdownContent);
    }
  } catch {
    return renderDigitalDate(new Date(), true, copied, setCopied, markdownContent, setMarkdownContent);
  }

  return renderDigitalDate(new Date(), false, copied, setCopied, markdownContent, setMarkdownContent);
}
