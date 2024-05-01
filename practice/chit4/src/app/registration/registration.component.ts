import { Component } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  username: string;
  email: string;
  password: string;

  constructor(private authService: AuthService) {}

  register(): void {
    // Call the AuthService method for user registration
    this.authService.register(this.username, this.email, this.password)
      .subscribe((response) => {
        // Handle successful registration
        console.log('User registered successfully!', response);
      }, (error) => {
        // Handle registration error
        console.error('Registration failed:', error);
      });
  }
}
