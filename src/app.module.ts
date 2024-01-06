import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { MongooseModule } from '@nestjs/mongoose';
// import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    CacheModule.register({ isGlobal: true }),
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.mongo_url, { dbName: process.env.database }),
    AuthModule,
    RoleModule,
    UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

