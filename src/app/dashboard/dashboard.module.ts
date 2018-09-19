import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { AccountPaycheckGridComponent } from './account-paycheck-grid/account-paycheck-grid.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DashboardComponent, AccountPaycheckGridComponent],
  exports: [DashboardComponent]
})
export class DashboardModule { }
