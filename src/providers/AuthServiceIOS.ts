import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { GooglePlus } from '@ionic-native/google-plus';

@Injectable()

export class AuthServiceIOS{
  userId :any;
  displayName: any;
  familyName: any;
  givenName: any;
  isLoggedIn:boolean = false;

  constructor(public toastCtrl: ToastController,public storage: Storage,public googlePlus: GooglePlus){

  }

  public login(){
    this.googlePlus.login({})
      .then(res => {
        console.log(res);
        this.displayName = res.displayName;
        this.userId = res.userId;
        this.familyName = res.familyName;
        this.givenName = res.givenName;
        this.isLoggedIn = true;
        // this.storage.set('displayName', this.displayName);
        // this.storage.set('userId', this.userId);
        this.storage.set('loggedIn', this.isLoggedIn);
        let toast = this.toastCtrl.create({
            message: "Logged In",
            duration: 5000,
            position: 'top'
        });
        toast.present();
      })
      .catch(err => console.error(err));

  }

  public logOut(){
    this.googlePlus.logout()
    .then(res => {
        this.displayName = "";
        this.familyName = "";
        this.givenName = "";
        this.userId = "";
        this.isLoggedIn = false;
        // this.storage.set('displayName', this.displayName);
        // this.storage.set('userId', this.userId);
        this.storage.set('loggedIn', this.isLoggedIn);
        let toast = this.toastCtrl.create({
            message: "Logged Out",
            duration: 5000,
            position: 'top'
        });
        toast.present();
      })
      .catch(err => console.error(err));
  }


  public checkLogIn(){
    // this.storage.get('loggedIn').then((val) => {
    //   this.isLoggedIn = val;
    // });
    return this.isLoggedIn;
  }

  public getUserName(){
    // this.storage.get('displayName').then((val) => {
    //   this.displayName = val;
    // });
    return this.displayName;
  }

  public getUserId(){
    return this.userId;
  }

  public trySilentLogin(){
    this.storage.get('loggedIn').then((val) => {
      if(val == true){
        this.googlePlus.trySilentLogin({})
        .then(res => {
          console.log(res);
          this.displayName = res.displayName;
          this.userId = res.userId;
          this.familyName = res.familyName;
          this.givenName = res.givenName;
          this.isLoggedIn = true;
          // this.storage.set('displayName', this.displayName);
          // this.storage.set('userId', this.userId);
          this.storage.set('loggedIn', this.isLoggedIn);
        })
        .catch(err => console.error(err));
      }
    });
  }


}