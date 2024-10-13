import { Component} from '@angular/core';
import { BookingService, monthly, weekly } from '../customServices/booking.service';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);


// interface BarChart{
//   config:'',
//   $context:{},
//   id:0,
//   ctx:''
// }

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent{
  
  selectedYear: string = new Date().getFullYear().toString();
  weeklyStats: weekly[] = [];
  monthlyStats: monthly[] = [];
  years = [2022, 2023, 2024, 2025, 2026, 2027];

  
  weeklyChart: any;
  monthlyChart: any;

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.fetchStats(); 
  }

  fetchStats() {
    this.bookingService.getBookingStats(this.selectedYear).subscribe({
      next: (data) => {
        console.log('stats', data);
        this.weeklyStats = data.statsw;
        this.monthlyStats = data.statsm;
        this.renderWeeklyChart(); 
        this.renderMonthlyChart();
      },
      error: (err) => {
        console.error('Error fetching stats:', err);
      },
    });
  }

  onYearChange(): void {
    this.fetchStats(); 
  }

  renderWeeklyChart() {
    if (this.weeklyChart) this.weeklyChart.destroy(); // Avoid duplicate charts
    const ctx: any = document.getElementById('weeklyChart'); 
    console.log("ctx",ctx);
    console.log(typeof(ctx));
    this.weeklyChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.weeklyStats.map(stat => `Week ${stat._id}`), // Week IDs as labels
        datasets: [{
          label: 'Total Bookings',
          data: this.weeklyStats.map(stat => stat.totalBookings),
          backgroundColor: '#ffcccb',
        }, {
          label: 'Total Amount (INR)',
          data: this.weeklyStats.map(stat => stat.totalAmount),
          backgroundColor: '#f8a488',
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
    console.log(this.weeklyChart);
    console.log(typeof(this.weeklyChart));
  }

  renderMonthlyChart() {
    if (this.monthlyChart) this.monthlyChart.destroy(); // Avoid duplicate charts
    const ctx: any = document.getElementById('monthlyChart'); 
    this.monthlyChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.monthlyStats.map(stat => `Month ${stat._id}`), // Month IDs as labels
        datasets: [{
          label: 'Total Bookings',
          data: this.monthlyStats.map(stat => stat.totalBookings),
          backgroundColor: 'plum',
        }, {
          label: 'Total Amount (INR)',
          data: this.monthlyStats.map(stat => stat.totalAmount),
          backgroundColor: 'purple',
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}


