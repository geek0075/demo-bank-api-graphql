import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class LoginUserInput {
    @Field({
        description: 'The phone number of the user.'
    })
    @IsNotEmpty()
    @IsString()
    readonly phone: string;
    @Field({
        nullable: true,
        description: 'The password of the user.'
    })
    @IsString()
    readonly password: string;
}