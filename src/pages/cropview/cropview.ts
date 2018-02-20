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
  graphData = [];
  graphLabels = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.crop = navParams.get('param1');
    this.graphData = navParams.get('param2');
    this.graphLabels = navParams.get('param3');
  }

  OpenVisualizePage(){
    this.navCtrl.push(VisualizePage, {param1: this.graphData,param2: this.graphLabels});
  }

}
