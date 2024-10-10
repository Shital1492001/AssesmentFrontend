import { Component} from '@angular/core';
import { BookingService } from '../customServices/booking.service';
import { Booking } from '../customClasses/booking';
import { Router } from '@angular/router';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent{
  
  bookings:Booking[]=[];
  paymentStatus='';
  

  constructor(private bookingService: BookingService,private router:Router) {
    
  }

  ngOnInit(): void {
    this.fetchBookings(); 
  }

  
  fetchBookings() {
    const obs=this.bookingService.getBookings();
    console.log(obs);
    obs.subscribe({
      // const a=BookingData{this.statusCode=}
      next: (resultData) => {
        // let a=resultData.timeFrom;
        // resultData.timeFrom=a.toUTCString();
        console.log("fetch bookings",resultData);
        this.bookings = resultData.bookings;
        
      },
      error: (e) => console.error('Error fetching bookings:', e),
      complete: () => console.info('complete') 
    }
      
    );
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
          window.alert("Booking Cancel Successfully....!");
          this.fetchBookings();
          
          },
          error: (e) => console.error('Error fetching bookings:', e),
          complete: () => console.info('complete') 
        });
      
      }
  }

  payment(paymentStatus:string){
    console.log(paymentStatus);
    if(paymentStatus !="completed"){
      this.router.navigate(['/payment']);
    }
    else{
      alert("payment completed....")
    }
    
  }
}
