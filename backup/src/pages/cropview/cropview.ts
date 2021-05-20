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
  monthlyGraphData = [];
  monthyLabels = [];
  period: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.crop = navParams.get('param1');
    this.graphData = navParams.get('param2');
    this.graphLabels = navParams.get('param3');
    this.monthlyGraphData = navParams.get('param4');
    this.monthyLabels = navParams.get('param5');
    this.period = navParams.get('param6');
  }

  OpenVisualizePage(){
    this.navCtrl.push(VisualizePage, {param1: this.graphData,param2: this.graphLabels,param3: this.monthlyGraphData,param4: this.monthyLabels,param5: this.crop,param6: this.period});
  }

}
