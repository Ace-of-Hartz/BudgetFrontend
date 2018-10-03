import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { map, switchMap, tap } from 'rxjs/operators';
import { BgtAccount } from "src/app/core/models/Account.model";
import { BgtAccountLedger } from "src/app/core/models/AccountLedger.model";
import { BgtPaycheck } from "src/app/core/models/paycheck.model";
import { AccountRepository } from "src/app/core/repositories/account.repository";
import { PaycheckRepository } from "src/app/core/repositories/paycheck.repository";
import { TransactionRepository } from "src/app/core/repositories/transaction.repository";
import { _MatTabLabelWrapperMixinBase } from "@angular/material/tabs/typings/tab-label-wrapper";

@Injectable()
export class AccountPaycheckGridService {

    private paychecks: BehaviorSubject<BgtPaycheck[]> = new BehaviorSubject<BgtPaycheck[]>([]);
    private accounts: BehaviorSubject<BgtAccount[]> = new BehaviorSubject<BgtAccount[]>([]);
    private ledgerEntries: { accountId: number, transactions: BgtAccountLedger[] }[] = [];

    constructor(
        private paycheckRepository: PaycheckRepository,
        private accountsRepository: AccountRepository,
        private transactionRepository: TransactionRepository,
    ) {
        this.refresh();
    }

    refresh(): void {
        this.accountsRepository.getAccounts().subscribe(a => this.accounts.next(a));
        this.paycheckRepository.getPaychecks().subscribe(p => this.paychecks.next(p));
    }

    // ===== ===== ===== ===== =====

    getPaychecks(): Observable<BgtPaycheck[]> {
        return this.paychecks.asObservable();
    }

    getPaycheck(paycheckId: number): Observable<BgtPaycheck> {
        return this.paychecks.pipe(map(pArr => pArr.find(p => p.id === paycheckId)));
    }

    savePaycheck(paycheck: BgtPaycheck): Observable<BgtPaycheck> {
        return this.paycheckRepository.savePaycheck(paycheck);
    }

    editPaycheck(paycheck: BgtPaycheck): Observable<BgtPaycheck> {
        return this.paycheckRepository.editPaycheck(paycheck);
    }

    // ===== ===== ===== ===== =====

    getAccounts(): Observable<BgtAccount[]> {
        return this.accounts.asObservable();
    }

    getAccount(accountId: number): Observable<BgtAccount> {
        return this.accounts.pipe(map(aArr => aArr.find(a => a.id === accountId)));
    }

    getAccountByName(name: string, ignoreCase: boolean = true): Observable<BgtAccount> {
        const compareName: string = ignoreCase ? (name || '').toLowerCase() : name;
        return this.accounts
            .pipe(map(aArr => aArr.find(a => (ignoreCase ? (a.name || '').toLowerCase() : a.name) === compareName)));
    }

    saveAccount(account: BgtAccount) {
        return this.accountsRepository.saveAccount(account);
    }

    editAccount(account: BgtAccount) {
        return this.accountsRepository.editAccount(account);
    }

    // ===== ===== ===== ===== =====

    getLedgerEntriesByAccount(accountId: number): Observable<BgtAccountLedger[]> {
        const transactionsMap = this.ledgerEntries
            .find(leMap => leMap.accountId === accountId);
        if (transactionsMap) {
            return of(transactionsMap.transactions);
        }
        else {
            return this.transactionRepository.getTransactions(accountId)
                .pipe(tap(leArr => this.ledgerEntries.push({ accountId, transactions: leArr })));
        }
    }

    getLedgerEntriesByAccountAndPaycheck(paycheckId: number, accountId: number): Observable<BgtAccountLedger[]> {
        const transactionsMap = this.ledgerEntries
            .find(leMap => leMap.accountId === accountId);
        let transactions: Observable<BgtAccountLedger[]>;
        if (transactionsMap) {
            transactions = of(transactionsMap.transactions);
        }
        else {
            transactions = this.transactionRepository.getTransactions(accountId)
                .pipe(tap(leArr => {
                    if (!this.ledgerEntries.find(le => le.accountId === accountId)) {
                        this.ledgerEntries.push({ accountId, transactions: leArr })
                    }
                }));
        }
        return transactions
            .pipe(map(ledgerEntries => ledgerEntries.filter(l => l.paycheckId === paycheckId)));
    }

    getWidthdrawLedgerEntries(ledgerEntries: Observable<BgtAccountLedger[]>): Observable<BgtAccountLedger[]> {
        return ledgerEntries
            .pipe(map(leArr => leArr.filter(le => le.transaction < 0)));
    }

    getDepositeLedgerEntries(ledgerEntries: Observable<BgtAccountLedger[]>): Observable<BgtAccountLedger[]> {
        return ledgerEntries
            .pipe(map(leArr => leArr.filter(le => le.transaction > 0)));
    }

    // ===== ===== ===== ===== =====

    createDeposite(entry: BgtAccountLedger): Observable<BgtAccountLedger[]> {
        return this.transactionRepository.addTransaction(entry);
    }

    updateDeposite(entry: BgtAccountLedger): Observable<any> {
        return this.transactionRepository.updateTransactionAmount(entry);
    }
}
