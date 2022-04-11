import { Model, Connection } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { AccountsService } from 'src/accounts/accounts.service';
import { CreateUserInput } from './dto/create-user.input';
import { UserDocument } from './interfaces/user.interface';
import { User } from './entities/user.entity';
import { CreateAccountInput } from 'src/accounts/dto/create-account.input';
import { Account } from 'src/accounts/entities/account.entity';

@Injectable()
export class UsersService {
    constructor(
        private accountsService: AccountsService,
        @InjectModel('User') private userModel: Model<UserDocument>,
        @InjectConnection() private connection: Connection
    ) {}

    async create(createUserInput: CreateUserInput): Promise<User> {
        const session = await this.connection.startSession();
        session.startTransaction();
        try {
            const createdUser = new this.userModel(createUserInput);
            const userModel = await createdUser.save({session: session});
            const user: User = userModel['_doc'];
            console.log(`UsersService.create: user => ${JSON.stringify(user)}`);
            const createAccountInput: CreateAccountInput = new CreateAccountInput(user.phone, 0.0);
            const account: Account = await this.accountsService.create(createAccountInput, session);
            user.account = account;
            console.log(`UsersService.create: user => ${JSON.stringify(user)}`);
            await session.commitTransaction();
            return user;
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
    }
    
    async findOne(phone: string): Promise<User | undefined> {
        const user = await this.userModel.findOne({ phone: phone }).exec();
        console.log(`UsersService.findOne: user => ${JSON.stringify(user)}`)
        return (user ? new User(user._id, user.fullName, user.phone, user.password, null) : null);
    }
}