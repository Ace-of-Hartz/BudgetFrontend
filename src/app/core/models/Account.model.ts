import { BgtTag } from "./Tag.model";
import { BgtAccountLedger } from "./AccountLedger.model";

export interface BgtAccount {
    id: number;
    name: string;
    money: number;
    description: string;

    tags: BgtTag[];
    ledgerEntries: BgtAccountLedger[];
}