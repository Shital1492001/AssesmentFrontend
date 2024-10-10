import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../customServices/auth.service'; // Adjust the path according to your project structure

export function authenticationGuard(): boolean {
    const authService = inject(AuthService);
    const router = inject(Router);

    const isLoggedIn = authService.getLoginStatus(); // Check if the user is logged in
    if (!isLoggedIn) {
        alert("Please Login First....!")
        router.navigate(['/home']); // Redirect to login if not logged in
    }
    return isLoggedIn;
}
