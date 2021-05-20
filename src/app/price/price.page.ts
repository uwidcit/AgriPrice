import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-price',
  templateUrl: 'price.page.html',
  styleUrls: ['price.page.scss']
})
export class PricePage {

  sortedDailycrops: Object = [];
  cDate: any;
  dates = [];
  dailyRecentEndPoint = 'https://agrimarketwatch.herokuapp.com/crops/daily/recent';

  constructor(
    private http: HttpClient
  ) {
  }

  ngOnInit() {
    this.getData();
  }

  openViewPage(crop) {

  }

  getData() {
    this.http.get(this.dailyRecentEndPoint)
      .toPromise()
      .then(recs => {
        this.sortedDailycrops = recs;
      });

  }
}
