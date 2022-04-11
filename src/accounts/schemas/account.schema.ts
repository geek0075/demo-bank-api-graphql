import * as mongoose from 'mongoose';

export const AccountSchema = new mongoose.Schema({
    accountNo: { type: String, required: true, unique: true },
    balance: { type: Number, default: 0.0 }
});