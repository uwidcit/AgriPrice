import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Firebase } from '@ionic-native/firebase';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController,private firebase: Firebase) {
    firebase.logEvent("AboutPage", {content_type: "page_view", item_id: "AboutPage"});
  }

  OpenLoginPage(){
    this.navCtrl.push(LoginPage, {param1: 2});
  }


}

