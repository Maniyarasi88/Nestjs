import { LazyModuleLoader, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from '@nestjs/passport';
// import { CustomInterceptors } from './interceptors/custom.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalInterceptors(new CustomInterceptors());

  // const lazyModuleLoader = app.get(LazyModuleLoader);
  // const { RoleModule } = await import('../src/role/role.module');
  // const moduleRef = await this.lazyModuleLoader.load(() => RoleModule);
  // const { RoleService } = await import('../src/role/role.service');
  // const lazyService = moduleRef.get(RoleService);

  // const authGuard = app
  //   .select(AuthModule)
  //   .get(AuthGuard);
  // app.useGlobalGuards(authGuard);
  await app.listen(3001);
}
bootstrap();
