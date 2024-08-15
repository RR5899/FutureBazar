import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { FirebaseMiddleware } from './auth/firebase/firebase.middleware';
import { ViewsModule } from './views/views.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { RolePermissionModule } from './role-permission/role-permission.module';
import { ShopRequestModule } from './user-request/shop-request.module';
import { UserInfoModule } from './user-info/user-info.module';
import { PrismaService } from './prisma/prisma.service';
import { FirebaseModule } from './firebase/firebase.module';
import { CategoriesModule } from './categories/categories.module';
import { ShopModule } from './shop/shop.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ProductModule,
    AuthModule,
    ViewsModule,
    UserModule,
    RoleModule,
    RolePermissionModule,
    ShopRequestModule,
    UserInfoModule,
    FirebaseModule,
    CategoriesModule,
    ShopModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService
  ],
})
export class AppModule implements NestModule {
  constructor() {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FirebaseMiddleware).forRoutes('*');
  }
}