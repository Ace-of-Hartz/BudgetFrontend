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
      this.accountPaycheckGridService.getWidthdrawLedgerEntriesAsync(
        this.accountPaycheckGridService.getLedgerEntriesByAccountAndPaycheck(this.paycheckId, this.accountId)))
      .subscribe(leArr => this.transactions = leArr);
  }

  updateDeposite(): void {
    if (this.deposite) {
      this.deposite.transaction = CommonUtils.normalizeMoney(this.deposite.transaction);
      let addUpdate;
      if (this.deposite.id > 0) {
        addUpdate = this.accountPaycheckGridService.updateDeposite(this.deposite);
      }
      else {
        addUpdate = this.accountPaycheckGridService.createDeposite(this.deposite);
      }
      addUpdate.subscribe(() => this.accountPaycheckGridService.refresh());
    }
  }

  addWithdraw(): void {
    this.transactions.splice(0, 0, <BgtAccountLedger>{
      accountId: this.accountId,
      paycheckId: this.paycheckId,
      transaction: 0
    });
  }

  updateWithdraw(withdraw: BgtAccountLedger): void {
    CommonUtils.normalizeMoney(withdraw.transaction);
    let addUpdate;
    if (withdraw.id > 0) {
      addUpdate = this.accountPaycheckGridService.updateWithdraw(withdraw);
    }
    else {
      addUpdate = this.accountPaycheckGridService.createWithdraw(withdraw);
    }
    addUpdate.subscribe(() => this.accountPaycheckGridService.refresh());
  }

  deleteWithdraw(withdraw: BgtAccountLedger) {
    this.accountPaycheckGridService.deleteTransaction(withdraw)
      .subscribe(() => {
        this.accountPaycheckGridService.refresh();
        const index = this.transactions.indexOf(withdraw);
        if (index >= 0) {
          this.transactions.splice(index, 1);
          this.transactions = this.transactions.map(t => t);
        }
      });
  }

  private setAggretagedTransaction() {
    this.closeOnDestroy(
      this.accountPaycheckGridService.getDepositeLedgerEntriesAsync(
        this.accountPaycheckGridService.getLedgerEntriesByAccountAndPaycheck(this.paycheckId, this.accountId)))
      .subscribe(ledgerEntries => {
        let ledgerEntry = ledgerEntries[0];
        if (ledgerEntry) {
          ledgerEntry.transaction = ledgerEntries
            .reduce((prev, current) => prev += current.transaction, 0);
          this.deposite = ledgerEntry;
        }
        else {
          this.deposite = ledgerEntry = <BgtAccountLedger>{
            accountId: this.accountId,
            paycheckId: this.paycheckId,
          }
        }
      });
  }
}
