import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { CropviewPage } from '../cropview/cropview';
import { LoginPage } from '../login/login';
import { AuthenticationService } from '../../core/AuthenticationService';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  // @ViewChild("myTabs") tabRef: Tabs;
  posts: any;
  dates: any;
  sortedDailycrops = [];
  cDate: any;
  day0 = [];
  day1 = [];
  day2 = [];
  day3 = [];
  day4 = [];
  graphData = [];
  graphLabels = [];

  constructor(public navCtrl: NavController, public http: HTTP,public platform: Platform,public authenticationService: AuthenticationService,public navParams: NavParams,public loadingCtrl: LoadingController,public alertCtrl: AlertController) {

  }

  ionViewDidLoad(){
    // this.tabs.selectHomePage();
    let loader = this.loadingCtrl.create({
      content: "Loading Crop Lists.....",
      spinner: 'bubbles',
    });
    loader.present();
    // this.presentLoading();

    this.http.get('https://agrimarketwatch.herokuapp.com/crops/daily/recent', {}, {})
    .then(data => {
      this.day0 = JSON.parse(data.data);
      this.sortedDailycrops = this.day0;
      setTimeout(() => {
        loader.dismiss();
      }, 1000);
    })
    .catch(error => {
      loader.dismiss();

      if (this.platform.is('ios')){
        let alert = this.alertCtrl.create({
          title: 'No Internet Connection',
          subTitle: 'Error retrieving data from server.You may not have an internet connection or the connection is too slow. Please close the App and try again when you have a proper connection.',
        });
        alert.present();

      }else{
        let alert = this.alertCtrl.create({
          title: 'No Internet Connection',
          subTitle: 'Error retrieving data from server.You may not have an internet connection or the connection is too slow. Try restarting the App when you have a proper connection.',
          buttons: [
                    {
                      text: 'Close App',
                      role: 'cancel',
                      handler: () => {
                        this.exitApp();
                      }
                    }
                  ]
        });
        alert.present();
      }
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

  exitApp(){
     this.platform.exitApp();
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

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Loading Crop Lists.....",
      spinner: 'bubbles',
    });
    loader.present();
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
    this.generateGraphInfo(item.commodity);
    this.navCtrl.push(CropviewPage, {param1: item,param2: this.graphData,param3: this.graphLabels});

  }

  OpenLoginPage(){
    this.navCtrl.push(LoginPage,{param1: 0});
  }

  generateGraphInfo(crop){
    this.graphData = [];
    this.graphLabels = [];
    var ddate = "";
    var i = 0;
    var index = 0;
    if (this.cDate==this.dates[0]){
      index = this.day0.findIndex(function(item,i){
        return item.commodity === crop
      });
    }else if(this.cDate == this.dates[1]){
      index = this.day1.findIndex(function(item,i){
        return item.commodity === crop
      });
    }else if(this.cDate == this.dates[2]){
      index = this.day2.findIndex(function(item,i){
        return item.commodity === crop
      });
    }else if(this.cDate == this.dates[3]){
      index = this.day3.findIndex(function(item,i){
        return item.commodity === crop
      });
    }else if(this.cDate == this.dates[4]){
      index = this.day4.findIndex(function(item,i){
        return item.commodity === crop
      });
    }else{
      console.log("error getting correct dataset");
    }

    this.graphData.push(this.processPrice(this.day4[index].price));
    this.graphData.push(this.processPrice(this.day3[index].price));
    this.graphData.push(this.processPrice(this.day2[index].price));
    this.graphData.push(this.processPrice(this.day1[index].price));
    this.graphData.push(this.processPrice(this.day0[index].price));


    for(i = 4 ;i > -1;i--){
      ddate = this.processDate(this.dates[i]);
      this.graphLabels.push(ddate);
    }

  }

  processDate(value){
    var newDate;
    var day,end;
    if (!value) return value;
    let date = new Date(value);
    day = date.getDate();
    if (day == 1){
      end = "st";
    }else if(day == 2){
      end = "nd";
    }else if(day == 3){
      end = "rd";
    }else{
      end = "th";
    }
    newDate = day+end;
    return newDate;
  }

  processPrice(value){
    if (!value) return value;
    let value1 = 1;
    value1 = parseFloat(value);
    if (value1==0) return value1
		value1 = value1 / 2.20462;
		return value1.toFixed(2);
  }
}
