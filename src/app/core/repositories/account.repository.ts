import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/internal/operators/map";
import { BgtAccount } from "../models/Account.model";
import { Controllers, RepositoryHelper } from "./repository-helper.util";

@Injectable()
export class AccountRepository {
    constructor(private httpClient: HttpClient) { }

    getAccounts(): Observable<BgtAccount[]> {
        return this.httpClient.get<BgtAccount[]>(
            RepositoryHelper.buildUrl(Controllers.accountController, '/'));
    }

    saveAccount(account: BgtAccount): Observable<BgtAccount> {
        return this.httpClient.post<BgtAccount>(
            RepositoryHelper.buildUrl(Controllers.accountController, '/'), account);
    }

    editAccount(account: BgtAccount):Observable<BgtAccount> {
        return this.httpClient.put<BgtAccount>(
            RepositoryHelper.buildUrl(Controllers.accountController, `/${account.id}`), account);
    }
}