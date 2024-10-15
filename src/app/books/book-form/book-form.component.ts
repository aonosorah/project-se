import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BookService } from '../../services/books.service'; // Import your BookService
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css'],
})
export class BookFormComponent {
  bookForm: FormGroup;

  ngOnInit(): void {
    this.bookForm = new FormGroup({
      title: new FormControl('', Validators.required),
      author: new FormControl('', Validators.required),
    });
  }
  errorMessage: string = '';

  constructor(private bookService: BookService, private router: Router) {
    // Initialize form with form controls and validators
    this.bookForm = new FormGroup({
      title: new FormControl('', [Validators.required]), // Title required
      author: new FormControl('', [Validators.required]), // Author required
      coverImage: new FormControl('', [Validators.required]), // Cover Image required
    });
  }

  // Method to add a new book
  addBook(): void {
    if (this.bookForm.valid) {
      const { title, author, coverImage } = this.bookForm.value;

      const newBook = {
        id: Date.now(), // Unique ID using timestamp, could be modified
        title,
        author,
        coverImage,
      };

      this.bookService.addBook(newBook); // Call BookService to add book
      this.router.navigate(['/book-list']); // Navigate to book list or wherever you'd like
    } else {
      this.errorMessage = 'Please fill out all required fields.';
    }
  }
}
