import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Slot } from '../customClasses/slot';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SlotService {
  private tokenKey = 'authToken'; // Key to store the token in localStorage
  private apiUrl = 'http://localhost:5000/slot/';  // Adjust to your backend URL

  constructor(private http: HttpClient) {}

  // Method to get token from localStorage
  private getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Method to get authorization headers
  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    if (token) {
      return new HttpHeaders({
        Authorization: `Bearer ${token}`
      });
    }
    return new HttpHeaders();  // Return empty headers if no token
  }

  // Fetch all slots
  getSlots(): Observable<Slot[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Slot[]>(`${this.apiUrl}/getall`, { headers })
     
  }

  // Fetch slots by vehicle type
  getSlotsByVehicleType(vehicleType: string): Observable<Slot[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Slot[]>(`${this.apiUrl}/search/${vehicleType}`, { headers })
    
  }

  updateSlotsById(_id: string): Observable<Slot[]> {
    const headers = this.getAuthHeaders();
    const obs=this.http.put<Slot[]>(`${this.apiUrl}/update/${_id}`, { headers });
    return obs;
    
  }
}
