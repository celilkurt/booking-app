import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AppointmentService } from './../shared/appointment.service';
import { AuthenticationService } from './../shared/authentication.service';
import { User } from './../shared/user';

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
      public fb: FormBuilder,
      private actRoute: ActivatedRoute,
      private authService: AuthenticationService
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
    };

  }

  ngOnInit() {

    let bussinessName = '';
    if (this.actRoute.snapshot.paramMap.has('name')) {
      bussinessName = this.actRoute.snapshot.paramMap.get('name');
    }
    this.bookingForm = this.fb.group({


      email: [this.authService.getLoggedUser().email],
      date: [''],
      time: [''],
      bussiness: [bussinessName]
    });

  }

  formSubmit() {

    if (!this.bookingForm.valid) {
      return false;
    } else {
      this.aptService.createBooking(this.bookingForm.value).then(res => {
        console.log(res);
        this.bookingForm.reset();
        this.router.navigate(['/list-appointment']);
      })
          .catch(error => console.log(error));
    }
  }
}
