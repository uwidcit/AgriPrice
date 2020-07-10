import { Component } from '@angular/core';
import '@capacitor-community/http';

import { Plugins } from '@capacitor/core';
import {HttpPluginWeb, HttpResponse} from '@capacitor-community/http';
const { Http } = Plugins;

@Component({
  selector: 'app-tab1',
  templateUrl: 'prices-page.component.html',
  styleUrls: ['prices-page.component.scss']
})
export class PricesPage {
  private http: HttpPluginWeb;
  crops: [any];
  availableDates: [any];
  cropDate: string;
  private latestCropsAPI = 'https://agrimarketwatch.herokuapp.com/crops/daily/recent';
  private datesAPI = 'https://agrimarketwatch.herokuapp.com/crops/daily/dates';
  private imageNameMapper = {
    'spinach(amarantusspp.)': 'spinach(amarantusspp)',
    cauliflower: 'cauliflower(local)',
    eddoe: 'eddoe(local)',
    yam: 'yam(local)',
    sweetpotato: 'sweetpotato(local)',
    sweetpepper: 'sweetpepper(s)',
    tomato: 'tomato(s)',
    dasheen: 'dasheen(local)'
  };
  private monthNames = [
    'Jan', 'Feb', 'Mar',
    'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep',
    'Oct', 'Nov', 'Dec'
  ];

  constructor() {
    if (Http instanceof HttpPluginWeb) { this.http = Http; }
  }

  private static capitalize(crop: any) {
    if (!crop.commodity) { return crop; }
    crop.commodity = crop.commodity.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
    return crop;
  }

  private static convertPrice(crop: any) {
    if (!crop) { return crop; }
    if (!crop.unit){ return crop; }
    if (!crop.price){ return crop; }
    const price = parseFloat(crop.price);

    if (crop.unit.toLowerCase() === 'kg'){
      if (price !== 0) {
        crop.price = (price / 2.20462).toFixed(2);
      }
    }
    return crop;
  }

  private static generateIconURL(crop: any, imageNameMapper: object) {
    let commodity = crop.commodity.toLowerCase().replace(/ /g, '');
    if (imageNameMapper.hasOwnProperty(commodity)){
      commodity = imageNameMapper[commodity];
      console.log(`True for ${commodity}`);
    }
    crop.commodityImgURL = `assets/imgs/fruits/${commodity}.jpg`;
    // console.log('Generated: ' + crop.commodityImgURL);
    return crop;
  }

  private static sortRecords(crops: any) {
    crops.sort((cropA, cropB) => {
      const nameA = cropA.commodity.toLowerCase();
      const nameB = cropB.commodity.toLowerCase();
      if (nameA < nameB){ return -1; }
      if (nameA > nameB){ return 1; }
      return 0;
    });
    return crops;
  }

  ionViewDidEnter(){
    this.requestDailyDates()
      .then(res => this.formatRetrievedDates(res.data))
      .then(dates => this.displayRetrievedDates(dates))
      .catch(e => {
        console.error(e);
        this.notifyUser('No date records was received', 'error');
      });

    this.requestLatestCropPrices()
      .then(res => this.formatCropRecords(res.data))
      .then(crops => this.displayCropRecords(crops))
      .then(() => {/* update the dialog for loading */})
      .catch(e => {
        console.error(e);
        this.notifyUser('No crop records was received', 'error');
      });
  }

  formatCropRecords(crops: [any]): Promise<[any]>{
    return new Promise<any>((resolve, reject) => {
      if (crops){
        let formattedCrops = crops.map(crop => {
          let record = PricesPage.capitalize(crop);
          record = PricesPage.convertPrice(record);
          record = PricesPage.generateIconURL(record, this.imageNameMapper);
          return record;
        });

        formattedCrops = PricesPage.sortRecords(formattedCrops);
        resolve(formattedCrops);
      } else {
        reject('Failed to update crops');
      }
    });
  }

  displayCropRecords(crops: [any]): Promise<string>{
    return new Promise<string>((resolve, reject) => {
      if (crops){
        this.crops = crops;
        this.cropDate = crops[0].date;
        resolve('Updated list of available crops');
      } else {
        reject('Failed to update crops');
      }
    });
  }

  requestLatestCropPrices(): Promise<HttpResponse>{
    return Http.request({
      method: 'GET',
      url: this.latestCropsAPI
    });
  }

  requestDailyDates(): Promise<HttpResponse>{
    return Http.request({
      method: 'GET',
      url: this.datesAPI
    });
  }

  requestCropsByDate(date: any): Promise<HttpResponse> {
    return Http.request({
      method: 'GET',
      url: this.datesAPI + '/' + date
    });
  }

  private formatRetrievedDates(dates: any): Promise<[any]> {
    return new Promise<[any]>((resolve, reject) => {
      if (dates) {
        const formattedDateObjects = dates.map(dateRec => {
          const date = new Date(dateRec);
          return {
            valueDate: dateRec,
            displayDate: `${date.getFullYear()}-${this.monthNames[date.getMonth()]}-${date.getDate()}`
          };
        });

        formattedDateObjects.sort((dateA, dateB) => {
          return new Date(dateB.valueDate).getTime() - new Date(dateA.valueDate).getTime();
        });

        resolve(formattedDateObjects);
      } else {
        reject('Unable to format dates. No dates received');
      }
    });
  }

  private displayRetrievedDates(dates: [any]): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (dates){
        this.availableDates = dates;
        resolve('Updated list of available dates');
      } else {
        reject('Failed to update dates');
      }
    });
  }

  initiateRequestCropsByDate(date){
    if (date) {
      this.requestCropsByDate(date)
        .then(res => this.formatCropRecords(res.data))
        .then(crops => this.displayCropRecords(crops))
        .then(() => {/* update the dialog for loading */
        })
        .catch(e => {
          console.error(e);
          this.notifyUser('No crop records was received', 'error');
        });
    } else {
      this.notifyUser('No date was selected', 'info');
    }
  }

  notifyUser(message: string, messageType: string){
    switch (messageType.toLowerCase()) {
      case 'error':
        console.error(message);
        break;
      case 'info':
        console.log(message);
        break;
      default:
        console.log(message);
    }
  }


}
