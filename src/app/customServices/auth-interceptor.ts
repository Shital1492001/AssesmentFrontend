import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService,private router:Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log("Inside Interceptor...........");

    // Getting token from AuthService
    const authToken = this.authService.getToken();

    if (authToken) {
      // If token is present, clone the request and add the Authorization header
      const authRequest = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${authToken}`)
      });
      console.log("Token present, sending request with token:", authRequest);
      return next.handle(authRequest);
    } else {
      this.router.navigate(['/login'])
      return next.handle(req); // Without token, or you can return an error here
    }
  }
}
