import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { AuthService } from '../AuthService'
import { User } from '../../../domain/user/data/User'
import { JwtService } from '@nestjs/jwt'
import { UserResponse } from '../../../application/user/data/output/UserResponse'
import { UserCreationService, UserCreationServiceType } from '../../../application/user/services/UserCreationService'
import { CreateUserInput } from '../../../application/user/data/input/CreateUserInput'
import { UserQueryService, UserQueryServiceType } from '../../../application/user/services/UserQueryService'
import { UserResponseConverterType } from '../../../application/user/services/converters/UserResponseConverter'
import { Converter } from '../../../configuration/Converter'

@Injectable()
export class AuthServiceImpl implements AuthService {

  constructor(
    @Inject(UserCreationServiceType)
    private readonly userCreationService: UserCreationService,
    @Inject(UserQueryServiceType)
    private readonly userQueryService: UserQueryService,
    @Inject(UserResponseConverterType)
    private readonly userConverter: Converter<User, UserResponse>,
    private readonly jwtService: JwtService
  ) {}

  public async validateUser(email: string, password: string): Promise<UserResponse> {
    const found = await this.userQueryService.findByEmailAndPassword(email, password)
    if (!found) {
      throw new NotFoundException()
    }
    return this.userConverter.from(found)
  }

  async login(user: User): Promise<{ [key: string]: any }> {
    const payload = { email: user.email, id: user.id }
    return {
      access_token: this.jwtService.sign(payload)
    }
  }

  register(input: CreateUserInput): Promise<UserResponse> {
    return this.userCreationService.createUser(input)
  }
}
