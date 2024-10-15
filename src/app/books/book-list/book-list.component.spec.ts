import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookListngComponent } from './book-list.component';

describe('BookListngComponent', () => {
  let component: BookListngComponent;
  let fixture: ComponentFixture<BookListngComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookListngComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BookListngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
