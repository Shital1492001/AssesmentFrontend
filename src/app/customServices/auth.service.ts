import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../customClasses/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginFlag=false;
  private tokenKey = 'authToken'; // Key to store the token in localStorage
  private apiUrl = 'http://localhost:5000/user'; // Backend API URL for login
  private userId ='';

  constructor(private http: HttpClient) {}


  // Register method to send user details to the backend for registration
  register(username: string, email: string, contactNumber: number, password: string): Observable<User[]> {
    const user = {username, email, contactNumber, password };
    return this.http.post<User[]>(`${this.apiUrl}/register`, user);  // Make POST request to register
  }


  // Login method that sends the login credentials to the backend
  login(email: string, password: string): Observable<User[]> {
     this.loginFlag=true;
    const credentials = { email, password };
    alert("You Logged in successfully....!")
    return this.http.post<User[]>(`${this.apiUrl}/login`, credentials);  // Make a POST request to the backend for login
  }

  // Method to store token in localStorage
  storeToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
    console.log("Token stored:", token);
  }

  // Method to retrieve the token
  getToken(): string | null {
    const token = localStorage.getItem(this.tokenKey);
    console.log("Retrieved token:", token);
    return token;
  }

  // Method to check login status based on token presence
  getLoginStatus(): boolean {
    return localStorage.getItem(this.tokenKey) !==null;
  }

  // Method to remove token on logout
  logout() {
    this.loginFlag=false;
    localStorage.removeItem(this.tokenKey);
    alert("Logout successfully....!")
    console.log("User logged out. Token removed.");
    console.log(this.tokenKey)
  }
  // get logFlag(){
  //   return this.loginFlag;
  // }

   // Method to get the current user's ID
  getCurrentUserId(id:string) {
    localStorage.setItem(this.userId, id);
    // console.log("UserId stored:", id);
}
getuserId(): string | null {
  const userId = localStorage.getItem(this.userId);
  console.log("current UserID:", userId);
  return userId;
}

}
