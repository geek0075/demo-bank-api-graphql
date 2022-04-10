import { Document } from 'mongoose';

export interface TransactionDocument extends Document {
    readonly accountNo: string;
    readonly type: string;
    readonly date: Date;
    readonly amount: number;
    readonly balance: number;
}