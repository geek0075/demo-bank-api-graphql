import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsResolver } from './transactions.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionSchema } from './schemas/transaction.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Transaction', schema: TransactionSchema }])],
    providers: [TransactionsResolver, TransactionsService],
    exports: [TransactionsService],
})
export class TransactionsModule {}