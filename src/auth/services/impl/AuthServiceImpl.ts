import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { AuthService } from '../AuthService'
import { User } from '../../../domain/user/data/User'
import { JwtService } from '@nestjs/jwt'
import { UserResponse } from '../../../application/user/data/output/UserResponse'
import { UserCreationService, UserCreationServiceType } from '../../../application/user/services/UserCreationService'
import { CreateUserInput } from '../../../application/user/data/input/CreateUserInput'
import { UserQueryService, UserQueryServiceType } from '../../../application/user/services/UserQueryService'

@Injectable()
export class AuthServiceImpl implements AuthService {

  constructor(
    @Inject(UserCreationServiceType)
    private readonly userCreationService: UserCreationService,
    @Inject(UserQueryServiceType)
    private readonly userQueryService: UserQueryService,
    private readonly jwtService: JwtService
  ) {}

  private async validateUser(email: string, password: string): Promise<boolean> {
    const found = await this.userQueryService.checkIfExists(email, password)
    if (!found) {
      throw new NotFoundException()
    }
    return found
  }

  async login(user: User): Promise<{ [key: string]: any }> {
    await this.validateUser(user.email, user.password)
    const payload = `${user.email}${user.id}`
    const accessToken = this.jwtService.sign(payload)
    return {
      expires_in: 3600,
      access_token: accessToken,
      user_id: payload,
      status: 200
    }
  }

  register(input: CreateUserInput): Promise<UserResponse> {
    return this.userCreationService.createUser(input)
  }
}
