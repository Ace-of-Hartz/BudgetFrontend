import { Component, EventEmitter, Input, Output } from '@angular/core';
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
export class PaycheckComponent {

  @Output() onClick: EventEmitter<number> = new EventEmitter<number>();

  @Input()
  set paycheck(paycheck: BgtPaycheck) {
    this.innerPaycheck = paycheck;
    if (paycheck) {
      this.paycheckDisplay = <PaycheckDisplay>{
        paydate: new Date(paycheck.payDate).toLocaleDateString(),
        money: (paycheck.money || 0).toFixed(2),
        unallocatedMoney: (paycheck.unallocatedMoney || 0).toFixed(2)
      };
    }
    else{
      this.paycheckDisplay = null;
    }
  }

  innerPaycheck: BgtPaycheck;
  paycheckDisplay: PaycheckDisplay;

  click(): void {
    this.onClick.emit(this.innerPaycheck.id);
  }
}
