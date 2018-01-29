import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { CropviewPage } from '../cropview/cropview';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  posts: any;
  dailycrops = [{"id": "5a6b57fa5716aa0004ffc7cf", "commodity": "carrot", "date": "2018-01-26T00:00:00", "category": "ROOT CROPS", "unit": "Kg", "price": 7.94, "volume": 2381.0},
                {"id": "5a6b57fa5716aa0004ffc7d0", "commodity": "cassava", "date": "2018-01-26T00:00:00", "category": "ROOT CROPS", "unit": "Kg", "price": 6.11, "volume": 3816.0}]

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

  }

  OpenViewPage(item){
    this.navCtrl.push(CropviewPage, {param1: item});
  }

  OpenLoginPage(){
    this.navCtrl.push(LoginPage);
  }

}
