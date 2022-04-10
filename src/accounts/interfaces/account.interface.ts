import { Document } from 'mongoose';

export interface AccountDocument extends Document {
    readonly accountNo: string;
    readonly balance: number;
}