import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BookService } from '../../services/books.service';
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
    this.bookForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      author: new FormControl('', [Validators.required]),
      coverImage: new FormControl('', [Validators.required]),
    });
  }

  addBook(): void {
    if (this.bookForm.valid) {
      const { title, author, coverImage } = this.bookForm.value;

      const newBook = {
        id: Date.now(),
        title,
        author,
        coverImage,
      };

      this.bookService.addBook(newBook);
      this.router.navigate(['/book-list']);
    } else {
      this.errorMessage = 'Please fill out all required fields.';
    }
  }
}
