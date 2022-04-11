import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Account } from 'src/accounts/entities/account.entity';

@ObjectType({ description: 'User model' })
export class User {
    @Field({ 
        description: 'The mongodb ObjectId of the user.'
    })
    readonly _id: string;
    @Field({
        description: 'The full name of the user.'
    })
    readonly fullName: string;
    @Field({
        description: 'The phone number of the user.'
    })
    readonly phone: string;
    @Field({
        description: 'The password of the user.'
    })
    password: string;
    @Field(() => Account, {
        nullable: true,
        description: 'The account of the user.'
    })
    account: Account;
    
    constructor(_id: string, fullName: string, phone: string, password: string, account: Account) {
        this._id = _id;
        this.fullName = fullName;
        this.phone = phone;
        this.password = password;
        this.account = account;
    }
}