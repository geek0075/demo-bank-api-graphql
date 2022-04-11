import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Transaction } from 'src/transactions/entities/transaction.entity';

@ObjectType({ description: 'Account model' })
export class Account {
    @Field({ 
        description: 'The mongodb ObjectId of the account.'
    })
    readonly _id: string;
    @Field({
        description: 'The accountNo of the account.'
    })
    readonly accountNo: string;
    @Field(() => Float, {
        description: 'The balance of the account.'
    })
    readonly balance: number;
    @Field(() => [Transaction], {
        nullable: true,
        description: 'The transactions of the account.'
    })
    transactions: Transaction[];
    
    constructor(_id: string, accountNo: string, balance: number, transactions: [Transaction]) {
        this._id = _id;
        this.accountNo = accountNo;
        this.balance = balance;
        this.transactions = transactions;
    }
}