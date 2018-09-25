import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CoreModule } from 'src/app/core/core.module';
import { AccountPaycheckDataComponent } from './account-paycheck-grid/account-paycheck-data/account-paycheck-data.component';
import { AccountPaycheckGridComponent } from './account-paycheck-grid/account-paycheck-grid.component';
import { AccountPaycheckGridService } from './account-paycheck-grid/account-paycheck-grid.service';
import { AccountComponent } from './account-paycheck-grid/account/account.component';
import { PaycheckComponent } from './account-paycheck-grid/paycheck/paycheck.component';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    CoreModule,
  ],
  declarations: [DashboardComponent, AccountPaycheckGridComponent, PaycheckComponent, AccountComponent, AccountPaycheckDataComponent],
  providers: [AccountPaycheckGridService],
  exports: [DashboardComponent]
})
export class DashboardModule { }
