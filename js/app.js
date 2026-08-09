import { renderBookshelf } from "./bookshelf.js";

async function loadBooks() {
  const response = await fetch("data/books.json");
  if (!response.ok) {
    throw new Error(`Failed to load books.json: ${response.status}`);
  }
  return response.json();
}

async function init() {
  try {
    const books = await loadBooks();
    renderBookshelf(books);
  } catch (err) {
    document.getElementById("bookshelf").textContent =
      "Couldn't load your books. Check the console for details.";
    console.error(err);
  }
}

init();
