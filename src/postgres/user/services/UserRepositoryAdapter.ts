import { Inject, Injectable } from '@nestjs/common'
import { UserRepository } from '../../../application/user/ports/UserRepository'
import { User } from '../../../domain/user/data/User'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from '../data/UserEntity'
import { Repository } from 'typeorm'
import { UserEntityConverter } from './converters/UserEntityConverter'
import { Converter } from '../../../configuration/Converter'

@Injectable()
export class UserRepositoryAdapter implements UserRepository {

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @Inject(UserEntityConverter)
    private readonly converter: Converter<User, UserEntity>
  ) {}

  async findById(id: number): Promise<User | null> {
    const entity = await this.userRepository.findOne({ where: { id } })
    return entity ? this.converter.to(entity) : null
  }

  async findByEmailAndPassword(email: string, password: string): Promise<User | null> {
    const entity = await this.userRepository.findOne({ where: { email, password } })
    return entity ? this.converter.to(entity) : null
  }

  async save(user: User): Promise<User> {
    const entity = this.converter.from(user)
    const savedUser = await this.userRepository.save(entity)
    return this.converter.to(savedUser)
  }

}
