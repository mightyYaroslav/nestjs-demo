import { Injectable, NotImplementedException } from '@nestjs/common'
import { Converter } from '../../../../configuration/Converter'
import { UserResponse } from '../../data/output/UserResponse'
import { User } from '../../../../domain/user/data/User'

@Injectable()
export class UserResponseConverter implements Converter<User, UserResponse> {
  from(from: User): UserResponse {
    return UserResponse.fromObject({ ...from })
  }

  to(to: UserResponse): User {
    throw new NotImplementedException('Cannot be implemented')
  }

}

const UserResponseConverterType = Symbol.for('UserResponseConverter')
export {UserResponseConverterType}
