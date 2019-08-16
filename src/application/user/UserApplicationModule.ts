import { Module } from '@nestjs/common'
import { UserPostgresModule } from '../../postgres/user/UserPostgresModule'
import { UserResponseConverter, UserResponseConverterType } from './services/converters/UserResponseConverter'
import { UserCreationServiceType } from './services/UserCreationService'
import { UserCreationServiceImpl } from './services/impl/UserCreationServiceImpl'
import { UserQueryServiceType } from './services/UserQueryService'
import { UserQueryServiceImpl } from './services/impl/UserQueryServiceImpl'

@Module({
  imports: [
    UserPostgresModule
  ],
  providers: [{
    provide: UserResponseConverterType,
    useClass: UserResponseConverter
  }, {
    provide: UserCreationServiceType,
    useClass: UserCreationServiceImpl
  }, {
    provide: UserQueryServiceType,
    useClass: UserQueryServiceImpl
  }],
  exports: [UserResponseConverterType, UserCreationServiceType, UserQueryServiceType]
})
export class UserApplicationModule {}
