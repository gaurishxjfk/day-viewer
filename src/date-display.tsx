import { useParams } from "react-router-dom";
import { format } from "date-fns";
import parseDateInput from "./lib/parse-date-input";
import DigitalDisplay from "./digital-display";

function renderDigitalDate(date: Date, isError: boolean = false) {
  const formattedDate = format(date, "dd-MM-yyyy");
  return (
    <div
      className={`text-black flex flex-col gap-4 bg-black w-full h-screen justify-center items-center`}
    >
      {isError && (
        <div className="text-red-500 text-xl font-bold">
          🤔 That's not a date, that's a mystery! But here's today's date
          anyway.
        </div>
      )}
      <div className="flex flex-row gap-2">
        {formattedDate.split("").map((digit, index) => (
          <DigitalDisplay key={index} character={digit} />
        ))}
      </div>
    </div>
  );
}

export function DateDisplay() {
  const { date } = useParams();

  try {
    if (date) {
      const parsedDate = parseDateInput(date);
      return renderDigitalDate(parsedDate);
    }
  } catch {
    return renderDigitalDate(new Date(), true);
  }

  return renderDigitalDate(new Date());
}
