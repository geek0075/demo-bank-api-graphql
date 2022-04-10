import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
    @Field({
        description: 'The full name of the user.'
    })
    @IsNotEmpty()
    @IsString()
    readonly fullName: string;
    @Field({
        description: 'The phone number of the user.'
    })
    @IsNotEmpty()
    @IsString()
    readonly phone: string;
    @Field({
        description: 'The password of the user.'
    })
    @IsNotEmpty()
    @IsString()
    readonly password: string;
}