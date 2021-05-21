import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {PricePage} from './price.page';
import {PricePageRoutingModule} from './price-routing.module';
import {IonicStorageModule} from "@ionic/storage-angular";

@NgModule({
  declarations: [PricePage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicStorageModule,
    PricePageRoutingModule
  ]
})
export class PricePageModule {
}
