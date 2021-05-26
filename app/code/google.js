import axios from "axios";

const BASE = "https://www.googleapis.com/books/v1/volumes";

export function getByISBN(isbn) {
  const query = `${BASE}?q=isbn:${isbn}`;
  return axios.get(query).then(resp => {
    return parseBook(resp.data.items[0], isbn);
  });
}

function parseBook(raw, isbn) {
  if (!raw) {
    return null;
  }

  const info = raw.volumeInfo;

  return {
    title: info.title,
    authors: info.authors,
    blurb: info.description,
    isbn,
    pages: info.pageCount,
  };
}
