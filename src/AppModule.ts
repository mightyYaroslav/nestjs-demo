import { Module } from '@nestjs/common'
import { UserModule } from './user/user.module'
import { ConfigurationModule } from './configuration/ConfigurationModule'
import { TypeOrmModule } from '@nestjs/typeorm'
import config from './configuration/Config'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: config.typeorm.host,
      port: config.typeorm.port,
      username: config.typeorm.username,
      password: config.typeorm.password,
      database: config.typeorm.database,
      entities: ['src/**/*.entity{.ts,.js}'],
      synchronize: true
    }),
    UserModule,
    ConfigurationModule
  ]
})
export class AppModule {}
