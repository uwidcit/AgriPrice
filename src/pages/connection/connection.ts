import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Firebase } from '@ionic-native/firebase';


@IonicPage()
@Component({
  selector: 'page-connection',
  templateUrl: 'connection.html',
})
export class ConnectionPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private firebase: Firebase) {
    firebase.logEvent("ConnectionPage", {content_type: "page_view", item_id: "ConnectionPage"});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConnectionPage');
  }

}
