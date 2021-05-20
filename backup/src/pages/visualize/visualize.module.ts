import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VisualizePage } from './visualize';

@NgModule({
  declarations: [
    VisualizePage,
  ],
  imports: [
    IonicPageModule.forChild(VisualizePage),
  ],
})
export class VisualizePageModule {}
