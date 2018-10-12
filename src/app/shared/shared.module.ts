import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BgtConfirmationDialogComponent } from './bgt-confirmation-dialog/bgt-confirmation-dialog.component';
import { MatDialogModule, MatButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
  ],
  entryComponents: [
    BgtConfirmationDialogComponent,
  ],
  declarations: [BgtConfirmationDialogComponent],
  exports: [BgtConfirmationDialogComponent]
})
export class SharedModule { }
