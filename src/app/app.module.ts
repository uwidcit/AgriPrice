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

import { SortPipe } from '../app/pipes/SortPipe';
import { CapitalizePipe } from '../app/pipes/CapitalizePipe';


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
    SortPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
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
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
