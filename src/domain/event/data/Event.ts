import { User } from '../../user/data/User'

interface EventConstructionObject {
  id?: number | null | undefined
  name: string
  description: string
  user: User
}

export class Event {
  id: number | null

  name: string

  description: string

  user: User

  static fromObject(builder: EventConstructionObject): Event {
    const newEvent = new Event()
    newEvent.id = builder.id || null
    newEvent.name = builder.name
    newEvent.description = builder.description
    newEvent.user = builder.user
    return newEvent
  }

}
