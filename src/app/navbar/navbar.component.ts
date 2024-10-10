import { Component } from '@angular/core';
import { AuthService } from '../customServices/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(public authService: AuthService, private router: Router) {}

  handleLogout() {
    this.authService.logout();
    this.router.navigate(['/home']); // Redirect to the login page after logout
  }
}