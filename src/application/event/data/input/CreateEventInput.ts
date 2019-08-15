import { IsString, MaxLength, MinLength } from 'class-validator'

export class CreateEventInput {
  @IsString()
  @MinLength(1)
  @MaxLength(500)
  name: string

  @IsString()
  @MinLength(1)
  @MaxLength(2000)
  description: string
}
