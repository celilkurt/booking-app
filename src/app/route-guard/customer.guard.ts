import {  CanActivate,  ActivatedRouteSnapshot,  RouterStateSnapshot,  Router} from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import {AlertController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CustomerGuard implements CanActivate {

  constructor(private authservice: AuthenticationService,
              private router: Router,
              public alertController: AlertController) {}

   canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
  ): boolean {
    const logged = this.authservice.isLoggedIn;
    if (logged) {
      if (localStorage.getItem('role') === 'customer') {
        return true;
      }
    }
    this.router.navigate(['home']);
    return false;
  }

  async presentAlert(messageI) {
    const alert = await this.alertController.create({
      header: 'Yetkisiz erişim!',
      message: messageI,
      buttons: ['OK']
    });

    await alert.present();
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }



}
