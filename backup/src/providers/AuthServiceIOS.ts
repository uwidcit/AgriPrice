import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { GooglePlus } from '@ionic-native/google-plus';
import * as firebase from 'firebase/app';
const MAX = 78;

@Injectable()

export class AuthServiceIOS{
  firebaseUid: any;
  userId :any;
  displayName: any;
  familyName: any;
  givenName: any;
  isLoggedIn:boolean = false;
  cropList = [];

  constructor(public toastCtrl: ToastController,public storage: Storage,public googlePlus: GooglePlus){

  }

  public login(){
    this.googlePlus.login({})
      .then(res => {
        this.displayName = res.displayName;
        this.userId = res.userId;
        this.familyName = res.familyName;
        this.givenName = res.givenName;
        this.isLoggedIn = true;

        const googleCredential = firebase.auth.GoogleAuthProvider
              .credential(res.idToken);

        firebase.auth().signInWithCredential(googleCredential)
        .then( response => {
            // console.log("Firebase success: " + JSON.stringify(response));
            this.firebaseUid = response.uid;
            this.updateCropList(response.uid);

        });
        // console.log(res);
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
    return this.firebaseUid;
  }

  public trySilentLogin(){
    this.storage.get('loggedIn').then((val) => {
      if(val == true){
        this.googlePlus.trySilentLogin({})
        .then(res => {
          // console.log(res);
          // alert("silent log in");
          this.isLoggedIn = true;
          this.displayName = res.displayName;
          this.userId = res.userId;
          this.familyName = res.familyName;
          this.givenName = res.givenName;

          const googleCredential = firebase.auth.GoogleAuthProvider
                .credential(res.idToken);

          firebase.auth().signInWithCredential(googleCredential)
          .then( response => {
              // console.log("Firebase success: " + JSON.stringify(response));
              this.firebaseUid = response.uid;
              this.updateCropList(response.uid);
          });


          // this.storage.set('displayName', this.displayName);
          // this.storage.set('userId', this.userId);
          this.storage.set('loggedIn', this.isLoggedIn);
        })
        .catch(err => console.error(err));
      }
    });
  }

  public updateCropList(uid){
    var i = 0;
    var check = 0;
    var notes = [];
    firebase.database().ref('/users/'+uid).on('child_added',(snapshot) => {
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