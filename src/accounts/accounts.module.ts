import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsResolver } from './accounts.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountSchema } from './schemas/account.schema';
import { TransactionsModule } from 'src/transactions/transactions.module';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Account', schema: AccountSchema }]), TransactionsModule],
    providers: [AccountsResolver, AccountsService],
    exports: [AccountsService],
})
export class AccountsModule {}