import { Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { SaleComponent } from './sale/sale.component';
import { DealershipComponent } from './dealership/dealership.component';

@Component({
  selector: 'app-sales-dashboard',
  templateUrl: './sales-dashboard.component.html',
  styleUrls: ['./sales-dashboard.component.scss']
})
export class SalesDashboardComponent implements OnInit {
  selectedView = 0;
  constructor() { }

  ngOnInit(): void {
  }

  viewChanged(viewIndex: number) {
    return this.selectedView = viewIndex
  }

  isActiveView(viewIndex: number) {
    return this.selectedView === viewIndex
  }

}
