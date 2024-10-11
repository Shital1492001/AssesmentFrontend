import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking } from '../customClasses/booking';
import { Slot } from '../customClasses/slot';

export interface weekly{
  _id:number,
  totalBookings:number,
  totalAmount:number

}

export interface monthly{
  _id:number,
  totalBookings:number,
  totalAmount:number

}
interface statss{
  statusCode:number,
  success:boolean,
  message:string,
  statsw:weekly[];
  statsm:monthly[];
    // monthlyStats:weekly[];
  
  
}
// const stats={
//   weeklyStats[];
// }
interface BookingData{
  statusCode:number,
  message:string,
  bookings:Booking[];
}

interface SlotData{
  statusCode:number,
  success:boolean,
  message:string,
  slot:Slot[];
}



@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private tokenKey = 'authToken';
  private apiUrl = 'http://localhost:5000/booking'; 

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

  book(userId: string, slotId: string,vehicleType:string,timeFrom:Date,timeTo:Date,totalAmount:Number): Observable<BookingData> {
   const headers = this.getAuthHeaders();
   const credentials = { userId, slotId,vehicleType,timeFrom,timeTo,totalAmount };
   return this.http.post<BookingData>(`${this.apiUrl}/add`, credentials,{headers});  // Make a POST request to the backend for login
 }

  getBookings(): Observable<BookingData> {
    const headers = this.getAuthHeaders();
    const obs=this.http.get<BookingData>(`${this.apiUrl}/getall`, { headers }) 
    console.log("get Bookings...",obs)
    return obs;
  }

  cancelBooking(bookings:Booking): Observable<BookingData> {
    const headers = this.getAuthHeaders();
    const obs=this.http.delete<BookingData>(`${this.apiUrl}/delete/${bookings._id}`, { headers }) 
    // console.log("delete Booking...",obs)
    return obs;
  }

  getBookingStats(year: string): Observable<statss> {
    const headers = this.getAuthHeaders();
    const obs=this.http.get<statss>(`${this.apiUrl}/stats/${year}`,{ headers });
    console.log("Stats...",obs);
    return obs;
  }


  // updateSlotsById(_id: string): Observable<SlotData> {
  //   console.log("updated id",_id);
  //   const headers = this.getAuthHeaders();
  //   console.log("headers",headers);
    
  //   const obs=this.http.put<SlotData>(`${this.apiUrl}/update/${_id}`, { headers });
  //   console.log("obs",obs);
    
  //   return obs;
    
  // }

  
  // updateBookings(booking:Booking[]) :Observable<Booking[]>{
  //   const headers = this.getAuthHeaders();
  //   // const id ={booking._id};
  //   const obs=this.http.put<Booking[]>(`${this.apiUrl}/update/${booking._id}`,booking, { headers }) 
  //   // console.log("get Bookings...",obs)
  //   return obs;
  // }
}
