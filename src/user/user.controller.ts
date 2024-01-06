import {
  Controller, Get, Post, Body, Patch, Param, Delete, Request,
  Logger,
  ConflictException,
  UseInterceptors,
  NotFoundException,
  Put,
  UseGuards,
} from '@nestjs/common';

import { UserService } from './user.service';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './user.interface';
// import { responseMessage} from '../../src/interceptors/custom.interceptor';
// import { GET_USERS } from '../../src/interceptors/response.constants';
import { responseMessage} from 'src/interceptors/custom.interceptor';
import { GET_USERS } from 'src/interceptors/response.constants';
import { JwtAuthGuard } from '../auth/jwt-auth.gaurd';

@Controller('user')
export class UserController {
  logger: Logger;
  constructor(private readonly userService: UserService) {
    this.logger = new Logger(UserController.name);
   }

  //  postArticle(@Body() article: ArticleDTO) {

  @Post()
  async create(@Body() userrequest): Promise<any> {
    const newUser = userrequest;
    try {
      const query = { email: newUser.email };
      const isUser = await this.userService.findOne(query);
      if (isUser) throw new ConflictException('User Already Exist');
      console.log("result");
      const user =  this.userService.create(newUser);
      return user;

     
    //  const result = await this.startday(11, 2023 , 1)
    //   return result;
    } catch (err) {
      this.logger.error('Something went wrong in signup:', err);
      throw err;
    }
  }

   async startday(month , year , value) {
    var arr = [];

    var weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    //  var weekdays1 = ['Sunday', 'Saturday'];
    
  //   var d = new Date(year, month-1, 10);
       const daycount = await this.daysInMonth(month,year);
      while(value <= daycount){
           var d = new Date(year, month-1, value);
           const dayvalue = weekdays[d.getDay()];
          //  console.log(daycount, )
           if(dayvalue == 'Saturday' || dayvalue == 'Sunday') {
               arr.push( value+'-'+month+'-'+year+','+ dayvalue)
               value++;
               if(dayvalue == 'Sunday'){
                value +=5;
               }
           } else if(dayvalue == 'Wednesday'){
            value +=3;
           }  
          //  else if(dayvalue == 'Thursday'){
          //   value +=3;
          //  } else if(dayvalue == 'Wednesday'){
          //   value +=3;
          //  } else if(dayvalue == 'Wednesday'){
          //   value +=3;
          //  } else if(dayvalue == 'Wednesday'){
          //   value +=3;
          //  }
           
      }
        return await arr;
   } 
  
   async daysInMonth (month, year) {
    return await new Date(year, month, 0).getDate();
}
  @Post('/insertmany')
  async insertMany(@Body() userrequest): Promise<any> {
    var newUser = [] 
     newUser = userrequest.request;
    try {
      const emails = [];
      // newUser.forEach(element => {
      //   emails.push(element.email)
      // });
      for(const i of newUser){
        emails.push(i.email)
      }
      const query = { 'email': { $in: emails } };
      const isUser = await this.userService.findall(query);
      if (isUser) {
        const existemails = [];
        for(const i of isUser){
          existemails.push(i.email)
        }
         const result = JSON.stringify(existemails);
        throw new ConflictException('User Already Exist' , result );
      }
      const user = await this.userService.insertmany(newUser);
      return user;
    } catch (err) {
      this.logger.error('Something went wrong in signup:', err);
      throw err;
    }
  }

  
  @Get()
  // @UseInterceptors(TransformationInterceptor)
  @responseMessage(GET_USERS)
  @UseGuards(JwtAuthGuard)
  findAll():  Promise<Users[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  } catch (err) {
    this.logger.error('Something went wrong in gtting user:', err);
    throw err;
  }
  }




  @Put(':name')
  update(@Param('name') name: string, @Body() updateUserDto) {
    const query = { "email" : name};
    return this.userService.findOneAndUpdate(query, updateUserDto);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
