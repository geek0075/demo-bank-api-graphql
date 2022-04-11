import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { AccountsService } from 'src/accounts/accounts.service';
import { UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { LoginUserInput } from './dto/login-user.input';
import { AuthService } from 'src/auth/auth.service';
import { AccessToken } from 'src/auth/entities/access-token.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Resolver(() => User)
export class UsersResolver {
    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService,
        private readonly accountsService: AccountsService
    ) {}

    @Mutation(() => User)
    registerUser(@Args('createUserInput') createUserInput: CreateUserInput) {
        return this.usersService.create(createUserInput);
    }

    @Query(() => User, { name: 'user' })
    @UseGuards(JwtAuthGuard)
    findOne(@CurrentUser() user: any) {
        console.log(`UsersResolver.findOne: user.phone => ${user.phone}`);
        return this.usersService.findOne(user.phone);
    }

    @Mutation(() => AccessToken)
    @UseGuards(LocalAuthGuard)
    loginUser(@Args('loginUserInput') loginUserInput: LoginUserInput, @Context() context) {
        console.log(`UsersResolver.loginUser: context.user => ${JSON.stringify(context.user)}`);
        return this.authService.login(context.user);
    }

    @ResolveField()
    async account(@Parent() user: User) {
        const { phone } = user;
        return this.accountsService.findOne(phone)
    }
}