import { ApiModelProperty } from '@nestjs/swagger'

interface UserResponseConstructionObject {
  name: string
  surname: string
  email: string
}

export class UserResponse {
  @ApiModelProperty()
  name: string

  @ApiModelProperty()
  surname: string

  @ApiModelProperty()
  email: string

  static fromObject(builder: UserResponseConstructionObject): UserResponse {
    const newUser = new UserResponse()
    newUser.name = builder.name
    newUser.surname = builder.surname
    newUser.email = builder.email
    return newUser
  }

}
