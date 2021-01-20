import {  CanActivate,  ActivatedRouteSnapshot,  RouterStateSnapshot,  Router} from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import {AlertController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class BussinessGuard implements CanActivate {
  constructor(private authservice: AuthenticationService,
              private router: Router,
              public alertController: AlertController) {}

  async canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
  ): boolean {
    const logged = this.authservice.isLoggedIn;

    if (logged) {
      if (localStorage.getItem('role') === 'bussiness') {
        return true;
      }
    }
    this.presentAlert('Sayfaya erişebilmek için bussiness hesabına sahip olmalısın!');
    await this.delay(2000);
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
