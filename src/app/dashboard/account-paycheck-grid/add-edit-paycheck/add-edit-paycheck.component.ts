import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { BgtPaycheck } from 'src/app/core/models/paycheck.model';
import { CommonUtils } from 'src/app/core/utils/common.utils';
import { NgUnsubscribe } from 'src/app/core/utils/ng-unsubscribe';
import { AccountPaycheckGridService } from '../account-paycheck-grid.service';
import { Observable } from 'rxjs/internal/Observable';

class BgtPaycheckDate implements BgtPaycheck {
  id: number;
  money: number;
  unallocatedMoney: number;
  payDate: number;
  payDateDate: Date;

  constructor(paycheck: BgtPaycheck) {
    this.id = paycheck.id;
    this.money = paycheck.money;
    this.unallocatedMoney = paycheck.unallocatedMoney;
    this.payDate = paycheck.payDate;
    this.payDateDate = new Date(this.payDate);
  }
}

class PaycheckDialogData {
  paycheckId: number;
}

@Component({
  selector: 'bgt-add-edit-paycheck',
  templateUrl: './add-edit-paycheck.component.html',
  styleUrls: ['./add-edit-paycheck.component.scss']
})
export class AddEditPaycheckComponent extends NgUnsubscribe implements OnInit {

  paycheckId: number;
  paycheck: BgtPaycheckDate;

  get valid(): boolean {
    return this.paycheck.payDate &&
      this.paycheck.money != null &&
      this.paycheck.unallocatedMoney != null;
  }

  constructor(
    public dialogRef: MatDialogRef<AddEditPaycheckComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PaycheckDialogData,
    private accountPaycheckGridService: AccountPaycheckGridService
  ) { super(); }

  ngOnInit() {
    this.paycheckId = this.data.paycheckId;
    if (this.paycheckId) {
      this.closeOnDestroy(this.accountPaycheckGridService.getPaycheck(this.paycheckId))
        .subscribe(p => this.paycheck = new BgtPaycheckDate(p));
    }
    else {
      const date = new Date();
      this.paycheck = <BgtPaycheckDate>{
        payDate: date.getTime(),
        payDateDate: date,
        money: null,
        unallocatedMoney: 0,
      };
    }
  }

  normalizeMoney(): void {
    if (this.paycheck) {
      this.paycheck.money = CommonUtils.normalizeMoney(this.paycheck.money);
      this.paycheck.unallocatedMoney = CommonUtils.normalizeMoney(this.paycheck.unallocatedMoney);
    }
  }

  dateChange(): void {
    if (this.paycheck) {
      this.paycheck.payDate = this.paycheck.payDateDate.getTime();
    }
  }

  save(): void {
    if (this.valid) {
      let paycheckAddEdit: Observable<any>;
      if (!this.paycheckId) { paycheckAddEdit = this.accountPaycheckGridService.savePaycheck(this.paycheck); }
      else { paycheckAddEdit = this.accountPaycheckGridService.editPaycheck(this.paycheck); }
      paycheckAddEdit.subscribe(() => {
        this.accountPaycheckGridService.refresh();
        this.dialogRef.close();
      });
    }
  }
}
