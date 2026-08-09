import { createBookCard } from "./bookCard.js";
import { findConnections } from "./connections.js";

export function renderBookshelf(books) {
  const shelf = document.getElementById("bookshelf");
  const detail = document.getElementById("book-detail");
  const detailContent = document.getElementById("book-detail-content");
  const closeBtn = document.getElementById("close-detail");

  shelf.innerHTML = "";
  books.forEach((book) => {
    const card = createBookCard(book, (selected, cardEl) =>
      showBookDetail(selected, books, detail, detailContent, cardEl)
    );
    shelf.appendChild(card);
  });

  closeBtn.addEventListener("click", () => closeDetail(detail));

  document.addEventListener("click", (e) => {
    if (detail.classList.contains("hidden")) return;
    if (detail.contains(e.target) || e.target.closest(".book-card")) return;
    closeDetail(detail);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDetail(detail);
  });
}

function closeDetail(detail) {
  detail.classList.add("hidden");
}

function showBookDetail(book, allBooks, detail, detailContent, cardEl) {
  const connections = findConnections(book, allBooks);

  detailContent.innerHTML = `
    <h2>${book.title}</h2>
    <p class="meta">${book.author} &middot; ${book.pages} pages &middot; read ${book.dateRead}</p>
    <p class="meta">Rating: ${"★".repeat(book.rating)}${"☆".repeat(5 - book.rating)}</p>
    <div class="themes">
      ${book.themes.map((theme) => `<span>${theme}</span>`).join("")}
    </div>
    <p>${book.reflections}</p>
    ${renderConnections(connections)}
  `;

  detail.classList.remove("hidden");
  positionDetail(detail, cardEl);
}

function positionDetail(detail, cardEl) {
  const cardRect = cardEl.getBoundingClientRect();
  const detailRect = detail.getBoundingClientRect();
  const margin = 16;

  const spaceBelow = window.innerHeight - cardRect.bottom;
  const spaceAbove = cardRect.top;
  const openBelow = spaceBelow >= detailRect.height + margin || spaceBelow >= spaceAbove;

  const left = Math.min(
    Math.max(cardRect.left + cardRect.width / 2 - detailRect.width / 2, margin),
    window.innerWidth - detailRect.width - margin
  );
  detail.style.left = `${left}px`;

  if (openBelow) {
    detail.style.top = `${cardRect.bottom + margin}px`;
    detail.style.bottom = "auto";
    detail.dataset.position = "below";
  } else {
    detail.style.top = "auto";
    detail.style.bottom = `${window.innerHeight - cardRect.top + margin}px`;
    detail.dataset.position = "above";
  }
}

function renderConnections(connections) {
  if (connections.length === 0) return "";

  const items = connections
    .map(({ book, sharedThemes, sameAuthor }) => {
      const reasons = [
        sameAuthor ? "same author" : null,
        sharedThemes.length > 0 ? `shared themes: ${sharedThemes.join(", ")}` : null,
      ]
        .filter(Boolean)
        .join(" · ");
      return `<li><strong>${book.title}</strong> — ${reasons}</li>`;
    })
    .join("");

  return `
    <h3>Connections</h3>
    <ul class="connections">${items}</ul>
  `;
}
