const digits = [
  {
    value: "0",
    segments: [
      1, 2, 3, 5, 9, 10, 13, 14, 15, 17, 19, 20, 21, 24, 25, 29, 31, 32, 33,
    ],
  },
  { value: "1", segments: [3, 8, 13, 18, 23, 28, 33, 7, 11] },
  { value: "2", segments: [1, 2, 3, 9, 14, 5, 26, 22, 18, 30, 31, 32, 33, 34] },
  { value: "3", segments: [1, 2, 3, 9, 14, 5, 18, 17, 25, 31, 32, 33, 29, 24] },
  { value: "4", segments: [3, 8, 13, 18, 23, 7, 11, 15, 28, 33, 20, 21, 22, 24] },
  {
    value: "5",
    segments: [1, 2, 3, 5, 10, 0, 11, 12, 19, 13, 24, 29, 31, 32, 33, 4, 25],
  },
  {
    value: "6",
    segments: [1, 2, 3, 5, 10, 15, 16, 17, 18, 20, 25, 24, 29, 31, 32, 33, 9],
  },
  { value: "7", segments: [0, 1, 2, 3, 4, 9, 13, 17, 22, 27, 32] },
  {
    value: "8",
    segments: [1, 2, 3, 5, 9, 10, 18, 16, 14, 17, 20, 24, 25, 29, 31, 32, 33],
  },
  {
    value: "9",
    segments: [1, 2, 3, 5, 9, 10, 18, 16, 14, 17, 19, 24, 29, 31, 32, 33, 25],
  },
  { value: "-", segments: [16, 17, 18] },
  { value: "/", segments: [1, 2, 3, 5, 9, 10, 13, 14, 15, 17, 19, 20, 21, 24, 25, 29, 31, 32, 33] },
];

export default function GlyphCharacter({
  character,
}: {
  character: number | string;
}) {
  const activeSegments =
    digits.find((d) => d.value === character)?.segments ?? [];
  return (
    <div className="grid grid-cols-5">
      {Array.from({ length: 35 }).map((_, index) => (
        <div
          key={index}
          className={`w-2 h-2 sm:w-2 sm:h-2 md:w-3 md:h-3 lg:w-4 lg:h-4 text-center items-center justify-center border border-gray-900 ${
            activeSegments.includes(index) ? "bg-gray-600!" : "bg-black"
          }`}
        >
        </div>
      ))}
    </div>
  );
}
