import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

class AccountDialogData {
  accountId: number
}

@Component({
  selector: 'bgt-add-edit-account',
  templateUrl: './add-edit-account.component.html',
  styleUrls: ['./add-edit-account.component.scss']
})
export class AddEditAccountComponent implements OnInit {

  accountId: number;

  constructor(
    public dialogRef: MatDialogRef<AddEditAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AccountDialogData
  ) { }

  ngOnInit() {
    this.accountId = this.data.accountId;
  }

}
