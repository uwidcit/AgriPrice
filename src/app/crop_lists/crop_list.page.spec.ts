import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { CropListPage } from './crop_list.page';

describe('Tab1Page', () => {
  let component: CropListPage;
  let fixture: ComponentFixture<CropListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CropListPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(CropListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
