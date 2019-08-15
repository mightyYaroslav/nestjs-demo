import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { Event } from '../../event/data/Event'

interface UserConstructionObject {
  id?: number | null | undefined
  name: string
  surname: string
  password: string
  email: string
  events: Event[]
}

@Entity()
export class User {
  id: number | null

  name: string

  surname: string

  password: string

  email: string

  events: Event[]

  static fromObject(builder: UserConstructionObject): User {
    const newUser = new User()
    newUser.id = builder.id || null
    newUser.name = builder.name
    newUser.surname = builder.surname
    newUser.password = builder.password
    newUser.email = builder.email
    newUser.events = builder.events
    return newUser
  }

}
