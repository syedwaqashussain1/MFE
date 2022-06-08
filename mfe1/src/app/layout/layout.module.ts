import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import {SidebarModule} from 'primeng/sidebar';
import {ButtonModule} from 'primeng/button';
import { PageHeadComponent } from './page-head/page-head.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    PageHeadComponent,
  ],
  imports: [
    CommonModule,
    SidebarModule,
    ButtonModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    PageHeadComponent
  ]
})
export class LayoutModule { }
