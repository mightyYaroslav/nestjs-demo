import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { AuthServiceImpl } from './services/impl/AuthServiceImpl'
import { UserApplicationModule } from '../application/user/UserApplicationModule'

@Module({
  imports: [
    PassportModule,
    UserApplicationModule
  ],
  providers: [AuthServiceImpl],
  exports: [AuthServiceImpl]
})
export class AuthModule {}
