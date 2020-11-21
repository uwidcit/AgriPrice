import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CropListPage} from './crop_list.page';
import {ExploreContainerComponentModule} from '../explore-container/explore-container.module';
import {CapitalizePipe} from '../pipes/CapitalizePipe';
import {ProcessPricePipe} from '../pipes/ProcessPricePipe';
import {DatePipe} from '../pipes/DatePipe';
import {ProcessUnitPipe} from '../pipes/ProcessUnitPipe';
import {ProcessVolumePipe} from '../pipes/ProcessVolumePipe';
import {CheckedPipe} from '../pipes/CheckedPipe';
import {RemoveEmptyCropPipe} from '../pipes/RemoveEmptyCropPipe';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ExploreContainerComponentModule,
        RouterModule.forChild([{path: '', component: CropListPage}])
    ],
    declarations: [
        CropListPage,
        CapitalizePipe,
        ProcessPricePipe,
        DatePipe,
        ProcessUnitPipe,
        ProcessVolumePipe,
        CheckedPipe,
        RemoveEmptyCropPipe]
})
export class CropListsModule {
}
