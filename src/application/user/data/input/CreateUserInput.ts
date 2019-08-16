import { IsEmail, IsString, Length, MaxLength, MinLength } from 'class-validator'
import { Transform } from 'class-transformer'
import * as crypto from 'crypto'

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
  @Transform(password => crypto.createHmac('sha256', password).digest('hex'))
  password: string

  @IsString()
  @IsEmail()
  email: string

}
