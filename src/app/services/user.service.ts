import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private localStorageKey = 'users';
  private loggedInUserKey = 'loggedInUser';
  location: any;

  constructor(private userService: UserService) {}

  createUser(email: string, password: string): boolean {
    const users = this.getUsers();
    const userExists = users.some((user) => user.email === email);

    if (userExists) {
      return false;
    }

    const newUser = { email, password };
    users.push(newUser);
    this.setUsers(users);
    return true;
  }

  loginUser(email: string, password: string): boolean {
    const users = this.getUsers();
    const user = users.find(
      (u: any) => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem(this.loggedInUserKey, JSON.stringify(user));
      return true;
    }

    return false;
  }

  goBack(): void {
    this.location.back();
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(this.loggedInUserKey) !== null;
  }

  getLoggedInUser(): any {
    const user = localStorage.getItem(this.loggedInUserKey);
    return user ? JSON.parse(user) : null;
  }

  logoutUser(): void {
    console.log('UserService: logging out...'); // Debug message
    localStorage.removeItem(this.loggedInUserKey);
  }

  private getUsers(): any[] {
    const data = localStorage.getItem(this.localStorageKey);
    return data ? JSON.parse(data) : [];
  }

  private setUsers(users: any[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(users));
  }
}
