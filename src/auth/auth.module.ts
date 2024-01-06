import { Module, forwardRef } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { AuthService } from './auth.service';
import { LocalStrategy } from './localStrategy';
import { User, UserSchema } from '../user/user.schema';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwtStratergy';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
dotenv.config();
@Module({
  imports: [
    HttpModule.register({
      timeout: 50000,
      maxRedirects: 5,
    }),
    JwtModule.register({
      secret: `${process.env.SECRET_KEY}`,
      signOptions: { expiresIn: '3000000s' },
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(() => UserModule),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    UserService,
    JwtStrategy,
    JwtService],
  exports: [
    AuthService,
    LocalStrategy
  ],
})
export class AuthModule { }