import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { EventEntity } from '../../event/data/EventEntity'

interface UserEntityConstructionObject {
  id: number
  name: string
  surname: string
  password: string
  email: string
  events: EventEntity[]
}

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 50 })
  name: string

  @Column({ length: 50 })
  surname: string

  @Column()
  password: string

  @Column()
  email: string

  @OneToMany(type => EventEntity, event => event.user)
  events: EventEntity[]

  static fromObject(builder: UserEntityConstructionObject): UserEntity {
    const newUser = new UserEntity()
    newUser.id = builder.id
    newUser.name = builder.name
    newUser.surname = builder.surname
    newUser.password = builder.password
    newUser.email = builder.email
    newUser.events = builder.events
    return newUser
  }

}
