import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string;
  password: string;

  constructor(private authService: AuthService) {}

  login(): void {
    // Call the AuthService method for user login
    this.authService.login(this.username, this.password)
      .subscribe((response) => {
        // Handle successful login
        console.log('User logged in successfully!', response);
      }, (error) => {
        // Handle login error
        console.error('Login failed:', error);
      });
  }
}
