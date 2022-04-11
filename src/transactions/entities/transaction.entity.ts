import { ObjectType, Field, Int, Float, GraphQLISODateTime } from '@nestjs/graphql';

@ObjectType({ description: 'Transaction model' })
export class Transaction {
    @Field({ 
        description: 'The mongodb ObjectId of the transaction.'
    })
    readonly _id: string;
    @Field({
        description: 'The accountNo of the transaction.'
    })
    readonly accountNo: string;
    @Field({
        description: 'The type of the transaction.'
    })
    readonly type: string;
    @Field(() => GraphQLISODateTime, {
        description: 'The date of the transaction.'
    })
    readonly date: Date;
    @Field(() => Float, {
        description: 'The amount of the transaction.'
    })
    readonly amount: number;
    @Field(() => Float, {
        description: 'The balance of the account after transaction.'
    })
    readonly balance: number;
}