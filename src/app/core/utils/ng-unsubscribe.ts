import { OnDestroy } from "@angular/core";
import { Subject } from "rxjs";

export class NgUnsubscribe implements OnDestroy {
    protected ngUnsubscribe: Subject<any> = new Subject<any>();

    ngOnDestroy() {
        this.ngUnsubscribe.next();
    }
}