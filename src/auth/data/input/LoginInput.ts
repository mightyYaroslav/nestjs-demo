import { IsEmail, IsString, Length } from 'class-validator'

export class LoginInput {
  @IsEmail()
  @IsString()
  readonly email: string

  @IsString()
  @Length(8)
  readonly password: string
}
