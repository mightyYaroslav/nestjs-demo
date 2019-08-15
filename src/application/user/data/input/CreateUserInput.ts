import { IsEmail, IsString, Length, MaxLength, MinLength } from 'class-validator'

export class CreateUserInput {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name: string

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  surname: string

  @IsString()
  @Length(8)
  password: string

  @IsString()
  @IsEmail()
  email: string

}
