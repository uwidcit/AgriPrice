import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController, Tabs, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
// import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';
import { AuthenticationService } from '../../providers/AuthenticationService';
import { Firebase } from '@ionic-native/firebase';
import * as firebase from 'firebase/app';

const MAX = 78;

@IonicPage()
@Component({
  selector: 'page-login2',
  templateUrl: 'login2.html',
})
export class Login2Page {
  cropList = [];
  user = {
    email:'',
    password:''
  }
  isLoggedIn:boolean = false;
  locFrom: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private afAuth: AngularFireAuth,public toastCtrl: ToastController,public alertCtrl: AlertController,public storage: Storage,public tabs:Tabs,public authenticationService: AuthenticationService) {
    firebase.logEvent("LoginPage2", {content_type: "page_view", item_id: "LoginPage2"});
  }

  async login() {
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(this.user.email, this.user.password);
      if (result) {
        // console.log(result);
        // console.log("working");
        // this.navCtrl.setRoot(HomePage);
        this.locFrom = this.navParams.get('param1');
        if (this.locFrom==2){
          this.navCtrl.pop();
          this.navCtrl.pop();
        }else{
          this.navCtrl.pop();
        }
        this.tabs.select(0);
        this.isLoggedIn = true;
        this.updateCropList();
        this.storage.set('eloggedIn', this.isLoggedIn);
        let toast = this.toastCtrl.create({
            message: "Logged In",
            duration: 5000,
            position: 'top'
        });
        toast.present();

      }
    }
    catch (e) {
      let alert = this.alertCtrl.create({
        title: 'Incorrect email or password.',
        subTitle: e.message,
        buttons: ['Try again']
      });
      alert.present();
      console.log("error signing in");
      console.error(e);
    }
  }

  async register() {
     try {
       const result = await this.afAuth.auth.createUserWithEmailAndPassword(this.user.email,this.user.password);
       if (result) {
         // console.log(result);
         // console.log("working");
         // this.navCtrl.setRoot(HomePage);
         this.navCtrl.pop();
         this.tabs.select(0);
         this.isLoggedIn = true;
         this.createCheckList();
         this.storage.set('croplist',this.cropList);
         this.storage.set('eloggedIn', this.isLoggedIn);
         let toast = this.toastCtrl.create({
             message: "Registered and Logged In",
             duration: 5000,
             position: 'top'
         });
         toast.present();
       }
     } catch (e) {
       let alert = this.alertCtrl.create({
         title: 'Please enter a valid email address and password.',
         subTitle: e.message,
         buttons: ['Dismiss']
       });
       alert.present();
       console.log('error registering');
       console.error(e);
     }
   }

  async resetPassword(){
    try {
      await this.afAuth.auth.sendPasswordResetEmail(this.user.email);
      let alert = this.alertCtrl.create({
        title: 'Password Reset Email sent.',
        buttons: ['Dismiss']
      });
      alert.present();
    }
    catch(e){
      let alert = this.alertCtrl.create({
        title: 'Invalid Email.',
        subTitle: e.message,
        buttons: ['Dismiss']
      });
      alert.present();
      console.log('error reseting password');
      console.error(e);
    }

  }

  public updateCropList(){
    var i = 0;
    var notes = [];
    var check = 0;
    var userId = this.authenticationService.getUserId();
    firebase.database().ref('/users/'+userId).on('child_added',(snapshot) => {
      notes.push(snapshot.val())
      this.createCheckList();
      check = 1;
      for (i = 0;i<MAX; i++){
        this.cropList[i].checked = notes[0][i].checked;
      }
      this.storage.set('croplist',this.cropList);
      // console.log(notes);
    })
    if (check == 0){
      this.createCheckList();
      this.storage.set('croplist',this.cropList);
    }
  }

  public createCheckList(){
    this.cropList = [];
    var i = 0;
    for (i = 0;i<MAX;i++){
      // newcrop = this.dailycrops[i].commodity.replace(/[^a-zA-Z ]/g,'').replace(/ /g,'');
      this.cropList.push({checked:'false'});
    }
  }
}
