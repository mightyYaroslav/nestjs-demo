import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator'
import { Transform, Type } from 'class-transformer'
import * as crypto from 'crypto'
import { ApiModelProperty } from '@nestjs/swagger'

export class CreateUserInput {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @ApiModelProperty({
    minLength: 2,
    maxLength: 50
  })
  name: string

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @ApiModelProperty({
    minLength: 2,
    maxLength: 50
  })
  surname: string

  @IsString()
  @MinLength(6)
  @MaxLength(8)
  @Type(() => String)
  @Transform(password => crypto.createHmac('sha256', password).digest('hex'))
  @ApiModelProperty({
    minLength: 8,
    maxLength: 8
  })
  password: string

  @IsString()
  @IsEmail()
  @ApiModelProperty()
  email: string

}
