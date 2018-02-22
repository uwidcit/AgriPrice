import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs } from 'ionic-angular';
import { HomePage } from '../home/home';
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
  constructor(public navCtrl: NavController, public navParams: NavParams,public authenticationService: AuthenticationService,public storage: Storage,public tabs:Tabs) {
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

  }

  noLogin(){
    // this.navCtrl.setRoot(HomePage);
    this.tabs.select(0);
    // this.navCtrl.parent.select(0);
  }

  LoginContinue(){
    // this.navCtrl.setRoot(NotificationsPage);
    this.tabs.select(1);
    // this.navCtrl.parent.select(1);
  }

  logOut(){
    this.authenticationService.signOut();
  }

}
