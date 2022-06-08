import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealershipGridGraphViewComponent } from './grid-graph-view.component';

describe('DealershipGridGraphViewComponent', () => {
  let component: DealershipGridGraphViewComponent;
  let fixture: ComponentFixture<DealershipGridGraphViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealershipGridGraphViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealershipGridGraphViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
