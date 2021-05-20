import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {PricePage} from './price.page';
import {PricePageRoutingModule} from './price-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    PricePageRoutingModule
  ],
  declarations: [PricePage]
})
export class PricePageModule {
}
