export interface BgtAccountLedger {
    id: number;
    accountId: number;
    paycheckId: number;
    transaction: number;
    timestamp: Date;
    description: string;
}