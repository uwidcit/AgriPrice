import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PricesPage } from './prices-page.component';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { PricesRoutingModule } from './prices-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    PricesRoutingModule
  ],
  declarations: [PricesPage]
})
export class PricesModule {}
