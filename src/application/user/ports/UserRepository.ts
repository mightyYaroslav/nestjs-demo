import { User } from '../../../domain/user/data/User'

export interface UserRepository {
  findById(id: number): Promise<User | null>

  findByEmailAndPassword(email: string, password: string): Promise<User | null>

  save(user: User): Promise<User>
}

const UserRepositoryType = Symbol.for('UserRepository')
export { UserRepositoryType }
