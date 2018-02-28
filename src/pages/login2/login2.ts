import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,private afAuth: AngularFireAuth) {
  }

  async login() {
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(this.user.email, this.user.password);
      if (result) {
        console.log(result);
        console.log("working");
        this.navCtrl.setRoot(HomePage);
      }
    }
    catch (e) {
      console.log("error signing in");
      console.error(e);
    }
  }

  async register() {
     try {
       const result = await this.afAuth.auth.createUserWithEmailAndPassword(this.user.email,this.user.password);
       if (result) {
         console.log(result);
         console.log("working");
         this.navCtrl.setRoot(HomePage);
       }
     } catch (e) {
       console.log('error registering');
       console.error(e);
     }
   }

}
