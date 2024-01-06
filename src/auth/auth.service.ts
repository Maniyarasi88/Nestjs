import { Injectable, NotFoundException, Inject,UnauthorizedException, forwardRef } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(@Inject(forwardRef(() => UserService))private UserService: UserService,private jwtService: JwtService){}
    async validateUser(email: string, pass: string): Promise<any> {
        const query = { email: email };
        const user = await this.UserService.findOne(query);
        if (!user) throw new NotFoundException();
        const isMatched = await this.comparePasswords(pass, user.password);
        if (!isMatched) throw new UnauthorizedException();
        return user;
    }
    //compare password
    async comparePasswords(
        password: string,
        hashedPassword: string
    ): Promise<any> {
        return bcrypt
            .compare(password, hashedPassword)
            .then((isMatch) => {
                if (isMatch) return true;
                return false;
            })
            .catch((err) => err);
    }

    async getHashedPassword(password: string): Promise<any> {
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    reject(err);
                }
                resolve(hash);
            });
        });
    }

    async generateJwtToken(user: any) {
        const payload = {
        email: user.email
        };
        // return {
        // access_token: this.jwtService.sign(payload),
        // };
        return {
            access_token: this.jwtService.sign(payload, { secret: `${process.env.SECRET_KEY}` }),
        };
        }
}
