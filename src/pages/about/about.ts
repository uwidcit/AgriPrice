import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AuthenticationService } from '../../core/AuthenticationService';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController,public authenticationService: AuthenticationService) {

  }

  OpenLoginPage(){
    this.navCtrl.push(LoginPage, {param1: 2});
  }


}

