import { Component, OnInit } from '@angular/core';
import { Bussiness } from '../shared/bussiness';
import { BusinessService} from '../shared/business.service';
import { AuthenticationService} from '../shared/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  bussinessData: Bussiness = new Bussiness();

  constructor(
      public bussinessService: BusinessService,
      private router: Router,
      public authService: AuthenticationService
  ) { }

  ngOnInit() {

    this.bussinessData = this.bussinessService.GetBussinessData(this.authService.getLoggedUser().uid);
}

  SetBussinessData() {

    console.log(this.bussinessData);
    this.bussinessService.SetBussinessData(this.bussinessData).then(res => {
      this.router.navigate(['/home']);
    });

  }



}

