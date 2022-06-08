import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealershipGridViewComponent } from './grid-view.component';

describe('DealershipGridViewComponent', () => {
  let component: DealershipGridViewComponent;
  let fixture: ComponentFixture<DealershipGridViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealershipGridViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealershipGridViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
