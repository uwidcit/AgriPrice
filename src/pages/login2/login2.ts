import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController,AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-login2',
  templateUrl: 'login2.html',
})
export class Login2Page {

  user = {
    email:'',
    password:''
  }
  isLoggedIn:boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,private afAuth: AngularFireAuth,public toastCtrl: ToastController,public alertCtrl: AlertController,public storage: Storage) {
  }

  async login() {
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(this.user.email, this.user.password);
      if (result) {
        // console.log(result);
        // console.log("working");
        this.navCtrl.setRoot(HomePage);
        this.isLoggedIn = true;
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
         this.navCtrl.setRoot(HomePage);
         this.isLoggedIn = true;
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
        title: 'Email sent.',
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
}
