import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { CropviewPage } from '../cropview/cropview';
import { LoginPage } from '../login/login';
import { AuthenticationService } from '../../core/AuthenticationService';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  posts: any;
  dates: any;
  sortedDailycrops = [];
  cDate: any;
  day0 = [];
  day2 = [];
  day3 = [];
  day4 = [];
  day5 = [];
  graphData = [];
  graphLabels = [];

  constructor(public navCtrl: NavController, public http: HTTP,public authenticationService: AuthenticationService,public navParams: NavParams) {

  }

  ionViewDidLoad(){
    this.http.get('https://agrimarketwatch.herokuapp.com/crops/daily/recent', {}, {})
    .then(data => {
      this.day0 = JSON.parse(data.data);
      this.sortedDailycrops = this.day0;
    })
    .catch(error => {
      alert("Error pulling data from server, you may not have an internet connection.");
      console.log(error.status);
      console.log(error.error); // error message as string
      console.log(error.headers);
    });

    this.http.get('https://agrimarketwatch.herokuapp.com/crops/daily/dates', {}, {})
    .then(data => {
      this.dates = JSON.parse(data.data);
      this.dates = this.dates.slice(this.dates.length-5, this.dates.length).reverse();
      this.cDate = this.dates[0];
      this.generateAllCropLists();
    })
    .catch(error => {
      console.log(error.status);
      console.log(error.error); // error message as string
      console.log(error.headers);
    });
  }


  generateAllCropLists(){
    this.http.get('https://agrimarketwatch.herokuapp.com/crops/daily/dates/' + this.dates[1], {}, {})
    .then(data => {
      this.day1 = JSON.parse(data.data);
    })
    .catch(error => {
      console.log("day1 error");
      // console.log(error.status);
      // console.log(error.error); // error message as string
      // console.log(error.headers);
    });
    this.http.get('https://agrimarketwatch.herokuapp.com/crops/daily/dates/' + this.dates[2], {}, {})
    .then(data => {
      this.day2 = JSON.parse(data.data);
    })
    .catch(error => {
      console.log("day2 error");
      // console.log(error.status);
      // console.log(error.error); // error message as string
      // console.log(error.headers);
    });
    this.http.get('https://agrimarketwatch.herokuapp.com/crops/daily/dates/' + this.dates[3], {}, {})
    .then(data => {
      this.day3 = JSON.parse(data.data);
    })
    .catch(error => {
      console.log("day3 error");
      // console.log(error.status);
      // console.log(error.error); // error message as string
      // console.log(error.headers);
    });
    this.http.get('https://agrimarketwatch.herokuapp.com/crops/daily/dates/' + this.dates[4], {}, {})
    .then(data => {
      this.day4 = JSON.parse(data.data);
    })
    .catch(error => {
      console.log("day4 error");
      // console.log(error.status);
      // console.log(error.error); // error message as string
      // console.log(error.headers);
    });
  }

  FilterByDate(date){
    if (date == this.dates[0]){
        this.sortedDailycrops = this.day0;
    }else if(date == this.dates[1]){
        this.sortedDailycrops = this.day1;
    }else if(date == this.dates[2]){
        this.sortedDailycrops = this.day2;
    }else if(date == this.dates[3]){
        this.sortedDailycrops = this.day3;
    }else if(date == this.dates[4]){
        this.sortedDailycrops = this.day4;
    }else{
      console.log("error choosing date");
    }
    // this.http.get('https://agrimarketwatch.herokuapp.com/crops/daily/dates/' + date, {}, {})
    // .then(data => {
    //   this.posts = JSON.parse(data.data);
    //   this.sortedDailycrops=this.posts;
    // })
    // .catch(error => {
    //   console.log(error.status);
    //   console.log(error.error); // error message as string
    //   console.log(error.headers);
    // });
  }



  OpenViewPage(item){
    this.navCtrl.push(CropviewPage, {param1: item,param2: this.graphData,param3: graphLabels});
  }

  OpenLoginPage(){
    this.navCtrl.push(LoginPage);
  }
  //
  // generateGraphInfo(){
  //
  // }


}
