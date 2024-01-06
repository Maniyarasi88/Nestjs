import { Controller,Post,Logger,Request,UseGuards,Get} from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './jwt-auth.gaurd';
import { LocalAuthGuard } from './local-auth.gaurd';
import { AuthService} from './auth.service'

@Controller('auth')
export class AuthController {
logger: Logger;
constructor(private authService : AuthService
) {
this.logger = new Logger(AuthController.name);
}
// @UseGuards(AuthGuard('local'))
// @Post('login')
// async login(@Request() req): Promise<any> {
// try {
// return req.user;
// } catch (error) {
// throw error;
// }
// }
@Post('login')
@UseGuards(LocalAuthGuard)
async login(@Request() req): Promise<any> {
  try {
    //return req.user;
    return await this.authService.generateJwtToken(req.user);
  } catch (error) {
    throw error;
  }
}

@UseGuards(JwtAuthGuard)
@Get('viewProfile')
async getUser(@Request() req): Promise<any> {
  return req.user;
}

}