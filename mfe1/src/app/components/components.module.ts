import { LayoutModule } from './../layout/layout.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesDashboardComponent } from './sales-dashboard/sales-dashboard.component';
import { FormsModule } from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {TabViewModule} from 'primeng/tabview';
import { DealershipComponent } from './sales-dashboard/dealership/dealership.component';
import { ServiceComponent } from './sales-dashboard/service/service.component';
import { SaleComponent } from './sales-dashboard/sale/sale.component';
import { GridViewComponent } from './sales-dashboard/sale/grid-view/grid-view.component';
import { GridGraphViewComponent } from './sales-dashboard/sale/grid-graph-view/grid-graph-view.component';
import { GraphViewComponent } from './sales-dashboard/sale/graph-view/graph-view.component';

import { DealershipGridViewComponent } from './sales-dashboard/dealership/grid-view/grid-view.component';
import { DealershipGridGraphViewComponent } from './sales-dashboard/dealership/grid-graph-view/grid-graph-view.component';
import { DealershipGraphViewComponent } from './sales-dashboard/dealership/graph-view/graph-view.component';
import {AccordionModule} from 'primeng/accordion';
import {TableModule} from 'primeng/table';
import {InputSwitchModule} from 'primeng/inputswitch';
import {DropdownModule} from 'primeng/dropdown';
import {ChartModule} from 'primeng/chart';


@NgModule({
  declarations: [
    SalesDashboardComponent,
    DealershipComponent,
    ServiceComponent,
    SaleComponent,
    GridViewComponent,
    GridGraphViewComponent,
    GraphViewComponent,
    DealershipGridViewComponent,
    DealershipGridGraphViewComponent,
    DealershipGraphViewComponent

  ],
  imports: [
    CommonModule,
    LayoutModule,
    FormsModule,
    ButtonModule,
    TabViewModule,
    AccordionModule,
    TableModule,
    InputSwitchModule,
    DropdownModule,
    ChartModule
  ],
  exports: [
    SalesDashboardComponent
  ]
})
export class ComponentsModule { }
