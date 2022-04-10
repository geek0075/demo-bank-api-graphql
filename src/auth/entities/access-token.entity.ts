import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType({ description: 'AccessToken model' })
export class AccessToken {
    @Field({ 
        description: 'The jwt access token.'
    })
    readonly access_token: string;
    
    constructor(access_token: string) {
        this.access_token = access_token;
    }
}