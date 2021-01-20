import { Component } from '@angular/core';
import { BusinessService} from '../shared/business.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  bussinesses: any[];

  constructor( private bussinessService: BusinessService) {

    this.bussinesses = this.bussinessService.GetBussinessesData();
  }

}
