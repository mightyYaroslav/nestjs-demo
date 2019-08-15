import { IsEmail, IsString, Length, MaxLength, MinLength } from 'class-validator'

export class LoginDto {
  @IsEmail()
  @IsString()
  readonly email: string

  @IsString()
  @Length(8)
  readonly password: string

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name: string

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  surname: string
}
