import { Module } from '@nestjs/common'
import { AuthController } from './auth/auth.controller'
import { CalendarController } from './calendar/calendar.controller'
import { AuthService } from './auth/auth.service'
import { CalendarService } from './calendar/calendar.service'
import { AuthModule } from './auth/auth.module'
import { CalendarModule } from './calendar/calendar.module'
import {TypeOrmModule} from '@nestjs/typeorm'

@Module({
  imports: [
    AuthModule,
     CalendarModule,
     TypeOrmModule.forRoot()
    ],
  controllers: [AuthController, CalendarController],
  providers: [AuthService, CalendarService]
})
export class AppModule {}
