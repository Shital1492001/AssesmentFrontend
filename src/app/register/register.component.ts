import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../customServices/auth.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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
  
  constructor(private authService: AuthService, private router: Router,private toastr:ToastrService) {}

  save(form:NgForm) {
    console.log(form);
    if (form.value.username && form.value.email && form.value.contactNumber && form.value.password) {
      this.authService.register(form.value.username, form.value.email, form.value.contactNumber, form.value.password).subscribe({
        next: (response) => {
           if (this.model.password !== this.model.confirmPassword) {
            this.toastr.error("Passwords do not match! Please re-enter.");
          } else{
          console.log("Registration successful:", response);
          this.toastr.success("Registration successful! Please login.","Success");
          this.router.navigate(['/login']); 
          } 
        },
        error: (err) => {
          console.error("Registration failed:", err);
          this.toastr.error("Registration failed...Please try again...","Error");
          this.router.navigate(["/register"])
        }
      });
    }
    
  }
}
