import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { CropviewPage } from '../cropview/cropview';
import { LoginPage } from '../login/login';
import { NotificationsPage } from '../notifications/notifications';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  posts: any;
  dailycrops = [];
  dates: any;

  constructor(public navCtrl: NavController, private http: HTTP) {

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

    this.http.get('https://agrimarketwatch.herokuapp.com/crops/daily/dates', {}, {})
    .then(data => {
      this.dates = JSON.parse(data.data);
      this.dates = this.dates.slice(this.dates.length-5, this.dates.length).reverse();
    })
    .catch(error => {
      this.posts="Error using http.get for date";
      console.log(error.status);
      console.log(error.error); // error message as string
      console.log(error.headers);
    });

  }

  OpenViewPage(item){
    this.navCtrl.push(CropviewPage, {param1: item});
  }

  OpenLoginPage(){
    this.navCtrl.push(LoginPage);
  }

  manageNotification(){
    this.navCtrl.setRoot(NotificationsPage);
  }
}
