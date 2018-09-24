import { Component, Input, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { BgtAccount } from 'src/app/core/models/Account.model';
import { BgtPaycheck } from 'src/app/core/models/paycheck.model';
import { AccountPaycheckGridService } from './account-paycheck-grid.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'bgt-account-paycheck-grid',
  templateUrl: './account-paycheck-grid.component.html',
  styleUrls: ['./account-paycheck-grid.component.scss']
})
export class AccountPaycheckGridComponent implements OnInit {

  @ViewChild('table') table: ElementRef;

  accounts: Observable<BgtAccount[]>;
  paychecks: Observable<BgtPaycheck[]>;

  constructor(private accountPaycheckGridService: AccountPaycheckGridService) { }

  ngOnInit() {
    this.accounts = this.accountPaycheckGridService.getAccounts();
    this.paychecks = this.accountPaycheckGridService.getPaychecks();
  }
}
