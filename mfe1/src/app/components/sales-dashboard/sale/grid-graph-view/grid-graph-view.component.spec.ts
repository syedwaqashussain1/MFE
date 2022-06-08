import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridGraphViewComponent } from './grid-graph-view.component';

describe('GridGraphViewComponent', () => {
  let component: GridGraphViewComponent;
  let fixture: ComponentFixture<GridGraphViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridGraphViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridGraphViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
