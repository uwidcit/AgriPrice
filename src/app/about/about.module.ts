import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AboutPage } from './about-page.component';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { AboutRoutingModule } from './about-routing.module'

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: AboutPage }]),
    AboutRoutingModule,
  ],
  declarations: [AboutPage]
})
export class AboutModule {}
