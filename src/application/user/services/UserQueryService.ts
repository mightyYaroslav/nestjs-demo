import { User } from '../../../domain/user/data/User'

export interface UserQueryService {
  findByEmailAndPassword(email: string, password: string): Promise<User | null>
}

const UserQueryServiceType = Symbol.for('UserQueryService')
export { UserQueryServiceType }
