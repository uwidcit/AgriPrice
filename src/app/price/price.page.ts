import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NavController} from "@ionic/angular";
import {Storage} from "@ionic/Storage";

@Component({
  selector: 'app-price',
  templateUrl: 'price.page.html',
  styleUrls: ['price.page.scss']
})
export class PricePage {

  sortedDailyCrops: Object = [];
  cDate: any;
  dates: Object = [];
  dailyRecentEndPoint = 'https://agrimarketwatch.herokuapp.com/crops/daily/recent';
  dailyDatesEndPoint = 'https://agrimarketwatch.herokuapp.com/crops/daily/dates';

  constructor(
    private http: HttpClient,
    private navCtrl: NavController,
    private storage: Storage
  ) {
  }

  ngOnInit() {
    this.getData();
    this.getDates();
  }

  openViewPage(crop) {
    this.storage.set("select_crop", crop).then(() => {
      return this.navCtrl.navigateForward(`prices/crop-detail/${crop.id}`);
    });
  }

  getData() {
    this.http.get(this.dailyRecentEndPoint)
      .toPromise()
      .then(recs => {
        this.sortedDailyCrops = recs;
      });
  }

  getDates() {
    this.http.get(this.dailyDatesEndPoint)
      .toPromise()
      .then(data => {
        this.dates = data;
        this.cDate = this.dates[0];
      });
  }
}
