import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PricesPage } from './prices-page.component';

const routes: Routes = [
  {
    path: '',
    component: PricesPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PricesRoutingModule {}
