import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BgtAccountLedger, BgtAccountLedgerType } from "../models/AccountLedger.model";
import { Controllers, RepositoryHelper } from "./repository-helper.util";

@Injectable()
export class TransactionRepository {
    constructor(private httpClient: HttpClient) { }

    getTransactions(accountId: number): Observable<BgtAccountLedger[]> {
        return this.httpClient.get<BgtAccountLedger[]>(
            RepositoryHelper.buildUrl(Controllers.accountController, `${accountId}/transactions`));
    }

    addTransaction(entry: BgtAccountLedger, type: BgtAccountLedgerType): Observable<BgtAccountLedger[]> {
        return this.httpClient.post<BgtAccountLedger[]>(
            RepositoryHelper.buildUrl(Controllers.accountController, `${entry.accountId}/transactions`),
            {
                paycheckId: entry.paycheckId,
                money: entry.transaction,
                description: entry.description || '',
                transactionType: type
            });
    }

    updateTransactionAmount(entry: BgtAccountLedger, type: BgtAccountLedgerType): Observable<void> {
        return this.httpClient.put<void>(
            RepositoryHelper.buildUrl(Controllers.accountController, `${entry.accountId}/transactions/${entry.id}/amount`),
            {
                paycheckId: entry.paycheckId,
                money: entry.transaction,
                description: entry.description || '',
                transactionType: type
            });
    }

    deleteTransaction(entry: BgtAccountLedger): Observable<void> {
        return this.httpClient.delete<void>(
            RepositoryHelper.buildUrl(Controllers.accountController, `${entry.accountId}/transactions/${entry.id}`));
    }
}
