import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// import { FCM } from '@ionic-native/fcm';
import { Firebase } from '@ionic-native/firebase';
import { HTTP } from '@ionic-native/http';
// import { tap } from 'rxjs/operators';

import { TabsPage } from '../pages/tabs/tabs';
// var FCMPlugin:any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  dates: any;
  cDate: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public http: HTTP,private firebase: Firebase) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      // splashScreen.hide();
      this.firebase.setAnalyticsCollectionEnabled(true);

      this.firebase.getToken().then(token=>
        console.log("This is token: "+token));

      if (platform.is('ios')){
        this.firebase.grantPermission();
      }
      // this.listenToNotifications().pipe(
      //     tap(msg => {
      //       // show a toast
      //       console.log("Message: "+msg.body);
      //       alert(msg.body);
      //     })
      //   )
      //   .subscribe()
      this.firebase.onNotificationOpen().subscribe(data=>{
        // alert(data.title+": "+ data.body);
        console.log(data);
      })

      // (msg =>{
      //   console.log(msg.body);
      // });

      // getToken(data=> {
      //   console.log(data);
      // });


      // this.firebase.subscribe("all");

      // this.firebase.onNotificationOpen(function(data) {
      //     console.log(data);
      //     alert(data.title+": "+ data.body);
      // }, function(error) {
      //     console.error(error);
      // });
      // this.http.get('https://agrimarketwatch.herokuapp.com/crops/daily/dates', {}, {})
      // .then(data => {
      //   this.dates = JSON.parse(data.data);
      //   this.dates = this.dates.slice(this.dates.length-5, this.dates.length).reverse();
      //   this.cDate = this.dates[0];
      //   console.log(this.cDate);
      //   // this.generateAllCropLists();
      // })
      // .catch(error => {
      //   console.log("error http");
      //   console.log(error.status);
      //   console.log(error.error); // error message as string
      //   console.log(error.headers);
      // });

      // if(typeof(this.fcm) !== "undefined"){
      //
      //   this.fcm.getToken().then(token=>{
      //     console.log(token);
      //     // backend.registerToken(token);
      //   })
      //
      //   // if (this.fcm.subscribeToTopic('all')){
      //   //     console.log("subscribed to topic ALL");
      //   // }else{
      //   //   console.log("failed");
      //   // }
      //
      //   this.fcm.onNotification().subscribe(data=>{
      //     if(data.wasTapped){
      //       console.log("Received in background");
      //       // console.log(JSON.stringify(data));
      //       alert(data.title+": "+ data.body);
      //     } else {
      //       console.log("Received in foreground");
      //       // console.log(JSON.stringify(data));
      //       // var info = JSON.stringify(data);
      //       alert(data.title+": "+ data.body);
      //     };
      //   })
      //
      //   fcm.onTokenRefresh().subscribe(token=>{
      //     console.log(token);
      //   })

      // } else alert("Notifications disabled, only provided in Android/iOS environment");
      });


  }

  // listenToNotifications() {
  //   return this.firebase.onNotificationOpen();
  // }
}
