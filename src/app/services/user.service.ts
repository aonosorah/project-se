import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private localStorageKey = 'users'; // Key to store users
  private loggedInUserKey = 'loggedInUser'; // Key to store logged-in user

  constructor() {}

  // Register a new user (email and password)
  createUser(email: string, password: string): boolean {
    const users = this.getUsers(); // Get existing users
    const userExists = users.some((user) => user.email === email); // Check if user already exists

    if (userExists) {
      return false; // User with the same email already exists
    }

    const newUser = { email, password };
    users.push(newUser); // Add new user to users array
    this.setUsers(users); // Save updated users in LocalStorage
    return true;
  }

  // Login user by checking email and password
  loginUser(email: string, password: string): boolean {
    const users = this.getUsers();
    const user = users.find(
      (u: any) => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem(this.loggedInUserKey, JSON.stringify(user)); // Save logged-in user info
      return true; // Login success
    }

    return false; // Invalid credentials
  }

  // Check if a user is logged in
  isLoggedIn(): boolean {
    return localStorage.getItem(this.loggedInUserKey) !== null;
  }

  // Get the current logged-in user
  getLoggedInUser(): any {
    const user = localStorage.getItem(this.loggedInUserKey);
    return user ? JSON.parse(user) : null;
  }

  // Log out user (remove the session)
  logoutUser(): void {
    localStorage.removeItem(this.loggedInUserKey); // Remove user info from LocalStorage
  }

  // Helper to get users from LocalStorage
  private getUsers(): any[] {
    const data = localStorage.getItem(this.localStorageKey);
    return data ? JSON.parse(data) : [];
  }

  // Helper to save users in LocalStorage
  private setUsers(users: any[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(users));
  }
}
