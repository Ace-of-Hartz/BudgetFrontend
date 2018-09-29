import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BgtPaycheck } from "../models/paycheck.model";
import { Controllers, RepositoryHelper } from "./repository-helper.util";

@Injectable()
export class PaycheckRepository {

    constructor(private httpClient: HttpClient) { }

    public getPaychecks(): Observable<BgtPaycheck[]> {
        return this.httpClient.get<BgtPaycheck[]>(
            RepositoryHelper.buildUrl(Controllers.paycheckController, '/'));
    }

    public savePaycheck(paycheck: BgtPaycheck): Observable<BgtPaycheck> {
        return this.httpClient.post<BgtPaycheck>(
            RepositoryHelper.buildUrl(Controllers.paycheckController, '/'), paycheck);
    }

    public editPaycheck(paycheck: BgtPaycheck): Observable<BgtPaycheck> {
        return this.httpClient.put<BgtPaycheck>(
            RepositoryHelper.buildUrl(Controllers.paycheckController, `/${paycheck.id}`), paycheck);
    }
}
