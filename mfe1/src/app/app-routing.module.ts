import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesDashboardComponent } from './components/sales-dashboard/sales-dashboard.component';
import { endsWith } from './router.utils';

const routes: Routes = [
  {
    matcher: endsWith('dashboard'), component: SalesDashboardComponent
  },
  { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
