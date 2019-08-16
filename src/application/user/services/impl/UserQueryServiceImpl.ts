import { Inject, Injectable } from '@nestjs/common'
import { UserQueryService } from '../UserQueryService'
import { UserRepository, UserRepositoryType } from '../../ports/UserRepository'
import { User } from '../../../../domain/user/data/User'
import { UserEntityConverterType } from '../../../../postgres/user/services/converters/UserEntityConverter'
import { UserEntity } from '../../../../postgres/user/data/UserEntity'
import { Converter } from '../../../../configuration/Converter'

@Injectable()
export class UserQueryServiceImpl implements UserQueryService {

  constructor(
    @Inject(UserRepositoryType)
    private readonly userRepository: UserRepository,
    @Inject(UserEntityConverterType)
    private readonly converter: Converter<User, UserEntity>
  ) {}

  async findByEmailAndPassword(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findByEmailAndPassword(email, password)
    return user ? this.converter.to(user) : null
  }
}
