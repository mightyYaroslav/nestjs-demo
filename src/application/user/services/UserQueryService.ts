export interface UserQueryService {
  checkIfExists(email: string, password: string): Promise<boolean>
}

const UserQueryServiceType = Symbol.for('UserQueryService')
export { UserQueryServiceType }
