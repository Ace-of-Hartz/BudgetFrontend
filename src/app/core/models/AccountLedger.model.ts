export enum BgtAccountLedgerType {
    deposite = 1,
    withdraw = 2,
}

export interface BgtAccountLedger {
    id: number;
    accountId: number;
    paycheckId: number;
    transaction: number;
    timestamp: Date;
    description: string;
}