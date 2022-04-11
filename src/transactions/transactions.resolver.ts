import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TransactionsService } from './transactions.service';
import { Transaction } from './entities/transaction.entity';
import { CreateTransactionInput } from './dto/create-transaction.input';
import { UpdateTransactionInput } from './dto/update-transaction.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';

@Resolver(() => Transaction)
export class TransactionsResolver {
    constructor(private readonly transactionsService: TransactionsService) {}

    @Mutation(() => Transaction)
    @UseGuards(JwtAuthGuard)
    createTransaction(@Args('createTransactionInput') createTransactionInput: CreateTransactionInput, @CurrentUser() user: any) {
        return this.transactionsService.create(createTransactionInput, null);
    }

    @Query(() => [Transaction], { name: 'transactions' })
    @UseGuards(JwtAuthGuard)
    findAll(@CurrentUser() user: any) {
        return this.transactionsService.findAll(user.phone);
    }
}