import { Component, OnInit, Input } from '@angular/core';
import { BgtPaycheck } from 'src/app/core/models/paycheck.model';

interface PaycheckDisplay {
  id: number;
  paydate: string;
  money: string;
  unallocatedMoney: string;
}

@Component({
  selector: 'bgt-paycheck',
  templateUrl: './paycheck.component.html',
  styleUrls: ['./paycheck.component.scss']
})
export class PaycheckComponent implements OnInit {

  @Input()
  set paycheck(paycheck: BgtPaycheck) {
    this.paycheckDisplay = <PaycheckDisplay>{
      paydate: paycheck.payDate.toLocaleDateString(),
      money: (paycheck.money || 0).toFixed(2),
      unallocatedMoney: (paycheck.unallocatedMoney || 0).toFixed(2)
    };
  }

  paycheckDisplay: PaycheckDisplay;

  constructor() { }

  ngOnInit() {
  }

}
