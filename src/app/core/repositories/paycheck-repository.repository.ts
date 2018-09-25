import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { BgtPaycheck } from "../models/paycheck.model";
import { map } from "rxjs/internal/operators/map";

@Injectable()
export class PaycheckRepository {

    public paycheckController: string = "/api/paychecks/"

    constructor(private httpClient: HttpClient) {}

    public getPaychecks(): Observable<BgtPaycheck[]> {
        return this.httpClient.get(this.buildUrl('/'))
            .pipe(map(p => <BgtPaycheck[]>p));
    }

    private buildUrl(action: string, queryParams: {key: string, value: string}[] = []): string {
        const controllerAction = this.paycheckController
            .concat(action)
            .split('/')
            .filter(s => s)
            .join('/');
        const queryStrings: string[] = [];
        for(const queryParam of queryParams) {
            queryStrings.push(`${queryParam.key}=${queryParam.value}`);
        }
        return controllerAction.concat(queryStrings.join('&'));
    }
}
