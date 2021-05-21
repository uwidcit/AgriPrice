import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CropViewPage} from "./cropview.page";

const routes: Routes = [
  {
    path: '',
    component: CropViewPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CropViewRoutingModule {
}
