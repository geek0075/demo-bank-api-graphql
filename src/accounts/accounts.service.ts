import { Model, ClientSession, Connection } from 'mongoose';
import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { TransactionsService } from 'src/transactions/transactions.service';
import { CreateAccountInput } from './dto/create-account.input';
import { UpdateAccountInput } from './dto/update-account.input';
import { AccountDocument } from './interfaces/account.interface';
import { Account } from './entities/account.entity';
import { TransactAccountInput } from './dto/transact-account.input';
import { CreateTransactionInput } from 'src/transactions/dto/create-transaction.input';

@Injectable()
export class AccountsService {
    constructor(
        private transactionsService: TransactionsService,
        @InjectModel('Account') private accountModel: Model<AccountDocument>,
        @InjectConnection() private connection: Connection
    ) {}

    async create(createAccountInput: CreateAccountInput, session: ClientSession): Promise<Account> {
        let account: Account = null;
        try {
            const createdAccount = new this.accountModel(createAccountInput);
            let accountModel = null;
            if (session) {
                accountModel = await createdAccount.save({session: session});
            } else {
                accountModel = await createdAccount.save();
            }
            if (!accountModel) {
                throw new UnprocessableEntityException();
            }
            account = accountModel['_doc'];
            console.log(`AccountsService.create: account => ${JSON.stringify(account)}`)
            return account;
        } catch (error) {
            throw error;
        }
    }
    
    async deposit(accountNo: string, transactAccountInput: TransactAccountInput) {
        const session = await this.connection.startSession();
        session.startTransaction();
        try {
            const account = await this.accountModel.findOne({ accountNo: accountNo }, null, {session: session}).exec();
            console.log(`AccountsService.deposit: account => ${JSON.stringify(account)}`)
            if (!account) {
                throw new NotFoundException();
            }
            const newBalance = account.balance + transactAccountInput.amount;
            const newAccount = await this.accountModel.findOneAndUpdate({ accountNo: accountNo }, { balance: newBalance }, {new: true, session: session}).exec();
            console.log(`AccountsService.deposit: newAccount => ${JSON.stringify(newAccount)}`)
            const createTransactionInput: CreateTransactionInput = new CreateTransactionInput(accountNo, 'deposit', new Date(), transactAccountInput.amount, newBalance);
            const transaction = await this.transactionsService.create(createTransactionInput, session);
            console.log(`AccountsService.deposit: transaction => ${JSON.stringify(transaction)}`)
            await session.commitTransaction();
            return (newAccount ? new Account(newAccount._id, newAccount.accountNo, newAccount.balance, null) : null);
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
    }
    
    async withdraw(accountNo: string, transactAccountInput: TransactAccountInput) {
        const session = await this.connection.startSession();
        session.startTransaction();
        try {
            const account = await this.accountModel.findOne({ accountNo: accountNo }, null, {session: session}).exec();
            console.log(`AccountsService.withdraw: account => ${JSON.stringify(account)}`)
            if (!account) {
                throw new NotFoundException();
            }
            const newBalance = account.balance - transactAccountInput.amount;
            const newAccount = await this.accountModel.findOneAndUpdate({ accountNo: accountNo }, { balance: newBalance }, {new: true, session: session}).exec();
            console.log(`AccountsService.withdraw: newAccount => ${JSON.stringify(newAccount)}`)
            const createTransactionInput: CreateTransactionInput = new CreateTransactionInput(accountNo, 'withdraw', new Date(), transactAccountInput.amount, newBalance);
            const transaction = await this.transactionsService.create(createTransactionInput, session);
            console.log(`AccountsService.withdraw: transaction => ${JSON.stringify(transaction)}`)
            await session.commitTransaction();
            return (newAccount ? new Account(newAccount._id, newAccount.accountNo, newAccount.balance, null) : null);
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
    }

    async findOne(accountNo: string): Promise<Account | undefined> {
        const account = await this.accountModel.findOne({ accountNo: accountNo }).exec();
        console.log(`AccountsService.findOne: account => ${JSON.stringify(account)}`)
        return (account ? new Account(account._id, account.accountNo, account.balance, null) : null);
    }
}