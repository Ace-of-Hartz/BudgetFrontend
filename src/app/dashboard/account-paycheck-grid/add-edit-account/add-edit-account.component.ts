import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';
import { BgtAccount } from 'src/app/core/models/Account.model';
import { BgtTag } from 'src/app/core/models/Tag.model';
import { NgUnsubscribe } from '../../../core/utils/ng-unsubscribe';
import { AccountPaycheckGridService } from '../account-paycheck-grid.service';
import { CommonUtils } from '../../../core/utils/common.utils';

class AccountDialogData {
  accountId: number
}

@Component({
  selector: 'bgt-add-edit-account',
  templateUrl: './add-edit-account.component.html',
  styleUrls: ['./add-edit-account.component.scss']
})
export class AddEditAccountComponent extends NgUnsubscribe implements OnInit {

  accountId: number;
  account: BgtAccount;

  tagInput: string;
  nameError: string;

  get valid(): boolean {
    return this.account.name &&
      (!this.nameError) &&
      this.account.money != null;
  }

  constructor(
    public dialogRef: MatDialogRef<AddEditAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AccountDialogData,
    private accountPaycheckGridService: AccountPaycheckGridService
  ) { super(); }

  ngOnInit() {
    this.accountId = this.data.accountId;
    if (this.accountId) {
      this.closeOnDestroy(
        this.accountPaycheckGridService.getAccount(this.accountId))
        .subscribe(a => this.account = a);
    }
    else {
      this.account = <BgtAccount>{
        name: '',
        money: null,
        description: '',
        tags: []
      };
    }
  }

  onNameChange(): void {
    if (this.account) {
      this.accountPaycheckGridService.getAccountByName(this.account.name)
        .pipe(take(1))
        .subscribe(a => {
          if (a && a.id != this.account.id) {
            this.nameError = `Account with name, ${this.account.name}, already exists`;
          }
          else { this.nameError = ''; }
        });
    }
  }

  normalizeMoney(): void {
    if (this.account) {
      this.account.money = CommonUtils.normalizeMoney(this.account.money);
    }
  }

  addTag(): void {
    if (this.tagInput) {
      this.account.tags.push(<BgtTag>{
        tag: this.tagInput
      });
      this.account.tags = CommonUtils.dedupArray(this.account.tags, 'tag');
      this.tagInput = '';
    }
  }

  removeTag(tag: BgtTag): void {
    const index = this.account.tags.indexOf(tag);
    if (index !== -1) {
      this.account.tags.splice(index, 1);
    }
  }

  save(): void {
    if (this.valid) {
      let addEditAccount: Observable<any>;
      if (!this.accountId) { addEditAccount = this.accountPaycheckGridService.saveAccount(this.account); }
      else { addEditAccount = this.accountPaycheckGridService.editAccount(this.account); }
      addEditAccount.subscribe(() => {
        this.accountPaycheckGridService.refresh();
        this.dialogRef.close();
      });
    }
  }
}
