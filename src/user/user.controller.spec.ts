import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Users } from './user.interface';
import { ExcludeNullInterceptor, responseMessage, TransformationInterceptor } from '../../src/interceptors/custom.interceptor';
import { GET_USERS } from '../../src/interceptors/response.constants';
import { CacheModule } from '@nestjs/cache-manager';
import { AuthService } from '../../src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from '../../src/interceptors/exception.filter';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { ConflictException, forwardRef } from '@nestjs/common';
import { AuthModule } from '../../src/auth/auth.module';
import { User, UserSchema } from './user.schema';
import { UserDTOStub, getUserDTOStub } from "../../src/user/dto/user.dto.stub";
import { Model } from 'mongoose';
// class ApiServiceMock {
//   create(request: any) {
//      return [];
//   }
//   findAll() {
//     return [];
//   }
//   // deleteNote(id: string) {
//   //   return null;
//   // }
//   // updateNote(id: string, dto: any) {
//   //   return [];
//   // }
// }

describe('UserController', () => {
  let controller: UserController;
  let spyService: UserService;
  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: UserService,
      // useClass: ApiServiceMock,
      useFactory: () => ({
        create: jest.fn(() => []),
        findAll: jest.fn(() => []),
        findOne: jest.fn(() => [])
      })
    }
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      imports: [
        CacheModule.register(),
        HttpModule.register({
          timeout: 50000,
          maxRedirects: 5,
        }),
        MongooseModule.forRoot(process.env.mongo_url, { dbName: process.env.database }),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        forwardRef(() => AuthModule),
      ],
      providers: [UserService, { provide: getModelToken(User.name), useValue: jest.fn() }, ApiServiceProvider, AuthService, JwtService,
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
    }).compile();

    controller = module.get<UserController>(UserController);
    spyService = module.get<UserService>(UserService);
  });

  
  describe("create user", () => {
    it("calling create method", (done) => {
      const expectedResult = UserDTOStub();
      const tweet = jest.spyOn(controller, "create").mockResolvedValue(expectedResult);
      // expect(tweet).toHaveBeenCalledWith(UserDTOStub());
      if(!tweet)expect(tweet).toThrowError();
      done();
    })
  
    it("should return UserAlreadyExists (Bad Request - 400) exception", async () => {
      // await (new userm(UserDTOStub()).save());
      return await expect(controller.create(UserDTOStub()))
        .rejects
        .toThrow(ConflictException);
    });  
  });


  // it("should return conflict if User already exists ", async (done) => {
  //   const serviceMockResult = UserDTOStub()
  //   // Pretend that a client does already exist
  //   jest.spyOn(spyService, "create").mockResolvedValue(serviceMockResult);
  //   await controller.create( UserDTOStub())
  //    .then(() => done.fail("Client controller shuold return conflict error of 409 but did not"))
  //    .catch((error) => {
  //    expect(error.status).toBe(409);
  //    expect(error.message).toBe("Already exists a client with the same client_id");
  //    done();
  //    });
  //  });


  describe("get all users", () => {
    it("calling getalluser method", () => {
      const findalluser = jest.spyOn(controller, 'findAll');
      controller.findAll();
      expect(findalluser).toHaveBeenCalled;
    })
  
    it("should return null if no user", async () => {
      const article = await controller.findAll();
      if(!article) expect(article).toBeNull();
    });
  });

  describe("get user by id", () => {
    it("calling get user by id method", async () => {
      // await (new articleModel(ArticleDTOStub()).save());
      // const article = await controller.findOne(getUserDTOStub().id);
      // expect(article.title).toBe(getUserDTOStub().id);

      const finduserbyid = jest.spyOn(controller, 'findOne');
      controller.findOne(getUserDTOStub().id);
      expect(finduserbyid).toHaveBeenCalledWith(getUserDTOStub().id);

    });
    it("should return null", async () => {
      const article = await controller.findOne(getUserDTOStub().id);
      if(!article) expect(article).toBeNull();
    });
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

// https://dev.to/tkssharma/unit-testing-and-integration-testing-nestjs-application-4d7a