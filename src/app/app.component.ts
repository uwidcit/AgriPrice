import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  enablePerformance = true;
  enableAnalytics = true;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private firebase: FirebaseX,
    private router: Router,
    private storage: Storage,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.configureFirebase();
      this.configureAnalytics();
      this.configurePerformance();
    });
  }

  configureFirebase() {
    this.firebase.grantPermission().then(
        (res) => { console.log('Successfully received permission: ', res); },
        (error) => { console.error(error); }
    );
    this.firebase.getToken().then(
        (token) => { this.registerToken(token); },
        (error) => { console.error(error); }
    );

    this.firebase.onTokenRefresh().subscribe(token => { this.registerToken(token); });

    this.firebase.onMessageReceived().subscribe(data => {
      console.log(`User opened a notification ${data}`);
    });
  }

  configureAnalytics() {
    this.firebase.setAnalyticsCollectionEnabled(this.enableAnalytics).then(
        (response) => { console.log(response); },
        (error) => { console.error(error); }
    );
  }

  configurePerformance() {
    this.firebase.setPerformanceCollectionEnabled(this.enablePerformance).then(
        (response) => { console.log(response); },
        (error) => { console.error(error); }
    );
  }

  registerToken(token) {
    console.log('FCM token received successfully');
    this.storage.set('fcm_token', token);
  }
}
