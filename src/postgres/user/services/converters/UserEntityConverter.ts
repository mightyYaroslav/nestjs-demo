import { Converter } from '../../../../configuration/Converter'
import { Injectable } from '@nestjs/common'
import { UserEntity } from '../../data/UserEntity'
import { User } from '../../../../domain/user/data/User'

@Injectable()
export class UserEntityConverter implements Converter<User, UserEntity> {
  from(from: User): UserEntity {
    return UserEntity.fromObject({ ...from })
  }

  to(to: UserEntity): User {
    return User.fromObject({ ...to })
  }

}

const UserEntityConverterType = Symbol.for('UserEntityConverter')
export { UserEntityConverterType }
