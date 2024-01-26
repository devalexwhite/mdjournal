export default function Footer() {
  return (
    <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs flex-col">
      <p>
        an app by{" "}
        <a
          href="https://github.com/devalexwhite"
          target="_blank"
          className="font-bold hover:underline"
        >
          Alex White
        </a>
      </p>
      <p className="text-xs font-light">
        <a
          href="https://github.com/devalexwhite/mdjournal"
          target="_blank"
          className="font-bold underline"
        >
          contribute on Github
        </a>{" "}
        or{" "}
        <a
          href="https://www.buymeacoffee.com/devalexwhite"
          target="_blank"
          className="font-bold underline"
        >
          sponsor to keep the lights on.
        </a>
      </p>
    </footer>
  );
}
