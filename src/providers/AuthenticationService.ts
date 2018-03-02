import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
// import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { ToastController, Platform } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';

@Injectable()

export class AuthenticationService{
    userId :any;
    displayName: any;
    isLoggedIn:boolean = false;
    constructor(public afAuth: AngularFireAuth, public toastCtrl: ToastController, private platform: Platform,public storage: Storage){

    }

    public signInWithGoogle(){
        if(this.platform.is('cordova')){
            this.signInWithGoogleOnDevice();
        }
        else {
            this.signInWithGoogleOnBrowser();
        }
    }

    public signInWithGoogleOnBrowser(){
        this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((response) => {
            console.log(response);
        })
    }

    public checkAuthentication(): Observable<firebase.User>{
        return this.afAuth.authState.map((data) => {
            return data;
        })
    }

    public getUserName(){
      this.afAuth.authState.subscribe(user => {
        if (!user) {
          return;
        }
        if(user.displayName == null){
          this.displayName == user.email;
          this.storage.set('displayName', user.email);
          // console.log(user.email);
        }else{
          // console.log(user.displayName);
          this.displayName = user.displayName;
          this.storage.set('displayName', this.displayName);
        }

        return;
      });
      return this.displayName;
    }

    public getUserId(){
      this.afAuth.authState.subscribe(user => {
        if (!user) {
          return;
        }
        this.userId = user.uid;
          return;
      });
      return this.userId;
    }

    public signInWithGoogleOnDevice(){
        let provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithRedirect(provider).then(() => {
            return firebase.auth().getRedirectResult();
        }).then((result) => {
            // let token = result.credential.accessToken;
            let toast = this.toastCtrl.create({
                message: "Logged In",
                duration: 5000,
                position: 'top'
            });
            toast.present();
            // this.getUserId();
            // let user = result.user;
        }).catch((error) => {
            let toast = this.toastCtrl.create({
                message: error.message,
                duration: 5000,
                position: 'top'
            });
            toast.present();
        })
    }

    public signOut(){
        this.userId=null;
        this.displayName=null;
        this.afAuth.auth.signOut();
        this.isLoggedIn = false;
        this.storage.set('eloggedIn', this.isLoggedIn);
        let toast = this.toastCtrl.create({
            message: "Logged Out",
            duration: 5000,
            position: 'top'
        });
        toast.present();
    }
}