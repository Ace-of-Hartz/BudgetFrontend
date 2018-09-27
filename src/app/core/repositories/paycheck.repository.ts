import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/internal/operators/map";
import { BgtPaycheck } from "../models/paycheck.model";
import { Controllers, RepositoryHelper } from "./repository-helper.util";

@Injectable()
export class PaycheckRepository {

    constructor(private httpClient: HttpClient) {}

    public getPaychecks(): Observable<BgtPaycheck[]> {
        return this.httpClient.get(RepositoryHelper.buildUrl(Controllers.paycheckController, '/'))
            .pipe(map(p => <BgtPaycheck[]>p));
    }
}
