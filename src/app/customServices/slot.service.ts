import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Slot } from '../customClasses/slot';
import { Observable} from 'rxjs';

interface SlotData{
  statusCode:number,
  success:boolean,
  message:string,
  slot:Slot[];
}

@Injectable({
  providedIn: 'root'
})
export class SlotService {
  private tokenKey = 'authToken'; // Key to store the token in localStorage
  private apiUrl = 'http://localhost:5000/slot';  // Adjust to your backend URL

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
  getSlots(): Observable<SlotData> {
    const headers = this.getAuthHeaders();
    return this.http.get<SlotData>(`${this.apiUrl}/getall`, { headers })
     
  }

  // Fetch slots by vehicle type
  getSlotsByVehicleType(vehicleType: string): Observable<SlotData> {
    const headers = this.getAuthHeaders();
    return this.http.get<SlotData>(`${this.apiUrl}/search/${vehicleType}`, { headers })
    
  }

  updateSlotsById(_id: string, status:string): Observable<SlotData> {
    console.log("updated id",_id);
    const headers = this.getAuthHeaders();
    console.log("headers",headers);
    
    const obs=this.http.put<SlotData>(`${this.apiUrl}/update/${_id}`,{status}, { headers });
    console.log("obs",obs);
    
    return obs;
    
  }
}
