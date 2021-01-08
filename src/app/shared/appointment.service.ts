import { Injectable } from '@angular/core';
import { Appointment } from '../shared/Appointment';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import {User} from './user';
import {FormBuilder} from '@angular/forms';
import {AuthenticationService} from './authentication-service';

@Injectable({
  providedIn: 'root'
})

export class AppointmentService {
  bookingListRef: AngularFireList<any>;
  bookingRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase,
              private authenticationService: AuthenticationService) { }


  createBooking(apt: Appointment) {
    let user: User;
    user = this.authenticationService.getLoggedUser();
    console.log(apt.date + ' ' + apt.time + ' ' + user.email );
    apt.email = user.email;
    return this.bookingListRef.push(apt);
  }

  // Get Single
  getBooking(id: string) {
    this.bookingRef = this.db.object('/appointment/' + id);
    return this.bookingRef;
  }

  // Get List
  getBookingList() {
    this.bookingListRef = this.db.list('/appointment');
    return this.bookingListRef;
  }

  // Update
  updateBooking(id, apt: Appointment) {
    return this.bookingRef.update({
      email: apt.email,
      date: apt.date,
      time: apt.time
    });
  }

  // Delete
  deleteBooking(id: string) {
    this.bookingRef = this.db.object('/appointment/' + id);
    this.bookingRef.remove();
  }
}
