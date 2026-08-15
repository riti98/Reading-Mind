export function createBookCard(book, onSelect) {
  const spine = book.spine || {};

  const card = document.createElement("div");
  card.className = "book-card";
  card.tabIndex = 0;
  card.setAttribute("role", "button");
  card.setAttribute("aria-label", `${book.title} by ${book.author}`);

  card.style.setProperty("--spine-w", `${spine.width ?? 60}px`);
  card.style.setProperty("--spine-h", `${spine.height ?? 400}px`);
  card.style.setProperty("--spine-bg", spine.color || "var(--color-accent)");
  card.style.setProperty("--spine-color", spine.textColor || "#fff");
  card.style.setProperty("--spine-size", `${spine.fontSize ?? 16}px`);
  card.style.setProperty("--spine-subtitle-size", `${spine.subtitleFontSize ?? 12}px`);
  card.style.setProperty("--spine-weight", spine.fontWeight ?? 500);
  card.style.setProperty("--spine-style", spine.fontStyle || "normal");
  card.style.setProperty("--spine-tracking", `${spine.letterSpacing ?? 0}px`);

  if (book.subtitle) {
    const subtitle = document.createElement("span");
    subtitle.className = "spine-text spine-subtitle";
    subtitle.textContent = book.subtitle;
    card.appendChild(subtitle);
  }

  const title = document.createElement("span");
  title.className = "spine-text spine-title";
  title.innerHTML = renderTitle(book.title, spine.italicWord || book.italicWord);
  card.appendChild(title);

  const select = () => onSelect(book, card);
  card.addEventListener("click", select);
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      select();
    }
  });

  return card;
}

function renderTitle(title, italicWord) {
  const escaped = escapeHtml(title);
  if (!italicWord) return escaped;
  const escapedWord = escapeHtml(italicWord);
  return escaped.replace(new RegExp(`\\b${escapedWord}\\b`), `<em>${escapedWord}</em>`);
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}
