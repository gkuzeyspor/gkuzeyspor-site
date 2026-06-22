const STARTS_WITH_LETTER = /^[a-zçğıöşü]/i;

export default function SmallCaps({ children }: { children: string }) {
  const words = children.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <span key={i}>
          {STARTS_WITH_LETTER.test(word) ? (
            <>
              {word.charAt(0)}
              <span className="text-[0.68em]">{word.slice(1).toLocaleUpperCase("tr-TR")}</span>
            </>
          ) : (
            word
          )}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </>
  );
}
