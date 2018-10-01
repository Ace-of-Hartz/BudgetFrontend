import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BgtAccount } from 'src/app/core/models/Account.model';
import { BgtAccountLedger } from 'src/app/core/models/AccountLedger.model';
import { NgUnsubscribe } from 'src/app/core/utils/ng-unsubscribe';
import { AccountPaycheckGridService } from '../account-paycheck-grid.service';
import { BgtPaycheck } from '../../../core/models/paycheck.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonUtils } from 'src/app/core/utils/common.utils';

class TransactionsDialogData {
  accountId: number;
  paycheckId: number;
}

@Component({
  selector: 'bgt-add-edit-transactions',
  templateUrl: './add-edit-transactions.component.html',
  styleUrls: ['./add-edit-transactions.component.scss']
})
export class AddEditTransactionsComponent extends NgUnsubscribe implements OnInit {

  accountId: number;
  paycheckId: number;

  accountName: Observable<string>;
  paycheckDate: Observable<Date>;

  deposite: BgtAccountLedger = <any>{};
  transactions: BgtAccountLedger[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddEditTransactionsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TransactionsDialogData,
    private accountPaycheckGridService: AccountPaycheckGridService
  ) { super(); }

  ngOnInit() {
    this.accountId = this.data.accountId;
    this.paycheckId = this.data.paycheckId;

    this.paycheckDate = this.accountPaycheckGridService.getPaycheck(this.paycheckId)
      .pipe(map(p => new Date(p.payDate)));

    this.accountName = this.accountPaycheckGridService.getAccount(this.accountId)
      .pipe(map(a => a.name));

    this.setAggretagedTransaction();
    this.closeOnDestroy(
      this.accountPaycheckGridService.getWidthdrawLedgerEntries(
        this.accountPaycheckGridService.getLedgerEntriesByAccountAndPaycheck(this.paycheckId, this.accountId)))
      .subscribe(leArr => this.transactions = leArr);
  }

  normalizeMoney(): void {
    if (this.deposite) { this.deposite.transaction = CommonUtils.normalizeMoney(this.deposite.transaction); }
    if(this.transactions) {
      for(const ledgerEntry of this.transactions) {
        ledgerEntry.transaction = CommonUtils.normalizeMoney(ledgerEntry.transaction);
      }
    }
  }

  addTransaction(): void {
    this.transactions.push(<BgtAccountLedger>{
      accountId: this.accountId,
      paycheckId: this.paycheckId,
      transaction: 0,
    });
  }

  deleteTransaction(transaction: BgtAccountLedger) {
    const transactionIndex = this.transactions.indexOf(transaction);
    this.transactions.splice(transactionIndex, 1);
  }

private setAggretagedTransaction() {
  this.closeOnDestroy(
    this.accountPaycheckGridService.getDepositeLedgerEntries(
      this.accountPaycheckGridService.getLedgerEntriesByAccountAndPaycheck(this.paycheckId, this.accountId))
  ).subscribe(ledgerEntries => {
    const ledgerEntry = ledgerEntries[0];
    if (ledgerEntry) {
      ledgerEntry.transaction = ledgerEntries
        .reduce((prev, current) => prev += current.transaction, 0);
      this.deposite = ledgerEntry;
    }
  });
}
}
