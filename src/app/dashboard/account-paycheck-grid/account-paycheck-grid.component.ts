import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { BgtAccount } from 'src/app/core/models/Account.model';
import { BgtPaycheck } from 'src/app/core/models/paycheck.model';
import { AccountPaycheckGridService } from './account-paycheck-grid.service';
import { AddEditAccountComponent } from './add-edit-account/add-edit-account.component';
import { AddEditPaycheckComponent } from './add-edit-paycheck/add-edit-paycheck.component';
import { AddEditTransactionsComponent } from './add-edit-transactions/add-edit-transactions.component';

@Component({
  selector: 'bgt-account-paycheck-grid',
  templateUrl: './account-paycheck-grid.component.html',
  styleUrls: ['./account-paycheck-grid.component.scss']
})
export class AccountPaycheckGridComponent implements OnInit {

  accounts: Observable<BgtAccount[]>;
  paychecks: Observable<BgtPaycheck[]>;

  constructor(
    private accountPaycheckGridService: AccountPaycheckGridService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.accounts = this.accountPaycheckGridService.getAccounts();
    this.paychecks = this.accountPaycheckGridService.getPaychecks();
  }

  showAccount(accountId: number) {
    this.dialog.open(AddEditAccountComponent, {
      width: '500px',
      data: { accountId }
    });
  }

  showPaycheck(paycheckId: number) {
    this.dialog.open(AddEditPaycheckComponent, {
      width: '500px',
      data: { paycheckId }
    });  
  }

  showTransactions(accountId: number, paycheckId: number) {
    this.dialog.open(AddEditTransactionsComponent, {
      width: '500px',
      data: { accountId, paycheckId }
    }); 
  }
}
