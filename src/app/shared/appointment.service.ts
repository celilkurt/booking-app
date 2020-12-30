import { Injectable } from '@angular/core';
import { Appointment } from '../shared/Appointment';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})

export class AppointmentService {
  bookingListRef: AngularFireList<any> ;
  bookingRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) {
    this.bookingListRef = db.list('/appointment');
  }

  // Create
  createBooking(apt: Appointment) {
    console.log(apt);
    // this.bookingListRef =  this.db.bookingListRef('/appointment');
    this.bookingListRef = this.db.list('/appointment');
    return this.bookingListRef.push({
        name: apt.name,
        email: apt.email,
        mobile: apt.mobile
      });

  }

 /*this.list = this.firebase.list('/lists');
  if (contact) {
    this.list.push({
      name: contact.name,
      email:contact.email,
      phoneno:contact.phoneno,
      notes:contact.notes,
      address:contact.address,
      relation:contact.relation
    });
  }
*/
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
      name: apt.name,
      email: apt.email,
      mobile: apt.mobile
    });
  }

  // Delete
  deleteBooking(id: string) {
    this.bookingRef = this.db.object('/appointment/' + id);
    this.bookingRef.remove();
  }
}
