import { Component, Input, OnInit } from '@angular/core';
import { BgtAccount } from 'src/app/core/models/Account.model';
import { BgtPaycheck } from 'src/app/core/models/paycheck.model';
import { AccountPaycheckGridService } from 'src/app/dashboard/account-paycheck-grid/account-paycheck-grid.service';
import { NgUnsubscribe } from 'src/app/core/utils/ng-unsubscribe';


class PaycheckAccountDisplay {
  alocatedMoney: number;
  alocatedPercent: number;
}

@Component({
  selector: 'bgt-account-paycheck-data',
  templateUrl: './account-paycheck-data.component.html',
  styleUrls: ['./account-paycheck-data.component.scss']
})
export class AccountPaycheckDataComponent extends NgUnsubscribe implements OnInit {

  @Input() paycheck: BgtPaycheck;
  @Input() account: BgtAccount;

  paycheckDisplay: PaycheckAccountDisplay = <PaycheckAccountDisplay>{
    alocatedMoney: 0,
    alocatedPercent: 0
  };

  constructor(private accountPaycheckGridService: AccountPaycheckGridService) { super(); }

  ngOnInit() {
   this.setAggretagedTransaction(); 
  }

  private setAggretagedTransaction() {
    this.closeOnDestroy(
      this.accountPaycheckGridService.getDepositeLedgerEntries(
        this.accountPaycheckGridService.getLedgerEntriesByAccountAndPaycheck(this.paycheck.id, this.account.id))
    ).subscribe(ledgerEntries => {
      const ledgerEntry = ledgerEntries[0];
      if (ledgerEntry) {
        ledgerEntry.transaction = ledgerEntries
          .reduce((prev, current) => prev += current.transaction, 0);
        this.paycheckDisplay = <PaycheckAccountDisplay>{
          alocatedMoney: ledgerEntry.transaction,
          alocatedPercent: (ledgerEntry.transaction / this.paycheck.money)
        };
      }
    });
  }
}
