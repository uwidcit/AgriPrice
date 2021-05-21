import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PricePage} from './price.page';

const routes: Routes = [
  {
    path: '',
    component: PricePage,
  },
  {
    path: 'crop-detail/:crop_id',
    loadChildren: () => import('../cropview/cropview.module').then(m => m.CropViewPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PricePageRoutingModule {
}
