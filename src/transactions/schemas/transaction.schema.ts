import * as mongoose from 'mongoose';

export const TransactionSchema = new mongoose.Schema({
    accountNo: { type: String, required: true },
    type: { type: String, required: true },
    date: { type: Date, default: Date.now },
    amount: { type: Number, default: 0.0 },
    balance: { type: Number, default: 0.0 }
});