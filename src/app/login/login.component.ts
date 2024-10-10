import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../customServices/auth.service';  
import { User } from '../customClasses/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  

  constructor(private authService: AuthService, private router: Router) {}

  // Method called on form submission to handle login
  login() {
    if (this.email && this.password) {
      this.authService.login(this.email, this.password).subscribe({
        next: (response:any) => {
          // Assuming the backend returns a token upon successful login
          console.log(response);
          console.log(response._id)
          const id=response._id;
          this.authService.getCurrentUserId(id);
          const token = response.token;
          if (token) {
            // Store the token and redirect to the desired page
            this.authService.storeToken(token);
            this.router.navigate(['/dashboard']); // Redirect after login success
            console.log("Login successful.");
          }
        },
        error: (err) => {
          console.error("Login failed:", err);
        }
      });
    }
  }
}
