import { Component, OnInit } from '@angular/core';
import { Appointment } from '../shared/Appointment';
import { AppointmentService } from './../shared/appointment.service';

@Component({
  selector: 'app-home',
  templateUrl: 'list-appointment.page.html',
  styleUrls: ['list-appointment.page.scss'],
})

export class ListAppointmentPage implements OnInit {
  Bookings = [];

  constructor(
      private aptService: AppointmentService
  ) { }

  ngOnInit() {
    this.fetchBookings();
    const bookingRes = this.aptService.getBookingList();
    bookingRes.snapshotChanges().subscribe(res => {
      this.Bookings = [];
      res.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.Bookings.push(a as Appointment);
      })
    })
  }

  fetchBookings() {
    this.aptService.getBookingList().valueChanges().subscribe(res => {
      console.log(res)
    })
  }

  deleteBooking(id) {
    console.log(id)
    if (window.confirm('Do you really want to delete?')) {
      this.aptService.deleteBooking(id)
    }
  }
}