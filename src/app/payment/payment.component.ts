import { Component } from '@angular/core';
import { BookingService } from '../customServices/booking.service';
import { Router } from '@angular/router';
import { Booking } from '../customClasses/booking';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  
  bookings:Booking[]=[];
  paymentStatus='';
  

  constructor(private bookingService: BookingService,private router:Router) {
    
  }
make(){
  this.router.navigate(['/dashboard'])
}

  // makepayment(bookings:Booking[]){
  //   this.paymentStatus='completed'
  //   const obs=this.bookingService.updateBookings(bookings);
  //   console.log(obs);
  // }
}

