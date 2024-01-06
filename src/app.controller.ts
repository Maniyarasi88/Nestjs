import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { elementAt } from 'rxjs';
import { executionAsyncResource } from 'async_hooks';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

}
