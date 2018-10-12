import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';
import { NgUnsubscribe } from 'src/app/core/utils/ng-unsubscribe';
import { takeUntil } from 'rxjs/operators';

class ConfirmationDialogData {
  title: string;
  message: string;
  accept: string;
  deny: string;
}

@Component({
  selector: 'bgt-bgt-confirmation-dialog',
  templateUrl: './bgt-confirmation-dialog.component.html',
  styleUrls: ['./bgt-confirmation-dialog.component.scss']
})
export class BgtConfirmationDialogComponent extends NgUnsubscribe implements OnInit {

  title: string = "Confirmation";
  message: string = "Are you sure?";
  accept: string = "Yes";
  deny: string = "No";

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogData | Observable<ConfirmationDialogData>>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogData | Observable<ConfirmationDialogData>,
  ) { super(); }

  ngOnInit() {
    if (this.data instanceof Observable) {
      this.data.pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(data => this.mapToData(data));
    }
    else {
      this.mapToData(this.data);
    }
  }

  private mapToData(data: ConfirmationDialogData): void {
    this.title = data.title === undefined ? this.title : data.title;
    this.message = data.message === undefined ? this.message : data.message;
    this.accept = data.accept === undefined ? this.accept : data.accept;
    this.deny = data.deny === undefined ? this.deny : data.deny;
  }
}
