import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    fullName: { type: String },
    phone: { type: String, required: true, unique: true },
    password: { type: String },
});