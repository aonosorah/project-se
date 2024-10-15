import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BookService } from '../../services/books.service';
import { BooksModule } from '../books.module';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListngComponent implements OnInit {
  books: any[] = [];
  bookForm!: FormGroup;
  userService: any;
  router: any;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadBooks();

    this.bookForm = new FormGroup({
      title: new FormControl('', Validators.required),
      author: new FormControl('', Validators.required),
      coverImage: new FormControl('', Validators.required),
    });
  }

  loadBooks(): void {
    this.books = this.bookService.getBooks();
  }

  addBook(): void {
    if (this.bookForm.valid) {
      const newBook = {
        id: this.books.length + 1,
        title: this.bookForm.get('title')?.value,
        author: this.bookForm.get('author')?.value,
        coverImage: this.bookForm.get('coverImage')?.value,
      };

      this.bookService.addBook(newBook);
      this.loadBooks();

      this.bookForm.reset();
    }
  }

  updateBook(
    id: number,
    title: string,
    author: string,
    coverImage: string
  ): void {
    const updatedBook = { id, title, author, coverImage };
    this.bookService.updateBook(id, updatedBook);
    this.loadBooks();
  }

  deleteBook(id: number): void {
    this.bookService.deleteBook(id);
    this.loadBooks();
  }

  logout(): void {
    this.userService.logoutUser();
    this.router.navigate(['/login']);
  }
}
