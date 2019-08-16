import { Module } from '@nestjs/common'
import { UserEntityConverter, UserEntityConverterType } from './services/converters/UserEntityConverter'
import { UserRepositoryAdapter } from './services/UserRepositoryAdapter'
import { UserRepositoryType } from '../../application/user/ports/UserRepository'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from './data/UserEntity'

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [{
    provide: UserRepositoryType,
    useClass: UserRepositoryAdapter
  }, {
    provide: UserEntityConverterType,
    useClass: UserEntityConverter
  }],
  exports: [UserRepositoryType, UserEntityConverterType]
})
export class UserPostgresModule {}
