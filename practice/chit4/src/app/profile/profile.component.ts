import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username: string;
  email: string;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Fetch user profile information when component initializes
    this.authService.getProfile()
      .subscribe((profile) => {
        // Update profile information
        this.username = profile.username;
        this.email = profile.email;
      }, (error) => {
        // Handle error while fetching profile
        console.error('Failed to fetch profile:', error);
      });
  }
}
