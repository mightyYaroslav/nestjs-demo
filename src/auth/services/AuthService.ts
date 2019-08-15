import { User } from '../../domain/user/data/User'
import { UserResponse } from '../../application/user/data/output/UserResponse'
import { CreateUserInput } from '../../application/user/data/input/CreateUserInput'

export interface AuthService {
  login(user: User): Promise<{ [key: string]: any }>

  register(input: CreateUserInput): Promise<UserResponse>
}

const AuthServiceType = Symbol.for('AuthService')
export { AuthServiceType }
