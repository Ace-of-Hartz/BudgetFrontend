import { OnDestroy } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { takeUntil } from "rxjs/operators";

export class NgUnsubscribe implements OnDestroy {
    protected ngUnsubscribe: Subject<any> = new Subject<any>();

    ngOnDestroy() {
        this.ngUnsubscribe.next();
    }

    closeOnDestroy<T>(observable: Observable<T>) : Observable<T> {
        return(observable.pipe(takeUntil(this.ngUnsubscribe)));
    }
}