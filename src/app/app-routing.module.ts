import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { BookingSlotFormComponent } from './booking-slot-form/booking-slot-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PaymentComponent } from './payment/payment.component';
// import { MontlyComponent } from './montly/montly.component';
import { ShowBookingsComponent } from './show-bookings/show-bookings.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'home',
    pathMatch:'full'
  },
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'booking-slot',
    component:BookingSlotFormComponent,
    // canActivate:[authenticationGuard]
  },
  {
    path:'dashboard',
    component:DashboardComponent,
    // canActivate:[authenticationGuard]
  },
  {
    path:'payment',
    component:PaymentComponent,
  },
  {
    path:'showbookings',
    component:ShowBookingsComponent,
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
