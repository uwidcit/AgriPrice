import { Component, ViewChild } from '@angular/core';
import { Tabs } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { NotificationsPage } from '../notifications/notifications';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild("myTabs") tabRef: Tabs;

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = NotificationsPage;

  constructor() {

  }

  selectHomePage(){
    this.tabRef.select(1);
  }
  selectNotificationsPage(){
    this.tabRef.select(2);
  }

}
