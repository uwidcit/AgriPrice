import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CropviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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

  ionViewDidLoad() {
    console.log('ionViewDidLoad CropviewPage');
  }

}
