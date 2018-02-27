import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs, Platform } from 'ionic-angular';
// import { HomePage } from '../home/home';
import { AuthenticationService } from '../../providers/AuthenticationService';
import { NotificationsPage } from '../notifications/notifications';
import * as firebase from 'firebase/app';
import { Storage } from '@ionic/storage';
import { AuthServiceIOS } from '../../providers/AuthServiceIOS';
import { Login2Page } from '../login2/login2';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  hideElement: any;
  displayName: any;
  locFrom: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public authenticationService: AuthenticationService,public authServiceIOS: AuthServiceIOS,public storage: Storage,public tabs:Tabs,public platform:Platform) {
    this.locFrom = navParams.get('param1');

    if (this.platform.is('ios')){
      if (this.authServiceIOS.checkLogIn() == false){
        this.hideElement=false;
      }else{
        this.hideElement=true;
        this.displayName = this.authServiceIOS.getUserName();
      }
    }else{
      this.authenticationService.checkAuthentication().subscribe((user:firebase.User)=>{
        if (user===null){
          this.hideElement=false;
        }else{
          this.hideElement=true;
          this.displayName = this.authenticationService.getUserName();
          if (this.displayName == null){
            this.storage.get('displayName').then((val) => {
              this.displayName = val
            })
          }
        }
      })
    }
  }

  googleLogin(){
    if (this.platform.is('ios')){
      this.authServiceIOS.login();
      if (this.locFrom==0 || this.locFrom==2){
        this.navCtrl.pop();
      }else{
        this.navCtrl.pop();
        setTimeout(() => {
          // this.navCtrl.setRoot(NotificationsPage);
          this.tabs.select(1);
          this.tabs.select(1);
        }, 4000);
      }
    }else{
      this.authenticationService.signInWithGoogle();
      this.navCtrl.pop();
    }
  }

  noLogin(){
    // this.navCtrl.setRoot(HomePage);
    this.tabs.select(0);
    this.navCtrl.pop();
    // this.navCtrl.parent.select(0);
  }

  LoginContinue(){
    // this.navCtrl.setRoot(NotificationsPage);
    if (this.locFrom==0 || this.locFrom==2){
      this.tabs.select(1);
      this.navCtrl.pop();
    }else{
      this.navCtrl.setRoot(NotificationsPage);
      this.navCtrl.pop();
    }
    // this.navCtrl.parent.select(1);
  }

  logOut(){
    if (this.platform.is('ios')){
      this.authServiceIOS.logOut();
      this.navCtrl.pop();
    }else{
      this.authenticationService.signOut();
      this.navCtrl.pop();
    }
  }

  OpenLogin2Page(){
    this.navCtrl.push(Login2Page);
  }

}
