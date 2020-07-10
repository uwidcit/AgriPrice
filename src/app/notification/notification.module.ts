import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationPage } from './notification-page.component';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { NotificationRoutingModule } from './notification-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    NotificationRoutingModule
  ],
  declarations: [NotificationPage]
})
export class NotificationModule {}
