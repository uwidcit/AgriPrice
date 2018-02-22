import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { LoginPage } from '../login/login';
import { FCM } from '@ionic-native/fcm';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthenticationService } from '../../core/AuthenticationService';
import * as firebase from 'firebase/app';
import { ToastController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

const MAX=78;

@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html'
})
export class NotificationsPage {

  posts = [];
  dailycrops = [];
  item1: any;
  // items: Observable<any[]>;
  key: any;
  list: any;
  cropList = [];
  isFavorite = false;


  constructor(public navCtrl: NavController,public platform: Platform,public http: HTTP,public fcm: FCM,public afDB: AngularFireDatabase,public authenticationService: AuthenticationService,public toastCtrl: ToastController,public storage: Storage,public loadingCtrl: LoadingController,public alertCtrl: AlertController) {
    let loader = this.loadingCtrl.create({
      content: "Loading Notifications Preferences.....",
      spinner: 'bubbles',
    });
    loader.present();

    this.authenticationService.checkAuthentication().subscribe((user:firebase.User)=>{
      if (user===null){
        this.navCtrl.setRoot(LoginPage);
        setTimeout(() => {
          loader.dismiss();
        }, 1000);
      }else{
        this.createCheckList();
        this.populateList();
        this.http.get('https://agrimarketwatch.herokuapp.com/crops/daily/recent', {}, {})
        .then(data => {
          this.posts = JSON.parse(data.data);
          this.dailycrops = this.posts;
          setTimeout(() => {
            loader.dismiss();
          }, 1000);
        })
        .catch(error => {
          loader.dismiss();
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
          console.log(error.status);
          console.log(error.error); // error message as string
          console.log(error.headers);
        });
      }
    })

  }

  exitApp(){
     this.platform.exitApp();
  }

  createCheckList(){
    var i = 0;
    for (i = 0;i<MAX;i++){
     this.cropList.push({checked:'false'});
    }
  }


  populateList(){
    // this.storage.clear();
    this.storage.ready().then(() => {
      this.storage.forEach((value: string, key: string, index: number) => {
        console.log("key "+ key);
        console.log("value "+ value);
        this.cropList[key].checked = value;
      });
    })
  }


  subscribeToTopic(e: any,crop,num){
    var newcrop = crop.commodity.replace(/[^a-zA-Z ]/g,'').replace(/ /g,'');//converts commodity to word without spaces and non-alphanumeric characters
    var mes;
    if (e.checked){
      this.storage.set(num.toString(), 'true');
      if (this.key==null){
        this.key = this.authenticationService.getUserId();
      }
      this.afDB.list("users/"+this.key+"/"+newcrop).push(newcrop);
      this.fcm.subscribeToTopic(newcrop);
      mes = "Subscibed to commodity: " + crop.commodity;
      let toast = this.toastCtrl.create({
          message: mes,
          duration: 5000,
          position: 'top'
      });
      toast.present();
    }else{
      this.storage.set(num.toString(), 'false');
      this.fcm.unsubscribeFromTopic(newcrop);
      mes = "Unsubscibed to commodity: " + crop.commodity;
      let toast = this.toastCtrl.create({
          message: mes,
          duration: 5000,
          position: 'top'
      });
      toast.present();
      this.afDB.list("users/"+this.key).remove(newcrop);
    }
  }

  OpenLoginPage(){
    this.navCtrl.push(LoginPage);
  }


}
