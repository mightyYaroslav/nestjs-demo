import { UserResponse } from '../data/output/UserResponse'
import { CreateUserInput } from '../data/input/CreateUserInput'

export interface UserCreationService {
  createUser(input: CreateUserInput): Promise<UserResponse>
}

const UserCreationServiceType = Symbol.for('UserCreationService')
export { UserCreationServiceType }
