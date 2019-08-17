import { IsString, MaxLength, MinLength } from 'class-validator'
import { ApiModelProperty } from '@nestjs/swagger'

export class CreateEventInput {
  @IsString()
  @MinLength(1)
  @MaxLength(500)
  @ApiModelProperty({
    minLength: 1,
    maxLength: 500
  })
  name: string

  @IsString()
  @MinLength(1)
  @MaxLength(2000)
  @ApiModelProperty({
    minLength: 1,
    maxLength: 2000
  })
  description: string
}
