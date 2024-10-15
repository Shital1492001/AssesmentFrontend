import { Component } from '@angular/core';
import { BookingService } from '../customServices/booking.service';
import { Router } from '@angular/router';
import { Booking } from '../models/booking';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-show-bookings',
  templateUrl: './show-bookings.component.html',
  styleUrl: './show-bookings.component.css'
})
export class ShowBookingsComponent {
  bookings:Booking[]=[];
  paymentStatus='';
  

  constructor(private bookingService: BookingService,private router:Router,private toastr:ToastrService) {
    
  }

  ngOnInit(): void {
    this.fetchBookings(); 
  }

  
  fetchBookings() {
    const obs=this.bookingService.getBookings();
    console.log(obs);
    obs.subscribe({
      next: (resultData) => {
        console.log("fetch bookings",resultData);
        this.bookings = resultData.bookings;
        
      },
      error: (e) => console.error('Error fetching bookings:', e),
      complete: () => console.info('complete') 
    }
      
    );
  }


  updatePaymentStatus(bookingId: string) {
    console.log("update payment status id",bookingId)
    this.bookingService.updateBookingById(bookingId).subscribe({
      next: (response) => {
        console.log("payment status updated to completed:", response);
        this.fetchBookings(); 
        this.router.navigate(['/dashboard'])
      },
      error: (err) => {
        console.error("Failed to update payment status:", err);
      }
    });
  }

  cancelBooking(bookings:Booking){
    console.log("cancel booking Id:",bookings._id)
    const answer=window.confirm("Do you Really want to Cancel it...?")
    if(answer){
      const obs=this.bookingService.cancelBooking(bookings);
      console.log(obs);
        obs.subscribe({
          next:(resultData)=>{
          console.log("Cancel bookings",resultData);
          this.toastr.success("Booking Cancel Successfully....!","Success");
          this.fetchBookings();
          
          },
          error: (e) => console.error('Error fetching bookings:', e),
          complete: () => console.info('complete') 
        });
      
      }
  }
}
