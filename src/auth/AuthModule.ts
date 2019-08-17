import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { AuthServiceImpl } from './services/impl/AuthServiceImpl'
import { UserApplicationModule } from '../application/user/UserApplicationModule'
import { JwtModule } from '@nestjs/jwt'
import config from '../configuration/Config'
import { LocalStrategy } from './services/impl/LocalStrategy'
import { JwtStrategy } from './services/impl/JwtStrategy'
import { AuthServiceType } from './services/AuthService'

@Module({
  imports: [
    PassportModule,
    UserApplicationModule,
    JwtModule.register({
      secret: config.jwt.secret
    })
  ],
  providers: [{
    provide: AuthServiceType,
    useClass: AuthServiceImpl
  }, LocalStrategy, JwtStrategy],
  exports: [AuthServiceType]
})
export class AuthModule {}
