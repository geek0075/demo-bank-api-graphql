import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { AccountsService } from './accounts.service';
import { Account } from './entities/account.entity';
import { CreateAccountInput } from './dto/create-account.input';
import { TransactionsService } from 'src/transactions/transactions.service';
import { TransactAccountInput } from './dto/transact-account.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';

@Resolver(() => Account)
export class AccountsResolver {
    constructor(
        private readonly accountsService: AccountsService,
        private readonly transactionsService: TransactionsService
    ) {}

    @Mutation(() => Account)
    @UseGuards(JwtAuthGuard)
    createAccount(@Args('createAccountInput') createAccountInput: CreateAccountInput, @CurrentUser() user: any) {
        return this.accountsService.create(createAccountInput, null);
    }

    @Query(() => Account, { name: 'account' })
    @UseGuards(JwtAuthGuard)
    findOne(@CurrentUser() user: any) {
        return this.accountsService.findOne(user.phone);
    }

    @Mutation(() => Account)
    @UseGuards(JwtAuthGuard)
    depositAccount(@Args('transactAccountInput') transactAccountInput: TransactAccountInput, @CurrentUser() user: any) {
        return this.accountsService.deposit(user.phone, transactAccountInput);
    }

    @Mutation(() => Account)
    @UseGuards(JwtAuthGuard)
    withdrawAccount(@Args('transactAccountInput') transactAccountInput: TransactAccountInput, @CurrentUser() user: any) {
        return this.accountsService.withdraw(user.phone, transactAccountInput);
    }

    @ResolveField()
    async transactions(@Parent() account: Account) {
        const { accountNo } = account;
        return this.transactionsService.findAll(accountNo);
    }
}