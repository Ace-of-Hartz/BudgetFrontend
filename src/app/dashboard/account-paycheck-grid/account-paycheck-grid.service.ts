import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { map, switchMap, tap } from 'rxjs/operators';
import { BgtAccount } from "src/app/core/models/Account.model";
import { BgtAccountLedger, BgtAccountLedgerType } from "src/app/core/models/AccountLedger.model";
import { BgtPaycheck } from "src/app/core/models/paycheck.model";
import { AccountRepository } from "src/app/core/repositories/account.repository";
import { PaycheckRepository } from "src/app/core/repositories/paycheck.repository";
import { TransactionRepository } from "src/app/core/repositories/transaction.repository";
import { _MatTabLabelWrapperMixinBase } from "@angular/material/tabs/typings/tab-label-wrapper";

@Injectable()
export class AccountPaycheckGridService {

    private paychecks: BehaviorSubject<BgtPaycheck[]> = new BehaviorSubject<BgtPaycheck[]>([]);
    private accounts: BehaviorSubject<BgtAccount[]> = new BehaviorSubject<BgtAccount[]>([]);
    private ledgerEntries: { accountId: number, transactions: BehaviorSubject<BgtAccountLedger[]> }[] = [];

    constructor(
        private paycheckRepository: PaycheckRepository,
        private accountsRepository: AccountRepository,
        private transactionRepository: TransactionRepository,
    ) { }

    refresh(): void {
        this.paycheckRepository.getPaychecks().subscribe(p => this.paychecks.next(p));
        this.accountsRepository.getAccounts()
            .pipe(tap(aArr => {
                for (const a of aArr) {
                    let leMap = this.ledgerEntries.find(le => le.accountId === a.id);
                    if (!leMap) {
                        leMap = { accountId: a.id, transactions: new BehaviorSubject<BgtAccountLedger[]>([]) };
                        this.ledgerEntries.push(leMap);
                    }
                    this.transactionRepository.getTransactions(a.id)
                        .subscribe(transactions => leMap.transactions.next(transactions));
                }
            }))
            .subscribe(a => this.accounts.next(a));

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

    deleteAccount(accountId: number) {
        return this.accountsRepository.deleteAccount(accountId);
    }

    // ===== ===== ===== ===== =====

    getLedgerEntriesByAccount(accountId: number): Observable<BgtAccountLedger[]> {
        const transactionsMap = this.ledgerEntries
            .find(leMap => leMap.accountId === accountId);
        return transactionsMap ? transactionsMap.transactions.asObservable() : of([]);
    }

    getLedgerEntriesByAccountAndPaycheck(paycheckId: number, accountId: number): Observable<BgtAccountLedger[]> {
        const transactionsMap = this.ledgerEntries
            .find(leMap => leMap.accountId === accountId);
        return transactionsMap ?
            (transactionsMap.transactions.pipe(map(tArr =>
                (tArr || []).filter(l => l.paycheckId === paycheckId)))) :
            of([]);
    }

    getWidthdrawLedgerEntriesAsync(ledgerEntries: Observable<BgtAccountLedger[]>): Observable<BgtAccountLedger[]> {
        return ledgerEntries.pipe(map(leArr =>
            leArr
                .filter(le => le.transaction < 0)
                .map(le => { // array map
                    le = { ...le };
                    le.transaction = le.transaction *= -1;
                    return le;
                })));

    }

    getDepositeLedgerEntriesAsync(ledgerEntries: Observable<BgtAccountLedger[]>): Observable<BgtAccountLedger[]> {
        return ledgerEntries.pipe(map(leArr =>
            leArr.filter(le => le.transaction > 0)
                .map(le => { // array map
                    le = { ...le };
                    return le;
                })));
    }

    // ===== ===== ===== ===== =====

    createDeposite(entry: BgtAccountLedger): Observable<BgtAccountLedger[]> {
        return this.transactionRepository.addTransaction(entry, BgtAccountLedgerType.deposite);
    }

    updateDeposite(entry: BgtAccountLedger): Observable<void> {
        return this.transactionRepository.updateTransactionAmount(entry, BgtAccountLedgerType.deposite);
    }

    createWithdraw(entry: BgtAccountLedger): Observable<BgtAccountLedger[]> {
        return this.transactionRepository.addTransaction(entry, BgtAccountLedgerType.withdraw);
    }

    updateWithdraw(entry: BgtAccountLedger): Observable<void> {
        return this.transactionRepository.updateTransactionAmount(entry, BgtAccountLedgerType.withdraw);
    }

    deleteTransaction(entry: BgtAccountLedger): Observable<void> {
        return this.transactionRepository.deleteTransaction(entry);
    }
}
