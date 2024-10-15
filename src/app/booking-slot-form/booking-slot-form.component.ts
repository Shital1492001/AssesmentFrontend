import { Component } from '@angular/core';
import { Slot } from '../models/slot';
import { SlotService } from '../customServices/slot.service';
import { AuthService } from '../customServices/auth.service';
import { BookingService } from '../customServices/booking.service';
import { Router } from '@angular/router';
import { Booking } from '../models/booking';
import { ToastrService } from 'ngx-toastr';

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
  


  constructor(private slotService: SlotService,private authService: AuthService,private bookingService:BookingService,private router:Router,private toastr:ToastrService) {}

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

  updateSlotStatus(slotId: string) {
    this.slotService.updateSlotsById(slotId).subscribe({
      next: (response) => {
        console.log("Slot status updated to occupied:", response);
        this.fetchSlots(); 
      },
      error: (err) => {
        console.error("Failed to update slot status:", err);
      }
    });
  }


  setUserId() {
    
    this.selectedUserId = this.authService.getuserId();  
    console.log('Selected User ID:', this.selectedUserId); 
  }

  fetchSlotsByVehicleType(vehicleType: string) {
    if (vehicleType) {
      this.slotService.getSlotsByVehicleType(vehicleType).subscribe({
        next: (response) => {
          console.log('Fetched slots:', response); 
          
            this.slots = response.slot; 
          
        },
        error: (e) => console.error('Error fetching slots by vehicle type:', e),
        complete: () => console.info('Slots fetched by vehicle type successfully')
      });
    }
  }

  selectSlot(slot: Slot) {
    if (slot.status === 'available') {
      this.selectedSlotId = slot._id;  // Set selected slot id
    }
  }

  getSlotClass(slot: Slot) {
    if (this.selectedSlotId === slot._id) {
      console.log("selected Slot Id:",this.selectedSlotId);
      return 'slot-selected';  // Yellow for selected slot
    } else if (slot.status === 'available') {
      return 'slot-available';  // Green for available slot
    } else if (slot.status === 'occupied' ) {
      return 'slot-occupied';  // Red for occupied slot
    }
    return slot;  
  }

  calculatedAmount(): number {
    if (!this.timeFrom || !this.timeTo || !this.slots) {
      return 0; 
    }

    // Convert timeFrom and timeTo to Date objects
    const startTime = new Date(this.timeFrom);
    const endTime = new Date(this.timeTo);

    // Calculate the difference in hours
    const diffInMs = endTime.getTime() - startTime.getTime();
    // console.log("diffInMs",diffInMs);
    const durationInHours = diffInMs / (1000 * 60 * 60); // Convert from milliseconds to hours
    // console.log("durationInHours",durationInHours);

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
        this.toastr.success("Slot booked successfully!","Success");
        this.updateSlotStatus(this.selectedSlotId);
        this.router.navigate(['/showbookings']);
        // this.updateSlots(this.selectedSlotId)
      },
      error:(err)=>{
        console.log(this.selectedUserId)
        console.error("booking failed..",err);
        this.toastr.error("booking Failed","Error");
      }
    });
  }
     
  }

  
}
