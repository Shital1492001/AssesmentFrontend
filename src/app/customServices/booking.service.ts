import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking } from '../models/booking';
import { AuthService } from './auth.service';

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
export interface statss{
  statusCode:number,
  success:boolean,
  message:string,
  statsw:weekly[];
  statsm:monthly[];
    // monthlyStats:weekly[];
  
  
}

interface BookingData{
  statusCode:number,
  message:string,
  bookings:Booking[];
}

// interface SlotData{
//   statusCode:number,
//   success:boolean,
//   message:string,
//   slot:Slot[];
// }



@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private tokenKey = 'authToken';
  private apiUrl = 'http://localhost:5000/booking'; 

  constructor(private http: HttpClient,private authService:AuthService) {}
  //  get token from localStorage
  // private getToken(): string | null {
  //   return localStorage.getItem(this.tokenKey);
  // }
  

  //  get authorization headers
  // private getAuthHeaders(): HttpHeaders {
  //   const token = this.authService.getToken();
  //   if (token) {
  //     return new HttpHeaders({
  //       Authorization: `Bearer ${token}`
  //     });
  //   }
  //   return new HttpHeaders();  
  // }

  book(userId: string, slotId: string,vehicleType:string,timeFrom:Date,timeTo:Date,totalAmount:Number): Observable<BookingData> {
  //  const headers = this.getAuthHeaders();
   const credentials = { userId, slotId,vehicleType,timeFrom,timeTo,totalAmount };
   return this.http.post<BookingData>(`${this.apiUrl}/add`, credentials);  
 }

  getBookings(): Observable<BookingData> {
    // const headers = this.getAuthHeaders();
    console.log("Headers in getBookings....");
    const obs=this.http.get<BookingData>(`${this.apiUrl}/getall`)
    console.log("get Bookings...",obs)
    return obs;
  }

  cancelBooking(bookings:Booking): Observable<BookingData> {
    // const headers = this.getAuthHeaders();
    const obs=this.http.delete<BookingData>(`${this.apiUrl}/delete/${bookings._id}`) 
    // console.log("delete Booking...",obs)
    return obs;
  }

  getBookingStats(year: string): Observable<statss> {
    // const headers = this.getAuthHeaders();
    const obs=this.http.get<statss>(`${this.apiUrl}/stats/${year}`);
    console.log("Stats...",obs);
    return obs;
  }

  updateBookingById(_id:string) :Observable<BookingData>{
    // const headers = this.getAuthHeaders();
    // const id ={booking._id};
    const obs=this.http.put<BookingData>(`${this.apiUrl}/update/${_id}`,{paymentStatus:"Completed"}) 
    // console.log("get Bookings...",obs)
    return obs;
  }
}
