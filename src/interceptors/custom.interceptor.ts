// import { map, Observable } from 'rxjs';
import { Users } from '../../src/user/user.interface';
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Reflector } from '@nestjs/core'


export class CustomInterceptors implements NestInterceptor {
    intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
        console.log('Before...');
        return handler.handle().pipe(
            map((data) =>
                data.map((item: Users) => {
                    console.log('After....', data);
                    const res = {
                        ...item,
                        namefield: item.name,
                        emailfield: item.email,
                    }
                })));
    }
}

export interface Response<T> {
    data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
        return next.handle().pipe(map(data => ({ data })));
    }

}



import { SetMetadata } from '@nestjs/common'

export const ResponseMessageKey = 'ResponseMessageKey'
export const responseMessage = (message: string) => SetMetadata(ResponseMessageKey, message)


@Injectable()
export class TransformationInterceptor<T>
    implements NestInterceptor<T, Response<T>>
{
    constructor(private reflector: Reflector) { }

    intercept(
        context: ExecutionContext,
        next: CallHandler
    ): Observable<Response<T>> {
        const responseMessage = this.reflector.get<string>(
            ResponseMessageKey,
            context.getHandler()
        ) ?? ''

        return next.handle().pipe(
            map((data) => ({
                data,
                statusCode: context.switchToHttp().getResponse().statusCode,
                message: responseMessage
            }))
        )
    }
}


export class ExcludeNullInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      return next
        .handle()
        .pipe(map(value => value === null ? '' : value ));
    }

}