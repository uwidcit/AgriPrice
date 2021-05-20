import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { CropviewPage } from '../cropview/cropview';
import { LoginPage } from '../login/login';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { AuthServiceIOS } from '../../providers/AuthServiceIOS';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  dates: any;
  monthlyDates = [];
  tempDates: any;
  sortedDailycrops = [];
  cDate: any;
  day0 = [];
  day1 = [];
  day2 = [];
  day3 = [];
  day4 = [];
  month0 = [];
  month1 = [];
  month2 = [];
  month3 = [];
  month4 = [];
  month5 = [];
  graphData = [];
  graphLabels = [];
  monthlyGraphData = [];
  monthyLabels = [];
  dateString: any;

  period = {
    fMonth:'',
    lMonth:'',
    fYear:'',
    lYear:''
  }

  monthNames = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun",
    "Jul", "Aug", "Sep",
    "Oct", "Nov", "Dec"
  ];

  constructor(public navCtrl: NavController, public http: HTTP,public platform: Platform,public navParams: NavParams,public loadingCtrl: LoadingController,public alertCtrl: AlertController,public authServiceIOS: AuthServiceIOS,public storage: Storage) {

  }

  ionViewDidLoad(){
    // this.tabs.selectHomePage();


    if (this.platform.is('ios')){
      this.storage.get('eloggedIn').then((val) => {
        if (val == true ){
          // do nothing
        }else{
          this.authServiceIOS.trySilentLogin();
        }
      });
    }

    this.platform.ready().then(() => {

      let curDate = new Date();
      this.dateString = curDate.toDateString();
      // console.log(curDate);
      this.storage.get('curDate').then((val) => {
        // console.log(val);
        if (this.dateString == val){
          this.useCache();
        }else{
          this.getData();
        }
      });

    });
  }

  getData(){

    let loader = this.loadingCtrl.create({
      content: "Loading Crop Lists.....",
      spinner: 'bubbles',
    });
    loader.present();


    this.http.get('https://agrimarketwatch.herokuapp.com/crops/daily/recent', {}, {})
    .then(data => {
      this.storage.set('day0',data);
      this.day0 = JSON.parse(data.data);
      this.sortedDailycrops = this.day0;
      this.storage.set('curDate',this.dateString);
    })
    .catch(error => {
      loader.dismiss();

      if (this.platform.is('ios')){
        let alert = this.alertCtrl.create({
          title: 'No Internet Connection',
          subTitle: 'Error retrieving data from server.You may not have an internet connection or the connection is too slow. Please close the App and try again when you have a proper connection.',
        });
        alert.present();
        this.useCache();

      }else{
        let alert = this.alertCtrl.create({
          title: 'No Internet Connection',
          subTitle: 'Error retrieving data from server.You may not have an internet connection or the connection is too slow. Try restarting the App when you have a proper connection.',
          buttons: ['Dismiss']
        });
        alert.present();
      }
      console.log(error.status);
      console.log(error.error); // error message as string
      console.log(error.headers);
    });

    this.http.get('https://agrimarketwatch.herokuapp.com/crops/daily/dates', {}, {})
    .then(data => {
      this.storage.set('dates',data);
      this.dates = JSON.parse(data.data);
      this.tempDates = this.dates;
      this.dates = this.dates.slice(this.dates.length-5, this.dates.length).reverse();
      this.cDate = this.dates[0];
      this.getMonthlyDates();
      // console.log(this.monthlyDates);
      this.generateAllCropLists();
      setTimeout(() => {
        loader.dismiss();
      }, 1000);
    })
    .catch(error => {
      console.log(error.status);
      console.log(error.error); // error message as string
      console.log(error.headers);
    });

  }

  getMonthlyDates(){
    var i = 0;
    var k = 0;
    var temp;
    var temp2;
    this.tempDates = this.tempDates.reverse();
    // console.log(this.tempDates.length);
    for(i = 0;i<this.tempDates.length;i++){
      // console.log("hello");
      // console.log(temp2);
      temp2 = this.getMonthDate(this.tempDates[i]);
      if (temp != temp2){
        temp = temp2;
        this.monthlyDates.push(this.tempDates[i]);
        k++
      }
      if (k==6) {
        i = this.tempDates.length;
      }
    }
  }

  exitApp(){
     this.platform.exitApp();
  }

  generateAllCropLists(){
    this.http.get('https://agrimarketwatch.herokuapp.com/crops/daily/dates/' + this.dates[1], {}, {})
    .then(data => {
      this.day1 = JSON.parse(data.data);
      this.storage.set('day1',data);
    })
    .catch(error => {
      console.log("day1 error");
      // console.log(error.status);
      // console.log(error.error); // error message as string
      // console.log(error.headers);
    });
    this.http.get('https://agrimarketwatch.herokuapp.com/crops/daily/dates/' + this.dates[2], {}, {})
    .then(data => {
      this.storage.set('day2',data);
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
      this.storage.set('day3',data);
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
      this.storage.set('day4',data);
      this.day4 = JSON.parse(data.data);
    })
    .catch(error => {
      console.log("day4 error");
      // console.log(error.status);
      // console.log(error.error); // error message as string
      // console.log(error.headers);
    });

    this.http.get('https://agrimarketwatch.herokuapp.com/crops/daily/dates/' + this.monthlyDates[0], {}, {})
    .then(data => {
      this.storage.set('month0',data);
      this.month0 = JSON.parse(data.data);
      // console.log(this.month0);
    })
    .catch(error => {
      console.log("month0 error");
      // console.log(error.status);
      // console.log(error.error); // error message as string
      // console.log(error.headers);
    });
    this.http.get('https://agrimarketwatch.herokuapp.com/crops/daily/dates/' + this.monthlyDates[1], {}, {})
    .then(data => {
      this.storage.set('month1',data);
      this.month1 = JSON.parse(data.data);
      // console.log(this.month1);
    })
    .catch(error => {
      console.log("month1 error");
      // console.log(error.status);
      // console.log(error.error); // error message as string
      // console.log(error.headers);
    });
    this.http.get('https://agrimarketwatch.herokuapp.com/crops/daily/dates/' + this.monthlyDates[2], {}, {})
    .then(data => {
      this.storage.set('month2',data);
      this.month2 = JSON.parse(data.data);
      // console.log(this.month2);
    })
    .catch(error => {
      console.log("month2 error");
      // console.log(error.status);
      // console.log(error.error); // error message as string
      // console.log(error.headers);
    });
    this.http.get('https://agrimarketwatch.herokuapp.com/crops/daily/dates/' + this.monthlyDates[3], {}, {})
    .then(data => {
      this.storage.set('month3',data);
      this.month3 = JSON.parse(data.data);
      // console.log(this.month3);
    })
    .catch(error => {
      console.log("month3 error");
      // console.log(error.status);
      // console.log(error.error); // error message as string
      // console.log(error.headers);
    });
    this.http.get('https://agrimarketwatch.herokuapp.com/crops/daily/dates/' + this.monthlyDates[4], {}, {})
    .then(data => {
      this.storage.set('month4',data);
      this.month4 = JSON.parse(data.data);
      // console.log(this.month4);
    })
    .catch(error => {
      console.log("month4 error");
      // console.log(error.status);
      // console.log(error.error); // error message as string
      // console.log(error.headers);
    });
    this.http.get('https://agrimarketwatch.herokuapp.com/crops/daily/dates/' + this.monthlyDates[5], {}, {})
    .then(data => {
      this.storage.set('month5',data);
      this.month5 = JSON.parse(data.data);
      // console.log(this.month5);
    })
    .catch(error => {
      console.log("month5 error");
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

  }



  OpenViewPage(item){
    this.generateGraphInfo(item.commodity,item.unit);
    this.navCtrl.push(CropviewPage, {param1: item,param2: this.graphData,param3: this.graphLabels,param4: this.monthlyGraphData,param5: this.monthyLabels,param6: this.period});

  }

  OpenLoginPage(){
    this.navCtrl.push(LoginPage,{param1: 0});
  }

  generateGraphInfo(crop,unit){
    this.graphData = [];
    this.graphLabels = [];
    this.monthyLabels = [];
    this.monthlyGraphData = [];
    var ddate = "";
    var i = 0;
    var index = 0;
    var index1 = 0;
    var index2 = 0;
    var index3 = 0;
    var index4 = 0;

    var mIndex0 = 0;
    var mIndex1 = 0;
    var mIndex2 = 0;
    var mIndex3 = 0;
    var mIndex4 = 0;
    var mIndex5 = 0;

    index = this.day0.findIndex(function(item,i){
      return item.commodity === crop
    });
    index1 = this.day1.findIndex(function(item,i){
      return item.commodity === crop
    });
    index2 = this.day2.findIndex(function(item,i){
      return item.commodity === crop
    });
    index3 = this.day3.findIndex(function(item,i){
      return item.commodity === crop
    });
    index4 = this.day4.findIndex(function(item,i){
      return item.commodity === crop
    });

    mIndex0 = this.month0.findIndex(function(item,i){
      return item.commodity === crop
    });
    mIndex1 = this.month1.findIndex(function(item,i){
      return item.commodity === crop
    });
    mIndex2 = this.month2.findIndex(function(item,i){
      return item.commodity === crop
    });
    mIndex3 = this.month3.findIndex(function(item,i){
      return item.commodity === crop
    });
    mIndex4 = this.month4.findIndex(function(item,i){
      return item.commodity === crop
    });
    mIndex5 = this.month5.findIndex(function(item,i){
      return item.commodity === crop
    });


    this.graphData.push(this.processPrice(this.day4[index4].price,unit));
    this.graphData.push(this.processPrice(this.day3[index3].price,unit));
    this.graphData.push(this.processPrice(this.day2[index2].price,unit));
    this.graphData.push(this.processPrice(this.day1[index1].price,unit));
    this.graphData.push(this.processPrice(this.day0[index].price,unit));

    this.monthlyGraphData.push(this.processPrice(this.month5[mIndex5].price,unit));
    this.monthlyGraphData.push(this.processPrice(this.month4[mIndex4].price,unit));
    this.monthlyGraphData.push(this.processPrice(this.month3[mIndex3].price,unit));
    this.monthlyGraphData.push(this.processPrice(this.month2[mIndex2].price,unit));
    this.monthlyGraphData.push(this.processPrice(this.month1[mIndex1].price,unit));
    this.monthlyGraphData.push(this.processPrice(this.month0[mIndex0].price,unit));


    for(i = 4 ;i > -1;i--){
      ddate = this.processDate(this.dates[i]);
      this.graphLabels.push(ddate);
    }

    for(i = 5 ;i > -1;i--){
      ddate = this.processMonth(this.monthlyDates[i]);
      this.monthyLabels.push(ddate);
    }

    this.generateDateSpan();
    // console.log(this.monthyLabels);
    // console.log(this.monthlyGraphData);
  }

  generateDateSpan(){
    let date = new Date(this.dates[4]);
    this.period.fMonth = this.monthNames[date.getMonth()];
    date = new Date(this.dates[0]);
    this.period.lMonth = this.monthNames[date.getMonth()];
    date = new Date(this.monthlyDates[5]);
    this.period.fYear = date.getFullYear().toString();
    date = new Date(this.monthlyDates[0]);
    this.period.lYear = date.getFullYear().toString();

  }

  processDate(value){ //add ending to date
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

  processPrice(value,unit){ // convert kg to lb
    if (!value) return value;
    let value1 = 1;
    value1 = parseFloat(value);
    if (unit == 'Kg'){
      if (value1==0) return value1
  		value1 = value1 / 2.20462;
      return value1.toFixed(2);
    }else{
      return value;
    }
  }

  processMonth(value){
    let date = new Date(value);
    return this.monthNames[date.getMonth()];
  }

  getMonthDate(value){
    var month;
    let date = new Date(value);
    month = date.getMonth();
    return month;
  }

  useCache(){
    this.storage.get('day0').then((val) => {
      this.day0=JSON.parse(val.data);
      this.sortedDailycrops = this.day0;
    });
    this.storage.get('dates').then((val) => {
      this.dates = JSON.parse(val.data);
      this.tempDates = this.dates;
      this.dates = this.dates.slice(this.dates.length-5, this.dates.length).reverse();
      this.cDate = this.dates[0];
      this.getMonthlyDates();
    });
    this.storage.get('day1').then((val) => {
      this.day1=JSON.parse(val.data);
    });
    this.storage.get('day2').then((val) => {
      this.day2=JSON.parse(val.data);
    });
    this.storage.get('day3').then((val) => {
      this.day3=JSON.parse(val.data);
    });
    this.storage.get('day4').then((val) => {
      this.day4=JSON.parse(val.data);
    });
    this.storage.get('month0').then((val) => {
      this.month0=JSON.parse(val.data);
    });
    this.storage.get('month1').then((val) => {
      this.month1=JSON.parse(val.data);
    });
    this.storage.get('month2').then((val) => {
      this.month2=JSON.parse(val.data);
    });
    this.storage.get('month3').then((val) => {
      this.month3=JSON.parse(val.data);
    });
    this.storage.get('month4').then((val) => {
      this.month4=JSON.parse(val.data);
    });
    this.storage.get('month5').then((val) => {
      this.month5=JSON.parse(val.data);
    });
  }

}
