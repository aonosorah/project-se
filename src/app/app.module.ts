import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BooksModule } from './books/books.module';
import { routes } from './app.routes';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    FormsModule,

    RouterModule.forRoot(routes),
    ReactiveFormsModule,
  ],
})
export class AppModule {}
