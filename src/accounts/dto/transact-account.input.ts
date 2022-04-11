import { InputType, Int, Float, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

@InputType()
export class TransactAccountInput {
    @Field(() => Float, {
        description: 'The amount of the transaction.'
    })
    @IsNotEmpty()
    @IsNumber()
    readonly amount: number;
}