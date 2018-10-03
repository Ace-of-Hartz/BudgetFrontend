import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PaycheckRepository } from './repositories/paycheck.repository';
import { AccountRepository } from './repositories/account.repository';
import { NavBarModule } from './nav-bar/nav-bar.module';
import { TransactionRepository } from './repositories/transaction.repository';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    NavBarModule,
  ],
  providers: [
    PaycheckRepository,
    AccountRepository,
    TransactionRepository,
  ],
  declarations: [],
  exports:[NavBarModule]
})
export class CoreModule { }
