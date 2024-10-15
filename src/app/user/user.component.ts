import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  createAccountForm: FormGroup;
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router) {
    this.createAccountForm = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        confirmPassword: new FormControl('', Validators.required),
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { mismatch: true };
  };

  createAccount(): void {
    const { email, password, confirmPassword } = this.createAccountForm.value;

    if (this.createAccountForm.valid) {
      if (this.userService.createUser(email, password)) {
        this.router.navigate(['/dashboard']);
      } else {
        this.errorMessage = 'Failed to create an account. Please try again.';
      }
    }
  }
  logout(): void {
    this.userService.logoutUser();
    this.router.navigate(['/login']);
  }
}
