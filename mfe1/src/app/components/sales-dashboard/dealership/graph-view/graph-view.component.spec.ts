import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealershipGraphViewComponent } from './graph-view.component';

describe('DealershipGraphViewComponent', () => {
  let component: DealershipGraphViewComponent;
  let fixture: ComponentFixture<DealershipGraphViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealershipGraphViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealershipGraphViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
