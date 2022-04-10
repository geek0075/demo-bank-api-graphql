import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AccessToken } from './entities/access-token.entity';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    async validateUser(phone: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(phone);
        if (user && user.password === pass) {
            const { password, ...result } = user;
            console.log(`AuthService.validateUser: result => ${JSON.stringify(result)}`)
            return result;
        }
        return null;
    }

    async login(user: any): Promise<AccessToken> {
        const payload = { phone: user.phone, sub: user._id };
        return new AccessToken(this.jwtService.sign(payload));
    }
}