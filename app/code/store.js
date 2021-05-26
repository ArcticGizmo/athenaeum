import Vue from "vue";

import * as ApplicationSettings from "@nativescript/core/application-settings";
import { toBook } from "./models";

const UNITS = [
  { label: "mm", scaleToMM: 1 },
  { label: "cm", scaleToMM: 10 },
  { label: "inch", scale: 25.4 }
];

const BOOKS = "disk: books";
const BINDINGS = "disk: bindings";

let ID = 1;
function nextId() {
  const val = ID;
  ID += 1;
  return val;
}

function saveToDisk(key, data) {
  ApplicationSettings.setString(key, JSON.stringify(data || null));
}

function getFromDisk(key, defaultValue = null) {
  return JSON.parse(ApplicationSettings.getString(key) || null) || defaultValue;
}

function removeFromDisk(key) {
  ApplicationSettings.remove(key);
}

class Store {
  constructor() {
    this._bindings = [];
    this._books = [];
    this.load();
  }

  load() {
    this._bindings = getFromDisk(BINDINGS) || [];
    this._books = getFromDisk(BOOKS) || [];

    const ids = this._bindings
      .map(b => b.id)
      .concat(this._books.map(b => b.id));
    ID = Math.max(...ids, 1);
  }

  deleteAll() {
    removeFromDisk(BOOKS);
    removeFromDisk(BINDINGS);
    this._bindings = [];
    this._books = [];
  }

  get units() {
    return UNITS;
  }

  get books() {
    return this._books;
  }

  get bindings() {
    return this._bindings;
  }

  saveBooks(books) {
    this._books = books;
    saveToDisk(BOOKS, books);
  }

  addBook(raw) {
    const book = toBook(nextId(), raw, UNITS);
    console.dir("----- book crated");
    console.dir(book);
    const books = this._books.slice();
    books.push(book);

    this.saveBooks(books);
    return book;
  }

  removeBook(bookId) {
    const books = this._books.filter(b => b.id !== bookId);
    this.saveBooks(books);
  }

  updateBook(book) {
    if (!book.id) {
      return;
    }

    const books = this._books.filter(b => b.id !== book.id);
    books.push(book);
    this.saveBooks(books);
  }

  addBinding(binding) {}

  removeBinding(binding) {
    // this will need to remove it from all other books
  }

  updateBinding(binding) {
    // this may need to recalculate all other book dimensions
  }
}

export default Vue.observable(new Store());
