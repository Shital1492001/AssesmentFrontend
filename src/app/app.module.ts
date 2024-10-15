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
import { provideHttpClient, HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './footer/footer.component';
import { ShowBookingsComponent } from './show-bookings/show-bookings.component';
import { AuthInterceptor } from './customServices/auth-interceptor';
import { DatePipe } from '@angular/common';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';



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
    ShowBookingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [DatePipe,{provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor,multi:true},provideHttpClient(),provideAnimations(),provideToastr(),],
  bootstrap: [AppComponent]
})
export class AppModule { }
