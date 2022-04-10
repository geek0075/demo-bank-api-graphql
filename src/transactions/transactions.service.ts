import { Model, ClientSession } from 'mongoose';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTransactionInput } from './dto/create-transaction.input';
import { UpdateTransactionInput } from './dto/update-transaction.input';
import { TransactionDocument } from './interfaces/transaction.interface';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionsService {
    constructor(@InjectModel('Transaction') private transactionModel: Model<TransactionDocument>) {}

    async create(createTransactionInput: CreateTransactionInput, session: ClientSession): Promise<Transaction> {
        let transaction: Transaction = null;
        try {
            const createdTransaction = new this.transactionModel(createTransactionInput);
            let transactionModel = null;
            if (session) {
                transactionModel = await createdTransaction.save({session: session});
            } else {
                transactionModel = await createdTransaction.save();
            }
            if (!transactionModel) {
                throw new UnprocessableEntityException();
            }
            transaction = transactionModel['_doc'];
            console.log(`TransactionsService.create: transaction => ${JSON.stringify(transaction)}`)
            return transaction;
        } catch (error) {
            throw error;
        }
    }

    async findAll(accountNo: string): Promise<Transaction[]> {
        return this.transactionModel.find({ accountNo: accountNo }, null, { sort: { date: -1 } }).exec();
    }
}
