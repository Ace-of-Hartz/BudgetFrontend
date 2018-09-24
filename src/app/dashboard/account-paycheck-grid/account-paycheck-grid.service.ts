import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { BgtAccount } from "src/app/core/models/Account.model";
import { BgtAccountLedger } from "src/app/core/models/AccountLedger.model";
import { BgtPaycheck } from "src/app/core/models/paycheck.model";

@Injectable()
export class AccountPaycheckGridService {

    private paychecks: BehaviorSubject<BgtPaycheck[]> = new BehaviorSubject<BgtPaycheck[]>([]);
    private accounts: BehaviorSubject<BgtAccount[]> = new BehaviorSubject<BgtAccount[]>([]);
    private ledgerEntries: BehaviorSubject<BgtAccountLedger[]> = new BehaviorSubject<BgtAccountLedger[]>([]);

    constructor() {
        const paychecks: BgtPaycheck[] = [];
        const accounts: BgtAccount[] = [];
        const ledgerEntries: BgtAccountLedger[] = [];

        for (let i = 0; i < 10; ++i) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            paychecks.push(<BgtPaycheck>{
                id: i,
                payDate: date,
                money: (Math.random() * 10000),
                unallocatedMoney: (Math.random() * 100)
            });
        }
        for (let i = 0; i < 20; ++i) {
            accounts.push(<BgtAccount>{
                id: i,
                money: (Math.random() * 100000),
                name: `Account ${i}`
            });
        }
        for (let i = 0; i < 20; ++i) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            for (let j = 0; j < 10; ++j) {
                ledgerEntries.push(<BgtAccountLedger>{
                    id: (10 * i) + j + 1,
                    accountId: i,
                    paycheckId: j,
                    timestamp: date,
                    transaction: Math.random() * 1000
                });
            }
        }

        this.paychecks.next(paychecks);
        this.accounts.next(accounts);
        this.ledgerEntries.next(ledgerEntries);
    }

    getPaychecks(): Observable<BgtPaycheck[]> {
        return this.paychecks.asObservable();
    }

    getAccounts(): Observable<BgtAccount[]> {
        return this.accounts.asObservable();
    }

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
