import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';
import { BgtAccount } from 'src/app/core/models/Account.model';
import { BgtTag } from 'src/app/core/models/Tag.model';
import { NgUnsubscribe } from 'src/app/core/ng-unsubscribe';
import { AccountPaycheckGridService } from '../account-paycheck-grid.service';

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

  private accounts: Observable<BgtAccount[]>;
  private nameError: string;

  constructor(
    public dialogRef: MatDialogRef<AddEditAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AccountDialogData,
    private accountPaycheckGridService: AccountPaycheckGridService
  ) { super(); }

  ngOnInit() {
    this.accounts = this.accountPaycheckGridService.getAccounts().pipe(takeUntil(this.ngUnsubscribe));
    this.accountId = this.data.accountId;
    if (this.accountId) {
      this.accounts.pipe(map(aArr => aArr.find(a => a.id === this.accountId)))
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
      this.accounts.pipe(take(1)).subscribe(aArr => {
        const existingName = aArr.find(a => a.name === this.account.name);
        if(existingName && existingName.id != this.account.id) {
          this.nameError = `Account with name, ${this.account.name}, already exists`;
        }
        else { this.nameError = ''; }
      });
    }
  }

  normalizeMoney(): void {
    if (this.account) {
      this.account.money = Number(this.account.money.toFixed(2));
    }
  }

  addTag(): void {
    if (this.tagInput) {
      this.account.tags.push(<BgtTag>{
        tag: this.tagInput
      });
      this.account.tags = this.dedupArray(this.account.tags, 'tag');
      this.tagInput = '';
    }
  }

  removeTag(tag: BgtTag): void {
    const index = this.account.tags.indexOf(tag);
    if (index !== -1) {
      this.account.tags.splice(index, 1);
    }
  }

  private dedupArray<T>(arr: T[], property?: string): T[] {
    const retArr = [];
    for (const item of arr) {
      const index = property ? retArr.findIndex(e => e[property] === item[property]) : retArr.indexOf(item);
      if (index === -1) {
        retArr.push(item);
      }
    }
    return retArr;
  }
}
