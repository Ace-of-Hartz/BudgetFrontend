import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

class PaycheckDialogData {
  paycheckId: number;
}

@Component({
  selector: 'bgt-add-edit-paycheck',
  templateUrl: './add-edit-paycheck.component.html',
  styleUrls: ['./add-edit-paycheck.component.scss']
})
export class AddEditPaycheckComponent implements OnInit {

  paycheckId: number;

  constructor(
    public dialogRef: MatDialogRef<AddEditPaycheckComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PaycheckDialogData
  ) { }

  ngOnInit() {
    this.paycheckId = this.data.paycheckId;
  }

}
