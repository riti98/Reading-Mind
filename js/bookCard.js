export function createBookCard(book, onSelect) {
  const card = document.createElement("div");
  card.className = "book-card";
  card.style.backgroundColor = book.color || "var(--color-accent)";
  card.tabIndex = 0;
  card.setAttribute("role", "button");
  card.setAttribute("aria-label", `${book.title} by ${book.author}`);

  const title = document.createElement("span");
  title.className = "book-title";
  title.textContent = book.title;
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
