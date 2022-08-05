import { RolesGuard } from './common/guard/roles.guard';
import { TimeoutInterceptor } from './common/interceptor/timeout.interceptor';
import { LoggingInterceptor } from './common/interceptor/logging.interceptor';
import { JwtAuthGuard } from './core/auth/jwt-auth.guard';
import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { getEnvPath } from './common/helper/env.helper';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CoreModule } from './core';
import { AppModules } from './modules';

const envFilePath: string = getEnvPath(`${__dirname}/common/envs`);
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    CoreModule,
    AppModules,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: config.get<string>('DB_TYPE'),
          host: config.get<string>('DB_HOST'),
          port: config.get<string>('DB_PORT'),
          username: config.get<string>('DB_USERNAME'),
          password: config.get<string>('DB_PASSWORD'),
          database: config.get<string>('DB_DATABASE'),
          entities: [join(__dirname, '**', '*.entity.{ts,js}')],
          subscribers: [__dirname + '**/**/*.subscriber.{ts,js}'],
          synchronize: config.get<string>('DB_SYNC'),
          retryAttempts: 20,
        } as TypeOrmModuleAsyncOptions;
      },
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeoutInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
