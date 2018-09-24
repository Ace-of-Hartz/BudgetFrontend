import { Component, OnInit, Input } from '@angular/core';
import { BgtAccount } from '../../../core/models/Account.model';

@Component({
  selector: 'bgt-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  @Input() account : BgtAccount;

  constructor() { }

  ngOnInit() {
  }

}
