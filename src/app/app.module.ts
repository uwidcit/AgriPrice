import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { NotificationsPage } from '../pages/notifications/notifications';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { CropviewPage } from '../pages/cropview/cropview';
import { LoginPage } from '../pages/login/login';
import { VisualizePage } from '../pages/visualize/visualize';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HTTP } from '@ionic-native/http';
import { FCM } from '@ionic-native/fcm';
// import { GooglePlus } from '@ionic-native/google-plus';
// import { IonicStorageModule } from '@ionic/storage';

import { SortPipe } from '../app/pipes/SortPipe';
import { CapitalizePipe } from '../app/pipes/CapitalizePipe';
import { DatePipe } from '../app/pipes/DatePipe';
import { ProcessPricePipe } from '../app/pipes/ProcessPricePipe';
import { ProcessUnitPipe } from '../app/pipes/ProcessUnitPipe';
import { ProcessVolumePipe } from '../app/pipes/ProcessVolumePipe';
import { RemoveEmptyCropPipe } from '../app/pipes/RemoveEmptyCropPipe';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthenticationService } from '../core/AuthenticationService';
// import { AngularFireAuth } from 'angularfire2/auth';

export const firebaseConfig = {
  apiKey: "AIzaSyB8LxFyLM1grQ66E6mqXVYevdlZO2jV_HI",
  authDomain: "agriprice-6638d.firebaseapp.com",
  databaseURL: "https://agriprice-6638d.firebaseio.com",
  storageBucket: "agriprice-6638d.appspot.com",
  messagingSenderId: '164306272558'
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    NotificationsPage,
    HomePage,
    CropviewPage,
    TabsPage,
    LoginPage,
    VisualizePage,
    CapitalizePipe,
    SortPipe,
    DatePipe,
    ProcessPricePipe,
    ProcessUnitPipe,
    ProcessVolumePipe,
    RemoveEmptyCropPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
    // IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    NotificationsPage,
    HomePage,
    CropviewPage,
    LoginPage,
    VisualizePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    HTTP,
    FCM,
    AngularFireDatabase,
    AuthenticationService,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
