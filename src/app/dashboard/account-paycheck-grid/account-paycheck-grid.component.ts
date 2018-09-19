import { Component, Input, OnInit } from '@angular/core';
import { BgtAccount } from 'src/app/core/models/Account.model';
import { BgtPaycheck } from 'src/app/core/models/paycheck.model';

@Component({
  selector: 'bgt-account-paycheck-grid',
  templateUrl: './account-paycheck-grid.component.html',
  styleUrls: ['./account-paycheck-grid.component.scss']
})
export class AccountPaycheckGridComponent implements OnInit {

  @Input() accounts: BgtAccount[] = [];
  @Input() paychecks: BgtPaycheck[] = [];

  constructor() { }

  ngOnInit() {
    const newAccounts: BgtAccount[] = [];
    const newPaychecks: BgtPaycheck[] = [];
    for(let i = 0; i < 10; ++i) {
      newAccounts.push(<BgtAccount>{
        id : i,
        name: `Account ${i}`
      });
      newPaychecks.push(<BgtPaycheck>{
        id: i, 
        money: Number((Math.random()*1000000).toFixed(2))
      });
    }
    this.accounts = newAccounts;
    this.paychecks = newPaychecks;
  }

}
