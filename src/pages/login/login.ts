import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AuthenticationService } from '../../core/AuthenticationService';
import { NotificationsPage } from '../notifications/notifications';
import * as firebase from 'firebase/app';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  hideElement: any;
  displayName: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public authenticationService: AuthenticationService) {

  }

  ngOnInit(){
    this.authenticationService.checkAuthentication().subscribe((user:firebase.User)=>{
      if (user===null){
        this.hideElement=false;
      }else{
        this.hideElement=true;
        this.displayName = this.authenticationService.getUserName();
      }
    })
  }

  googleLogin(){
    this.authenticationService.signInWithGoogle();
  }

  noLogin(){
    this.navCtrl.setRoot(HomePage);
  }

  LoginContinue(){
    this.navCtrl.setRoot(NotificationsPage);
  }

  logOut(){
    this.authenticationService.signOut();
  }

}
