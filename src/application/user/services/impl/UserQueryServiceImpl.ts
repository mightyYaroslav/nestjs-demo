import { Inject, Injectable } from '@nestjs/common'
import { UserQueryService } from '../UserQueryService'
import { UserRepository, UserRepositoryType } from '../../ports/UserRepository'

@Injectable()
export class UserQueryServiceImpl implements UserQueryService {

  constructor(
    @Inject(UserRepositoryType)
    private readonly userRepository: UserRepository
  ) {}

  async checkIfExists(email: string, password: string): Promise<boolean> {
    const user = await this.userRepository.findByEmailAndPassword(email, password)
    return user != null
  }
}
