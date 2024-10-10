import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { BookingSlotFormComponent } from './booking-slot-form/booking-slot-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { provideHttpClient } from '@angular/common/http';
// import { authInterceptor } from './customServices/auth.interceptor';
import { FooterComponent } from './footer/footer.component';
import { PaymentComponent } from './payment/payment.component';
// import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    HeaderComponent,
    BookingSlotFormComponent,
    FooterComponent,
    DashboardComponent,
    PaymentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [provideHttpClient(),
    
    // DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
