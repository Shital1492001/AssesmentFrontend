import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { ToastrService } from 'ngx-toastr';

export interface UserData{
  statusCode:number,
  success:boolean,
  message:string,
  user:User[],
  _id:string,
  username:string,
  token:string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginFlag=false;
  private tokenKey = 'authToken'; // Key to store the token in localStorage
  private apiUrl = 'http://localhost:5000/user'; 
  private userId ='';

  constructor(private http: HttpClient,private toastr:ToastrService) {}


  // send user details to the backend for registration
  register(username: string, email: string, contactNumber: number, password: string): Observable<UserData> {
    const user = {username, email, contactNumber, password };
    // this.toastr.success("Registration successfully....!")
    return this.http.post<UserData>(`${this.apiUrl}/register`, user);  
  }


  // sends the login credentials to the backend
  login(email: string, password: string): Observable<UserData> {
     this.loginFlag=true;
    const credentials = { email, password };
    this.toastr.success("You Logged in successfully....!","Success")
    const obs=this.http.post<UserData>(`${this.apiUrl}/login`, credentials);  
    return obs;

  }

  // Method to store token in localStorage
  storeToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
    console.log("Token stored:", token);
    // this.getToken();
    
  }

  //  retrieve the token
  getToken(): string | null {
    const token = localStorage.getItem(this.tokenKey);
    console.log("Retrieved token:", token);
    return token;
  }

  // check login status based on token presence
  getLoginStatus(): boolean {
    return localStorage.getItem(this.tokenKey) !==null;
  }

  // remove token on logout
  logout() {
    this.loginFlag=false;
    this.toastr.success("Logout successfully....!","Success");
    localStorage.removeItem(this.tokenKey);
    
    console.log("User logged out. Token removed.");
    console.log(this.tokenKey)
  }
  // get logFlag(){
  //   return this.loginFlag;
  // }

   // get the current user's ID
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
