import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { PickerController } from '@ionic/angular';
import { PickerOptions } from '@ionic/core';
import {User} from '../shared/user';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})

export class RegistrationPage implements OnInit {

    selectedRole: 'customer';

  constructor(
    public authService: AuthenticationService,
    public router: Router,
    private pickerController: PickerController
  ) { }

  ngOnInit() {}

  signUp(email, password) {
      this.authService.RegisterUser(email.value, password.value)
      .then((res) => {
          const userData: User = {
              uid: res.user.uid,
              email: email.value,
              role: this.selectedRole
          };
          this.authService.SetUserData(userData);
          this.router.navigate(['login']);
          /* Onay mail'i için
          this.authService.SendVerificationMail()
          this.router.navigate(['verify-email']);
          */
      }).catch((error) => {
        window.alert(error.message);
      });
  }

    radioGroupChange(event) {
      console.log(event.detail.value);
      this.selectedRole = event.detail.value;
    }

}
