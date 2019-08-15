import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { UserCreationService } from '../UserCreationService'
import { User } from '../../../../domain/user/data/User'
import { UserResponse } from '../../data/output/UserResponse'
import { UserRepository, UserRepositoryType } from '../../ports/UserRepository'
import { UserResponseConverterType } from '../converters/UserResponseConverter'
import { Converter } from '../../../../configuration/Converter'
import { CreateUserInput } from '../../data/input/CreateUserInput'

@Injectable()
export class UserCreationServiceImpl implements UserCreationService {

  constructor(
    @Inject(UserRepositoryType)
    private readonly userRepository: UserRepository,
    @Inject(UserResponseConverterType)
    private readonly userConverter: Converter<User, UserResponse>
  ) {}

  async createUser(input: CreateUserInput): Promise<UserResponse> {
    const existingUser = await this.userRepository.findByEmailAndPassword(input.email, input.password)
    if (existingUser) {
      throw new BadRequestException()
    }
    const user = User.fromObject({
      name: input.name,
      surname: input.surname,
      password: input.password,
      email: input.email,
      events: []
    })
    const savedUser = await this.userRepository.save(user)
    return this.userConverter.from(savedUser)
  }

}
