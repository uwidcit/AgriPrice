import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoadingController, ToastController} from '@ionic/angular';
import {finalize} from 'rxjs/operators';
import {Storage} from '@ionic/storage';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';

@Component({
    selector: 'app-crop-list',
    templateUrl: 'crop_list.page.html',
    styleUrls: ['crop_list.page.scss']
})
export class CropListPage {

    baseURL = 'https://agrimarketwatch.herokuapp.com';
    recentCropsURL = `${this.baseURL}/crops/daily/recent`;
    datesURL = `${this.baseURL}/crops/daily/dates`;
    cropsByDateURL = `${this.baseURL}/crops/daily/dates`;
    crops: Array<object> = [];
    loading: any;
    toast: any;
    subscribed: object = {};
    respondToUpdate = true;
    showSubscriptionToggle = false;
    dates: Array<object> = [];
    selectedDate;

    constructor(public http: HttpClient,
                public storage: Storage,
                public firebase: FirebaseX,
                public toastController: ToastController,
                public loadingController: LoadingController) {
    }

    retrieveCrops(): Observable<object> {
        return this.http.get(this.recentCropsURL);
    }

    retrieveCropsByDate(date) {
        console.log(`Receiving crops by date: ${date}`);
        const dateUrl = `${this.cropsByDateURL}/${date}`;
        return this.http.get(dateUrl);
    }

    retrieveDates(): Observable<object> {
        return this.http.get(this.datesURL);
    }

    handleErrorRetrieval(err, dateSource) {
        console.error(err);
        const dataType = dateSource ? dateSource : 'crops';
        const message =  `Failed to retrieve ${dataType} data`;
        return this.presentToastMessage(message);
    }

    handleRetrievedCrops(crops) {
        const args = 'commodity';
        if (crops.length > 0){
            this.selectedDate = crops[0].date;
            crops.sort((a: any, b: any) => {
                return a[args].toLowerCase().localeCompare(b[args].toLowerCase());
            });
            crops.forEach(crop => {
                this.crops.push(crop);
            });
            this.updateSubscriptionsDisplayed(crops);
        } else {
             console.log('No crops received');
        }
    }

    private handleRetrievedDates(dates, updateCrops) {
        dates.forEach(el => {
            this.dates.push(el);
        });
        if (updateCrops){
            const sortedDates = [...this.dates];
            this.selectedDate = sortedDates.reverse()[0];
        }
    }

    updateSubscriptionsDisplayed(cropListing) {
        this.storage.get('subscriptions').then(subscriptions => {
            if (!subscriptions) {
                console.log('Subscription was not previously saved ... storing initial set');
                cropListing.forEach(crop => {
                    this.subscribed[crop.commodity] = false;
                });
                this.storage.set('subscriptions', this.subscribed);
            } else {
                this.subscribed = subscriptions;
            }
        });
    }

    saveChangeInSubscription() {
        this.storage.set('subscriptions', this.subscribed);
    }

    async subscribeToCrop(crop) {
        if (this.respondToUpdate) {
            await this.presentLoadingMessage('Updating subscription');
            const cropSubID = crop.commodity
                .replace(/[^a-zA-Z ]/g, '')
                .replace(/ /g, '');

            // If subscribed[crop] is true, then subscribe else unsubscribe
            const subscribeFunc = this.subscribed[crop.commodity] === true ? this.firebase.subscribe : this.firebase.unsubscribe;
            const actionType = this.subscribed[crop.commodity] === true ? 'subscribed to' : 'unsubscribed from';

            subscribeFunc(cropSubID).then(
                async () => {
                    await this.loading.dismiss();
                    this.saveChangeInSubscription();
                    this.notifySubscribedAction(actionType, crop);
                },
                async err => {
                    this.handleSubscriptionError(err, actionType, crop);
                    await this.loading.dismiss();
                }
            );
        } else {
            this.respondToUpdate = true;
        }
    }

    async notifySubscribedAction(action, crop) {
        const message = `Successfully ${action} ${crop.commodity}`;
        this.presentToastMessage(message);
    }

    private handleSubscriptionError(err, action, crop) {
        console.error(err);
        const message = `Failed to ${action} ${crop.commodity}`;
        this.presentToastMessage(message);
        this.respondToUpdate = false;
        this.subscribed[crop.commodity] = !this.subscribed[crop.commodity];
    }

    async presentLoadingMessage(message) {
        this.loading = await this.loadingController.create({
            message: `${message}...`
        });
        await this.loading.present();
    }

    async presentToastMessage(message) {
        this.toast = await this.toastController.create({
            message: `${message}`,
            duration: 2000
        });
        await this.toast.present();
    }

    // noinspection JSUnusedGlobalSymbols
    async ionViewWillEnter() {
        await this.presentLoadingMessage('Retrieving dates');
        // this.retrieveCrops()
        //     .pipe(finalize(async () => {
        //         await this.loading.dismiss();
        //     }))
        //     .subscribe(
        //         crops => this.handleRetrievedCrops(crops),
        //         error => this.handleErrorRetrieval(error, 'crops')
        //     );

        this.retrieveDates()
            .pipe(finalize(async () => {
                await this.loading.dismiss();
            }))
            .subscribe(
                crops => this.handleRetrievedDates(crops, true),
                error =>  this.handleErrorRetrieval(error, 'dates'));
    }

    async filterCropsByDate($event) {
        const displayDate = new Date(this.selectedDate).toLocaleDateString('en-US');
        await this.presentLoadingMessage(`Retrieving crop prices for ${displayDate}`);
        this.retrieveCropsByDate(this.selectedDate)
            .pipe(finalize(async () => {
                await this.loading.dismiss();
            }))
            .subscribe(
                crops => this.handleRetrievedCrops(crops),
                error => {
                    this.handleErrorRetrieval(error, 'crops');
                }
            );
    }
}
