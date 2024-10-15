import { Injectable } from '@angular/core';
import data from '../assets/books.json';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private localStorageKey = 'books';

  constructor() {}

  addBook(book: any): void {
    const books = this.getBooks();
    books.push(book);
    this.setBooks(books);
  }

  getBooks(): any[] {
    console.log('aqui getBooks');
    console.log({ data });

    return data ? data.books : [];
  }

  updateBook(id: number, updatedBook: any): void {
    const books = this.getBooks();
    const index = books.findIndex((book) => book.id === id);

    if (index !== -1) {
      books[index] = updatedBook;
      this.setBooks(books);
    }
  }

  deleteBook(id: number): void {
    const books = this.getBooks();
    const updatedBooks = books.filter((book) => book.id !== id);
    this.setBooks(updatedBooks);
  }

  private setBooks(books: any[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(books));
  }
}
