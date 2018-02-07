import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { LoginPage } from '../login/login';
import { FCM } from '@ionic-native/fcm';
// import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html'
})
export class NotificationsPage {

  posts: any;
  dailycrops = [];
  item1: any;

  constructor(public navCtrl: NavController,public http: HTTP,public fcm: FCM) {
    this.http.get('https://agrimarketwatch.herokuapp.com/crops/daily/recent', {}, {})
    .then(data => {
      this.posts = JSON.parse(data.data);
      this.dailycrops = this.posts;
    })
    .catch(error => {
      this.posts="Error using http.get";
      console.log(error.status);
      console.log(error.error); // error message as string
      console.log(error.headers);
    });

  }


  subscribeToTopic(e: any,crop){
    console.log(crop.commodity.replace(/[^a-zA-Z ]/g,'').replace(/ /g,''));
    if (e.checked){
      this.fcm.subscribeToTopic(crop.commodity.replace(/[^a-zA-Z ]/g,'').replace(/ /g,''));
      alert("Subscibed to commodity: "+crop.commodity);
    }else{
      this.fcm.unsubscribeFromTopic(crop.commodity.replace(/[^a-zA-Z ]/g,'').replace(/ /g,''));
      alert("Unsubscibed to commodity: "+crop.commodity);
    }
  }

  OpenLoginPage(){
    this.navCtrl.push(LoginPage);
  }

}
