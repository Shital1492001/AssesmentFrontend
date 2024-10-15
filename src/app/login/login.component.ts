import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../customServices/auth.service';  
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if (this.email && this.password) {
      this.authService.login(this.email, this.password).subscribe({
        next: (response) => {
        
          console.log("Login observable",response);
      
          console.log(response._id)
          const id=response._id;
          this.authService.getCurrentUserId(id);
          const token = response.token;
          
          if (token) {
            
            this.authService.storeToken(token);
            this.router.navigate(['/dashboard']);
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
