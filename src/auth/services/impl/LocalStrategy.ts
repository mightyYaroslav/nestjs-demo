import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { UserQueryService, UserQueryServiceType } from '../../../application/user/services/UserQueryService'
import { User } from '../../../domain/user/data/User'
import * as crypto from 'crypto'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(UserQueryServiceType)
    private readonly userQueryService: UserQueryService
  ) {
    super()
  }

  async validate(email: string, password: string): Promise<User> {
    const passwordHash = crypto.createHmac('sha256', password).digest('hex')
    const user = await this.userQueryService.findByEmailAndPassword(email, passwordHash)
    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }

}
