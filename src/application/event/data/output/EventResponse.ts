import { ApiModelProperty } from '@nestjs/swagger'
import { UserResponse } from '../../../user/data/output/UserResponse'

interface EventResponseConstructionObject {
  id: number
  name: string
  description: string
  user: UserResponse
}

export class EventResponse {
  @ApiModelProperty()
  id: number

  @ApiModelProperty()
  name: string

  @ApiModelProperty()
  description: string

  @ApiModelProperty({ type: UserResponse })
  user: UserResponse

  static fromObject(builder: EventResponseConstructionObject): EventResponse {
    const newEvent = new EventResponse()
    newEvent.id = builder.id
    newEvent.name = builder.name
    newEvent.description = builder.description
    newEvent.user = builder.user
    return newEvent
  }

}
