import { Injectable, forwardRef, Inject, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { AuthService } from '../auth/auth.service';
import { customOtpGen } from 'otp-gen-agent';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class UserService {
  logger: Logger;
  constructor(
    @Inject(CACHE_MANAGER) private cachemanager: Cache,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    // private http: HttpService,
    @Inject(forwardRef(() => AuthService))
    private AuthService: AuthService
  ) {
    this.logger = new Logger(UserService.name);
  }

  async findAll(): Promise<any> {
    return await this.userModel.aggregate([
      {
        $lookup: {
          from: 'roles',
          let: {
            userroles: '$role_id'
          },
          pipeline: [{
            $match: {
              $expr: {
                $in: ['$role_id', '$$userroles'],
              }
            }
          }],
          as: 'roles'
        },
      }]);
  }

  async findOne(query: any): Promise<any> {
    return await this.userModel.findOne(query).select('+password');
  }

  async findall(query: any): Promise<any> {
    return await this.userModel.find(query).select('+password');
  }

  async findById(id: string) {
    try {
      // check if data is in cache:
      const cachedData = await this.cachemanager.get('name');
      if (cachedData) {
        return cachedData;
      }
      // if not, call API and set the cache:
      const data = await this.userModel.findById(id)
      await this.cachemanager.set('name', data ,300000);
      return await data;

    }
    catch (error) {
      return error;
    }
  }

  async create(user: any): Promise<any> {
    try {
      this.logger.log('Creating user.');
      const hashedPassword = await this.AuthService.getHashedPassword(
        user.password
      );
      user.password = hashedPassword;
      user.user_id = await customOtpGen({ length: 8, chars: 'j3b7c29v' });
      const newUser = new this.userModel(user);
      return newUser.save();
    }
    catch (error) {
      return error;
    }
  }

  async insertmany(user: any): Promise<any> {
    try {
      this.logger.log('Creating user.');
      const hashedPassword = await this.AuthService.getHashedPassword(
        user.password
      );
      user.password = hashedPassword;
      user.user_id = await customOtpGen({ length: 8, chars: 'j3b7c29v' });
      const result =  this.userModel.insertMany([]);
      Promise.all([result]).then((value)=>{
        return result
      }).catch((err)=>{
        return err;
      })
    }
    catch (error) {
      return error;
    }
  }

  async findOneAndUpdate(query: any, payload: any): Promise<User> {
    try {
    this.logger.log('Updating User.');
    return this.userModel.findOneAndUpdate(query, payload, {
      new: true,
      upsert: true,
    });
  }catch(err){
    return err;
  }
  }

  async findOneAndRemove(query: any): Promise<any> {
    return this.userModel.findOneAndRemove(query);
  }

}
