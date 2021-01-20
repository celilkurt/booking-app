import { Component, OnInit } from '@angular/core';
import { Appointment } from '../shared/Appointment';
import { AppointmentService } from './../shared/appointment.service';
import { AuthenticationService} from '../shared/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: 'list-appointment.page.html',
  styleUrls: ['list-appointment.page.scss'],
})

export class ListAppointmentPage implements OnInit {
  Bookings = [];

  constructor(
      private aptService: AppointmentService,
      public authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    const curEmail = this.authenticationService.getLoggedUser().email;
    this.fetchBookings();
    const bookingRes = this.aptService.getBookingList();
    bookingRes.snapshotChanges().subscribe(res => {
      this.Bookings = [];
      res.forEach(item => {

        const a = item.payload.toJSON();
        a['$key'] = item.key;
        if ((a as Appointment).email === curEmail) {
          this.Bookings.push(a as Appointment);
        }

      });
    });
  }

  fetchBookings() {
    this.aptService.getBookingList().valueChanges().subscribe(res => {
      console.log(res);
    });
  }

  deleteBooking(id) {
    console.log(id);
    if (window.confirm('Do you really want to delete?')) {
      this.aptService.deleteBooking(id);
    }
  }
}
