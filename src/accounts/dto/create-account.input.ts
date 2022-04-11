import { InputType, Int, Float, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

@InputType()
export class CreateAccountInput {
    @Field({
        description: 'The accountNo of the account.'
    })
    @IsNotEmpty()
    @IsString()
    readonly accountNo: string;
    @Field(() => Float, {
        description: 'The balance of the account.'
    })
    @IsNotEmpty()
    @IsNumber()
    readonly balance: number;
    
    constructor(accountNo: string, balance: number) {
        this.accountNo = accountNo;
        this.balance = balance;
    }
}