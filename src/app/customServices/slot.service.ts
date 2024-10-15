import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Slot } from '../models/slot';
import { Observable} from 'rxjs';
import { AuthService } from './auth.service';

interface SlotData{
  statusCode:number,
  success:boolean,
  message:string,
  slot:Slot[];
}

interface ApiError{
  statusCode:number,
  message:string,
}

@Injectable({
  providedIn: 'root'
})
export class SlotService {
  private tokenKey = 'authToken'; 
  private apiUrl = 'http://localhost:5000/slot';  

  constructor(private http: HttpClient,private authService:AuthService) {}

  // get authorization headers
  // private getAuthHeaders(): HttpHeaders {
  //   const token = this.authService.getToken();
  //   if (token) {
  //     return new HttpHeaders({
  //       Authorization: `Bearer ${token}`
  //     });
  //   }
  //   return new HttpHeaders();  
  // }

  // Fetch all slots
  getSlots(): Observable<SlotData> {
    // const headers = this.getAuthHeaders();
    return this.http.get<SlotData>(`${this.apiUrl}/getall`)
     
  }

  // Fetch slots by vehicle type
  getSlotsByVehicleType(vehicleType: string): Observable<SlotData> {
    // const headers = this.getAuthHeaders();
    return this.http.get<SlotData>(`${this.apiUrl}/search/${vehicleType}`)
    
  }

  updateSlotsById(_id: string): Observable<SlotData> {
    console.log("updated id",_id);
    // const headers = this.getAuthHeaders();
    // console.log("headers",headers);
    
    const obs=this.http.put<SlotData>(`${this.apiUrl}/update/${_id}`,{status:"occupied"});
    console.log("obs",obs);
    
    return obs;
    
  }


  
}
