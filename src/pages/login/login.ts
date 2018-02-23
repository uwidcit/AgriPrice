import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs } from 'ionic-angular';
// import { HomePage } from '../home/home';
import { AuthenticationService } from '../../core/AuthenticationService';
import { NotificationsPage } from '../notifications/notifications';
import * as firebase from 'firebase/app';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  hideElement: any;
  displayName: any;
  locFrom: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public authenticationService: AuthenticationService,public storage: Storage,public tabs:Tabs) {
    this.locFrom = navParams.get('param1');
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

  googleLogin(){
    this.authenticationService.signInWithGoogle();
    this.navCtrl.pop();
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
    this.authenticationService.signOut();
    this.navCtrl.pop();
  }

}
