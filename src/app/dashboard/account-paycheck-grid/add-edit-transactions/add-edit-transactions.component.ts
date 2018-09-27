import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

class TransactionsDialogData {
  accountId: number;
  paycheckId: number;
}

@Component({
  selector: 'bgt-add-edit-transactions',
  templateUrl: './add-edit-transactions.component.html',
  styleUrls: ['./add-edit-transactions.component.scss']
})
export class AddEditTransactionsComponent implements OnInit {

  accountId: number;
  paycheckId: number;

  constructor(
    public dialogRef: MatDialogRef<AddEditTransactionsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TransactionsDialogData
  ) { }

  ngOnInit() {
    this.accountId = this.data.accountId;
    this.paycheckId = this.data.paycheckId;
  }

}
