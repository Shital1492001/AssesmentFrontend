// import { HttpInterceptorFn } from '@angular/common/http';
// import { inject } from '@angular/core';
// import { AuthService } from './auth.service';

// export const authInterceptor: HttpInterceptorFn = (req, next) => {
//   const authService = inject(AuthService); // Use Angular's dependency injection to get the AuthService instance
//   const token = authService.getToken(); // Get the token from AuthService

//   if (token) {
//     // Clone the request and set the Authorization header if the token exists
//     const clonedRequest = req.clone({
//       setHeaders: {
//         Authorization: `Bearer ${token}`, // Add Bearer token
//       },
//     });

//     return next(clonedRequest); // Pass the cloned request to the next handler
//   }

//   return next(req); // If no token, pass the original request
// };
