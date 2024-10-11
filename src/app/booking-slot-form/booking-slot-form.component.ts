import { Component } from '@angular/core';
import { Slot } from '../customClasses/slot';
import { SlotService } from '../customServices/slot.service';
import { AuthService } from '../customServices/auth.service';
import { BookingService } from '../customServices/booking.service';
import { Router } from '@angular/router';
import { Booking } from '../customClasses/booking';

@Component({
  selector: 'app-booking-slot-form',
  templateUrl: './booking-slot-form.component.html',
  styleUrl: './booking-slot-form.component.css'
})
export class BookingSlotFormComponent {
  vehicleType: string = 'select';  
  timeFrom: Date=new Date() ;
  timeTo: Date=new Date() 
  slots: Slot[] = [];
  bookings: Booking[] = [];
  selectedSlotId: string ='';  
  selectedUserId:string |null=null;
  totalAmount=0;
  paymentStatus='';
  


  constructor(private slotService: SlotService,private authService: AuthService,private bookingService:BookingService,private router:Router) {}

  ngOnInit(): void {
    this.fetchSlots();
    this.setUserId();
  }

  fetchSlots() {
    this.slotService.getSlots().subscribe({
      
      next: (resultData) =>{
        console.log("resultdata",resultData)
        this.slots = resultData.slot;
      },
         
      error: (e) => console.error('Error fetching slots:', e),
      complete: () => console.info('complete') 
    }
      
    );
  }

  // updateSlots(_id:string){
  //   console.log("fdsdf",_id);
  //   this.bookingService.updateSlotsById(_id).subscribe({
  //     next: (response) => {
  //       console.log('update slots:', response); 
  //       // this.fetchSlots();
  //       if (response) 
  //         this.slots = response.slot; 
  //       this.fetchSlots();
  //       // } else {
  //       //   console.error('Expected an array but got:', response);
  //       //   this.slots = []; 
  //       // }
  //     },
  //     error: (e) => console.error('Error updating slots by Id:', e),
  //     complete: () => console.info('Slots updating by Id successfully')
  //   });
  // }

  setUserId() {
    // Assuming your AuthService has a method to get the current user
    this.selectedUserId = this.authService.getuserId();  // Fetch the current user's ID
    console.log('Selected User ID:', this.selectedUserId); // Log the selected user ID
  }

  fetchSlotsByVehicleType(vehicleType: string) {
    if (vehicleType) {
      this.slotService.getSlotsByVehicleType(vehicleType).subscribe({
        next: (response) => {
          console.log('Fetched slots:', response); // Log the response
          // if (Array.isArray(response)) {
            this.slots = response.slot; // Only assign if it's an array
          // } else {
          //   console.error('Expected an array but got:', response);
          //   this.slots = []; // Reset slots if the response is not valid
          // }
        },
        error: (e) => console.error('Error fetching slots by vehicle type:', e),
        complete: () => console.info('Slots fetched by vehicle type successfully')
      });
    }
  }

  selectSlot(slot: Slot) {
    if (slot.status === 'available') {
      this.selectedSlotId = slot._id;  // Set selected slot
    }
  }

  // Method to get dynamic CSS class based on status
  getSlotClass(slot: Slot) {
    if (this.selectedSlotId === slot._id) {
      console.log("selected Slot Id:",this.selectedSlotId);
      return 'slot-selected';  // Yellow for selected slot
    } else if (slot.status === 'available') {
      return 'slot-available';  // Green for available slot
    } else if (slot.status === 'occupied' ) {
      return 'slot-occupied';  // Red for occupied slot
    }
    return slot;  // Default class
  }

  calculatedAmount(): number {
    if (!this.timeFrom || !this.timeTo || !this.slots) {
      return 0; // Return 0 if any required field is missing
    }

    // Convert timeFrom and timeTo to Date objects
    const startTime = new Date(this.timeFrom);
    const endTime = new Date(this.timeTo);

    // Calculate the difference in hours
    const diffInMs = endTime.getTime() - startTime.getTime();
    console.log("diffInMs",diffInMs);
    const durationInHours = diffInMs / (1000 * 60 * 60); // Convert from milliseconds to hours
    console.log("durationInHours",durationInHours);

    // Calculate the total amount
    const baseAmount = this.vehicleType === '2 Wheeler' ? 50 : 100;
    this.totalAmount = (durationInHours) * (baseAmount);

    return (this.totalAmount);
  }

  book(){
  console.log(this.selectedUserId)
  if(this.selectedUserId && this.selectedSlotId && this.vehicleType && this.timeFrom && this.timeTo &&this.totalAmount){
    this.bookingService.book(this.selectedUserId ,this.selectedSlotId , this.vehicleType , this.timeFrom , this.timeTo ,this.totalAmount).subscribe({
      next:(response)=>{
        console.log("Slot booked successfully:",response);
        alert("Slot booked successfully!");
        // this.updateSlots(this.selectedSlotId);
        this.router.navigate(['/showbookings']);
        // this.updateSlots(this.selectedSlotId)
      },
      error:(err)=>{
        console.log(this.selectedUserId)
        console.error("booking failed..",err);
        alert("booking Failed");
      }
    });
  }
     
  }

  
}
