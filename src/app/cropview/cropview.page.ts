import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Storage} from "@ionic/storage";


@Component({
  selector: 'page-cropview',
  templateUrl: 'cropview.page.html',
  styleUrls: ['cropview.page.scss']
})
export class CropViewPage {

  crop = {
    'commodity': '',
    'price': 0,
    'category': '',
    'date': new Date(),
    'volume': 0,
    'unit': ''
  };
  constructor(
    private route: ActivatedRoute,
    private storage: Storage
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.storage.get("select_crop").then(res => {
        if(params.crop_id != res.id){
          console.warn("Data retrieved from database not consistent with url parameter")
        }
        this.crop = res;
      });
    })
  }

}
