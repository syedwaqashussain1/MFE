import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { endsWith } from './router.utils';
import { AComponent } from './a/a.component';
import { BComponent } from './b/b.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module';
import { ComponentsModule } from './components/components.module';
import { LayoutModule } from './layout/layout.module';
import { SalesDashboardComponent } from './components/sales-dashboard/sales-dashboard.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ComponentsModule,
    LayoutModule,
    // RouterModule.forRoot([
    //   { matcher: endsWith('a'), component: SalesDashboardComponent},
    //   { matcher: endsWith('b'), component: BComponent},
    // ])
  ],
  declarations: [
    AComponent,
    BComponent,
    AppComponent,
  ],
  providers: [],
  bootstrap: []
})
export class AppModule {
  constructor(private injector: Injector) {
  }

  ngDoBootstrap() {
    const ce = createCustomElement(AppComponent, {injector: this.injector});
    customElements.define('mfe1-element', ce);

    // <mfe1-element></mfe1-element>
  }

}
