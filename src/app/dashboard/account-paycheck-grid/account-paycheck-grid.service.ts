import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { BgtAccount } from "src/app/core/models/Account.model";
import { BgtAccountLedger } from "src/app/core/models/AccountLedger.model";
import { BgtPaycheck } from "src/app/core/models/paycheck.model";
import { PaycheckRepository } from "../../core/repositories/paycheck.repository";
import { AccountRepository } from "../../core/repositories/account.repository";

@Injectable()
export class AccountPaycheckGridService {

    private paychecks: BehaviorSubject<BgtPaycheck[]> = new BehaviorSubject<BgtPaycheck[]>([]);
    private accounts: BehaviorSubject<BgtAccount[]> = new BehaviorSubject<BgtAccount[]>([]);
    private ledgerEntries: BehaviorSubject<BgtAccountLedger[]> = new BehaviorSubject<BgtAccountLedger[]>([]);

    constructor(
        private paycheckRepository: PaycheckRepository,
        private accountsRepository: AccountRepository,
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

    getLedgerEntriesByPaycheck(paycheckId: number): Observable<BgtAccountLedger[]> {
        return this.ledgerEntries
            .asObservable()
            .pipe(map(ledgerEntries => ledgerEntries.filter(l => l.paycheckId === paycheckId)));
    }

    getLedgerEntriesByAccount(accountId: number): Observable<BgtAccountLedger[]> {
        return this.ledgerEntries
            .asObservable()
            .pipe(map(ledgerEntries => ledgerEntries.filter(l => l.accountId === accountId)));
    }

    getLedgerEntriesByAccountAndPaycheck(paycheckId: number, accountId: number): Observable<BgtAccountLedger[]> {
        return this.ledgerEntries
            .asObservable()
            .pipe(map(ledgerEntries => ledgerEntries.filter(l => l.paycheckId === paycheckId && l.accountId === accountId)));
    }
}
