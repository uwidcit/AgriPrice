import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CropviewPage } from './cropview';

@NgModule({
  declarations: [
    CropviewPage,
  ],
  imports: [
    IonicPageModule.forChild(CropviewPage),
  ],
})
export class CropviewPageModule {}
