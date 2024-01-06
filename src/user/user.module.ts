import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
// import { AuthModule } from '../../src/auth/auth.module';
// import { AuthService } from '../../src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { APP_INTERCEPTOR } from '@nestjs/core';
// import { ExcludeNullInterceptor, TransformationInterceptor } from '../../src/interceptors/custom.interceptor';
// import { HttpExceptionFilter } from '../../src/interceptors/exception.filter';
import { HttpExceptionFilter } from 'src/interceptors/exception.filter';
import { ExcludeNullInterceptor, TransformationInterceptor } from 'src/interceptors/custom.interceptor';


import { CacheModule } from '@nestjs/cache-manager';
// import { CACHE_MANAGER} from '@nestjs/common';
@Module({
  imports: [
    CacheModule.register({
      // url: process.env.REDIS_URL,
      // db: 0,
      // port: parseInt(process.env.REDIS_PORT),
      // password: process.env.REDIS_PASSWORD,
      isGlobal: true, 
  }),
    HttpModule.register({
      timeout: 50000,
      maxRedirects: 5,
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UserController],
  providers: [UserService, AuthService, JwtService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ExcludeNullInterceptor
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformationInterceptor
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpExceptionFilter
    },
  ],
  exports: [UserService]
})
export class UserModule { }
