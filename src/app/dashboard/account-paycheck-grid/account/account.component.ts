import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BgtAccount } from '../../../core/models/Account.model';

@Component({
  selector: 'bgt-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {

  @Input() account : BgtAccount;
  @Output() onClick: EventEmitter<number> = new EventEmitter<number>();

  click(): void {
    this.onClick.emit(this.account.id);
  }
}
