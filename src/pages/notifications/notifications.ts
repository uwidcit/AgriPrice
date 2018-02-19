import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { LoginPage } from '../login/login';
import { FCM } from '@ionic-native/fcm';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthenticationService } from '../../core/AuthenticationService';
import * as firebase from 'firebase/app';
import { ToastController} from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html'
})
export class NotificationsPage {

  posts: any;
  dailycrops = [];
  item1: any;
  items: Observable<any[]>;
  key: any;
  list: any;

  constructor(public navCtrl: NavController,public http: HTTP,public fcm: FCM,public afDB: AngularFireDatabase,public authenticationService: AuthenticationService,public toastCtrl: ToastController) {
    this.authenticationService.checkAuthentication().subscribe((user:firebase.User)=>{
      if (user===null){
        this.navCtrl.setRoot(LoginPage);
      }else{
        this.http.get('https://agrimarketwatch.herokuapp.com/crops/daily/recent', {}, {})
        .then(data => {
          this.posts = JSON.parse(data.data);
          this.dailycrops = this.posts;
        })
        .catch(error => {
          console.log(error.status);
          console.log(error.error); // error message as string
          console.log(error.headers);
        });
        // this.populateList();
      }
    })
  }

  populateList(){
    var i;
    var url;
    this.key = this.authenticationService.getUserId();
    url="users/"+this.key;
    alert(url);
    this.items = this.afDB.list(url).valueChanges();
    if(this.items!=null){
      for(i in this.items){
        // alert(this.items[i]);
      }
    }
  }


  subscribeToTopic(e: any,crop){
    var newcrop = crop.commodity.replace(/[^a-zA-Z ]/g,'').replace(/ /g,'');//converts commodity to word without spaces and non-alphanumeric characters
    var mes;
    if (e.checked){
      if (this.key==null){
        this.key = this.authenticationService.getUserId();
      }
      this.afDB.list("users/"+this.key+"/"+newcrop).push(newcrop);
      // this.fcm.subscribeToTopic(newcrop);
      mes = "Subscibed to commodity: " + crop.commodity;
      let toast = this.toastCtrl.create({
          message: mes,
          duration: 5000,
          position: 'top'
      });
      toast.present();
    }else{
      // this.fcm.unsubscribeFromTopic(newcrop);
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
