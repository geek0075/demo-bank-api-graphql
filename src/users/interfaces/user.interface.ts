import { Document } from 'mongoose';

export interface UserDocument extends Document {
    readonly fullName: string;
    readonly phone: string;
    readonly password: string;
}