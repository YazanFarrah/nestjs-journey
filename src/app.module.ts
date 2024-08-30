import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { PostsModule } from './modules/posts/posts.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './core/guards/access-token/access-token.guard';

@Module({
  imports: [
    UsersModule,
    PostsModule,
    AuthModule,
    JwtModule.register({
      global: true,
      secret: 'Y4Z$0$14lM3d144ppl1c4t10n_ACCESS_TOKEN',
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
  ],
})
export class AppModule {}
