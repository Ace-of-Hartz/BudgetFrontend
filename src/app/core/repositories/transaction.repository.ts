import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { BgtAccountLedger } from "../models/AccountLedger.model";
import { RepositoryHelper, Controllers } from "./repository-helper.util";

@Injectable()
export class TransactionRepository {
    constructor(private httpClient: HttpClient) { }

    getTransactions(accountId: number): Observable<BgtAccountLedger[]> {
        return this.httpClient.get<BgtAccountLedger[]>(
            RepositoryHelper.buildUrl(Controllers.accountController, `${accountId}/transactions`));
    }

    addTransaction(entry: BgtAccountLedger): Observable<BgtAccountLedger[]> {
        return this.httpClient.post<BgtAccountLedger[]>(
            RepositoryHelper.buildUrl(Controllers.accountController, `${entry.accountId}/transactions`),
            {
                paycheckId: entry.paycheckId,
                money: entry.transaction,
                description: entry.description,
                transactionType: 1
            });
    }

    updateTransactionAmount(entry: BgtAccountLedger): Observable<any> {
        return this.httpClient.put(
            RepositoryHelper.buildUrl(Controllers.accountController, `${entry.accountId}/transactions/${entry.id}/amount`),
            {
                paycheckId: entry.paycheckId,
                money: entry.transaction,
                description: '',
                transactionType: 1
            });
    }
}
