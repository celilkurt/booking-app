import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AppointmentService } from './../shared/appointment.service';

@Component({
  selector: 'app-make-appointment',
  templateUrl: './make-appointment.page.html',
  styleUrls: ['./make-appointment.page.scss'],
})

export class MakeAppointmentPage implements OnInit {
  bookingForm: FormGroup;
  customYearValues = [2020, 2016, 2008, 2004, 2000, 1996];
  customDayShortNames = ['s\u00f8n', 'man', 'tir', 'ons', 'tor', 'fre', 'l\u00f8r'];
  customPickerOptions: any;


  constructor(
      private aptService: AppointmentService,
      private router: Router,
      public fb: FormBuilder
  ) {
    this.customPickerOptions = {
      buttons: [{
        text: 'Save',
        handler: () => console.log('Clicked Save!')
      }, {
        text: 'Log',
        handler: () => {
          console.log('Clicked Log. Do not Dismiss.');
          return false;
        }
      }]
    }

  }

  ngOnInit() {
    this.bookingForm = this.fb.group({
      name: [''],
      email: [''],
      mobile: [''],
      date: [''],
      time: ['']
    })
  }

  formSubmit() {
    if (!this.bookingForm.valid) {
      return false;
    } else {
      this.aptService.createBooking(this.bookingForm.value).then(res => {
        console.log(res)
        this.bookingForm.reset();
        this.router.navigate(['/home']);
      })
          .catch(error => console.log(error));
    }
  }
}
