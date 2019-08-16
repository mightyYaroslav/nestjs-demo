import { Converter } from '../../../../configuration/Converter'
import { Injectable } from '@nestjs/common'
import { UserEntity } from '../../data/UserEntity'
import { User } from '../../../../domain/user/data/User'
import { EventEntity } from '../../../event/data/EventEntity'

@Injectable()
export class UserEntityConverter implements Converter<User, UserEntity> {
  from(from: User): UserEntity {
    return UserEntity.fromObject({
      ...from,
      events: from.events.map(event => EventEntity.fromObject({ ...event }))
    })
  }

  to(to: UserEntity): User {
    return User.fromObject({ ...to })
  }

}

const UserEntityConverterType = Symbol.for('UserEntityConverter')
export { UserEntityConverterType }
