import { Module } from '@nestjs/common'
import { ConfigurationModule } from './configuration/ConfigurationModule'
import { TypeOrmModule } from '@nestjs/typeorm'
import config from './configuration/Config'
import { AuthControllerModule } from './web/auth/AuthControllerModule'
import { EventControllerModule } from './web/event/EventControllerModule'
import { join } from 'path'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: config.typeorm.host,
      port: config.typeorm.port,
      username: config.typeorm.username,
      password: config.typeorm.password,
      database: config.typeorm.database,
      entities: [join(__dirname, '**/**Entity{.ts,.js}')],
      synchronize: true
    }),
    ConfigurationModule,
    AuthControllerModule,
    EventControllerModule
  ]
})
export class AppModule {}
