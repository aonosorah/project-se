import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private router: Router) {}
  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToCreateAccount() {
    this.router.navigate(['/create-account']);
  }
}
