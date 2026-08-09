import { createBookCard } from "./bookCard.js";
import { findConnections } from "./connections.js";

export function renderBookshelf(books) {
  const shelf = document.getElementById("bookshelf");
  const detail = document.getElementById("book-detail");
  const detailContent = document.getElementById("book-detail-content");
  const closeBtn = document.getElementById("close-detail");

  shelf.innerHTML = "";
  books.forEach((book) => {
    const card = createBookCard(book, (selected) =>
      showBookDetail(selected, books, detail, detailContent)
    );
    shelf.appendChild(card);
  });

  closeBtn.addEventListener("click", () => detail.classList.add("hidden"));
}

function showBookDetail(book, allBooks, detail, detailContent) {
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
