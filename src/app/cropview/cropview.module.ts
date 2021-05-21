import { NgModule } from '@angular/core';
import { CropViewPage } from './cropview.page';
import {IonicModule} from "@ionic/angular";
import {CommonModule} from "@angular/common";
import {CropViewRoutingModule} from "./cropview-routing.module";

@NgModule({
  declarations: [CropViewPage],
  entryComponents:[CropViewPage],
  imports: [
    IonicModule,
    CommonModule,
    CropViewRoutingModule
  ],
})
export class CropViewPageModule {}
