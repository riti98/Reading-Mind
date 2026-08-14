import { createBookCard } from "./bookCard.js";

let activeCardEl = null;

export function renderBookshelf(books) {
  const shelf = document.getElementById("bookshelf");
  const detail = document.getElementById("book-detail");
  const detailContent = document.getElementById("book-detail-content");
  const closeBtn = document.getElementById("close-detail");

  shelf.innerHTML = "";
  const row = document.createElement("div");
  row.className = "shelf-row";
  books.forEach((book) => {
    const card = createBookCard(book, (selected, cardEl) =>
      showBookDetail(selected, detail, detailContent, cardEl)
    );
    row.appendChild(card);
  });
  shelf.appendChild(row);

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
  if (activeCardEl) {
    activeCardEl.classList.remove("active");
    activeCardEl.parentElement.classList.remove("has-active");
    activeCardEl = null;
  }
}

function showBookDetail(book, detail, detailContent, cardEl) {
  detailContent.innerHTML = renderBookDetail(book);

  if (activeCardEl) activeCardEl.classList.remove("active");
  cardEl.classList.add("active");
  cardEl.parentElement.classList.add("has-active");
  activeCardEl = cardEl;

  detail.classList.remove("hidden");
  positionDetail(detail, cardEl);
}

const STAR_ICON = `<svg class="detail-star" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.62L12 2L9.19 8.62L2 9.24L7.46 13.97L5.82 21L12 17.27Z" /></svg>`;

function renderBookDetail(book) {
  const blocks = [];

  blocks.push(`
    <div class="detail-title-block">
      <h2 class="detail-title">${escapeHtml(book.fullTitle || book.title)}</h2>
      ${book.author ? `<p class="detail-author">Written by ${escapeHtml(book.author)}</p>` : ""}
    </div>
  `);

  if (book.honor) {
    blocks.push(`
      <div class="detail-award">
        ${STAR_ICON}
        <p>${escapeHtml(book.honor)}</p>
      </div>
    `);
  }

  const metaLines = [];
  if (book.pages || book.publishedDate || book.publisher) {
    const bits = [];
    if (book.pages) bits.push(`Pages: ${book.pages}`);
    if (book.publishedDate) {
      bits.push(`Published: ${book.publishedDate}${book.publisher ? ` (${escapeHtml(book.publisher)})` : ""}`);
    }
    metaLines.push(`<p class="detail-meta-line">${bits.join(" | ")}</p>`);
  }
  const statLines = [];
  if (book.dateRead) statLines.push(`<strong>Date Read:</strong> ${escapeHtml(book.dateRead)}`);
  if (book.daysToRead) statLines.push(`<strong>Days to Read:</strong> ${escapeHtml(book.daysToRead)}`);
  if (book.themes && book.themes.length) {
    statLines.push(`<strong>Themes:</strong> ${book.themes.map(escapeHtml).join(", ")}`);
  }
  if (statLines.length) metaLines.push(`<p class="detail-meta-line">${statLines.join("<br>")}</p>`);

  if (metaLines.length) {
    blocks.push(`<div class="detail-meta">${metaLines.join("")}</div>`);
  }

  if (book.reflections) {
    blocks.push(`<p class="detail-reflection">${escapeHtml(book.reflections)}</p>`);
  }

  return blocks.join('<div class="detail-divider"></div>');
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function positionDetail(detail, cardEl) {
  const cardRect = cardEl.getBoundingClientRect();
  const detailRect = detail.getBoundingClientRect();
  const margin = 12;
  const offset = 25;

  const left = Math.min(
    Math.max(cardRect.left - offset, margin),
    window.innerWidth - detailRect.width - margin
  );
  const top = Math.min(
    Math.max(cardRect.top + offset, margin),
    window.innerHeight - detailRect.height - margin
  );

  detail.style.left = `${left}px`;
  detail.style.top = `${top}px`;
  detail.style.bottom = "auto";
}
