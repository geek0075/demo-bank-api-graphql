import { InputType, Int, GraphQLISODateTime, Float, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

@InputType()
export class CreateTransactionInput {
    @Field({
        description: 'The accountNo of the transaction.'
    })
    @IsNotEmpty()
    @IsString()
    readonly accountNo: string;
    @Field({
        description: 'The type of the transaction (deposit|withdraw).'
    })
    @IsNotEmpty()
    @IsString()
    readonly type: string;
    @Field(() => GraphQLISODateTime, {
        description: 'The date of the transaction.'
    })
    @IsNotEmpty()
    @IsString()
    readonly date: Date;
    @Field(() => Float, {
        description: 'The amount of the transaction.'
    })
    @IsNotEmpty()
    @IsNumber()
    readonly amount: number;
    @Field(() => Float, {
        description: 'The balance of the account after transaction.'
    })
    @IsNotEmpty()
    @IsNumber()
    readonly balance: number;
    
    constructor(accountNo: string, type: string, date: Date, amount: number, balance: number)     {
        this.accountNo = accountNo;
        this.type = type;
        this.date = date;
        this.amount = amount;
        this.balance = balance;
    }
}