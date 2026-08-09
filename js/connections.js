export function findConnections(book, allBooks) {
  return allBooks
    .filter((other) => other.id !== book.id)
    .map((other) => {
      const sharedThemes = other.themes.filter((theme) =>
        book.themes.includes(theme)
      );
      const sameAuthor = other.author === book.author;
      return { book: other, sharedThemes, sameAuthor };
    })
    .filter((connection) => connection.sameAuthor || connection.sharedThemes.length > 0)
    .sort((a, b) => b.sharedThemes.length - a.sharedThemes.length);
}
