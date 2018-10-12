import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatChipsModule, MatDatepickerModule, MatDialogModule, MatFormFieldModule, MatInputModule, MAT_DATE_LOCALE, DateAdapter, MatNativeDateModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CoreModule } from 'src/app/core/core.module';
import { AccountPaycheckDataComponent } from './account-paycheck-grid/account-paycheck-data/account-paycheck-data.component';
import { AccountPaycheckGridComponent } from './account-paycheck-grid/account-paycheck-grid.component';
import { AccountPaycheckGridService } from './account-paycheck-grid/account-paycheck-grid.service';
import { AccountComponent } from './account-paycheck-grid/account/account.component';
import { AddEditAccountComponent } from './account-paycheck-grid/add-edit-account/add-edit-account.component';
import { AddEditPaycheckComponent } from './account-paycheck-grid/add-edit-paycheck/add-edit-paycheck.component';
import { AddEditTransactionsComponent } from './account-paycheck-grid/add-edit-transactions/add-edit-transactions.component';
import { PaycheckComponent } from './account-paycheck-grid/paycheck/paycheck.component';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    CoreModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    SharedModule,
  ],
  entryComponents: [
    AddEditAccountComponent,
    AddEditPaycheckComponent,
    AddEditTransactionsComponent,
  ],
  declarations: [
    DashboardComponent,
    AccountPaycheckGridComponent,
    PaycheckComponent,
    AccountComponent,
    AccountPaycheckDataComponent,
    AddEditAccountComponent, 
    AddEditPaycheckComponent, 
    AddEditTransactionsComponent
  ],
  providers: [
    AccountPaycheckGridService,
  ],
  exports: [DashboardComponent]
})
export class DashboardModule { }
