// import {
//     CallHandler,
//     ExecutionContext,
//     Injectable,
//     NestInterceptor,
//   } from '@nestjs/common';
//   import { Observable } from 'rxjs';
//   import { tap } from 'rxjs/operators';
//   import { UserService } from '../user/user.service';
  
//   @Injectable()
//   export class EventsTrackerInterceptor implements NestInterceptor {
//     constructor(private readonly UserService: UserService) {}
  
//     intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
//       const request = context.switchToHttp().getRequest();
//       const response = context.switchToHttp().getResponse();
//       const className = context.getClass().name;
//       const handler = context.getHandler().name;
  
//       return next.handle().pipe(
//         tap(data => {
//           this.UserService.handleEvent(
//             request.url,
//             className,
//             handler,
//             data,
//           );
//         }),
//       );
//     }
//   }
  