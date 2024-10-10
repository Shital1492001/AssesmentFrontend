import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../customServices/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  model={
  username:  '',
  email: '',
  contactNumber: 0,
  password: '',
  confirmPassword:''
  }
  
  constructor(private authService: AuthService, private router: Router) {}

  save(form:NgForm) {
    console.log(form);
    if (form.value.username && form.value.email && form.value.contactNumber && form.value.password) {
      this.authService.register(form.value.username, form.value.email, form.value.contactNumber, form.value.password).subscribe({
        next: (response) => {
           if (this.model.password !== this.model.confirmPassword) {
            alert("Passwords do not match! Please re-enter.");
          } else{
          console.log("Registration successful:", response);
          alert("Registration successful! Please login.");
          this.router.navigate(['/login']); 
          } // Redirect to login page after successful registration
        },
        error: (err) => {
          console.error("Registration failed:", err);
          alert("Registration failed...Please try again...");
        }
      });
    }
    
  }
}
