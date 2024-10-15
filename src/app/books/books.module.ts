import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <-- Add ReactiveFormsModule here
import { BookListngComponent } from './book-list/book-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // <-- Add ReactiveFormsModule here
  ],
  declarations: [BookListngComponent],
})
export class BooksModule {}
