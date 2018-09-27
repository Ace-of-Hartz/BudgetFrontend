import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/internal/operators/map";
import { BgtAccount } from "../models/Account.model";
import { Controllers, RepositoryHelper } from "./repository-helper.util";

@Injectable()
export class AccountRepository {
    constructor(private httpClient: HttpClient){}

    getAccounts(): Observable<BgtAccount[]> {
        return this.httpClient.get(RepositoryHelper.buildUrl(Controllers.accountController, '/'))
            .pipe(map(aArr => <BgtAccount[]>aArr));
    }
}