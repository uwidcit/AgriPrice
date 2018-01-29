import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VisualizePage } from '../visualize/visualize';


@IonicPage()
@Component({
  selector: 'page-cropview',
  templateUrl: 'cropview.html',
})
export class CropviewPage {

  crop: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.crop = navParams.get('param1');
  }

  OpenVisualizePage(){
    this.navCtrl.push(VisualizePage);
  }

}
