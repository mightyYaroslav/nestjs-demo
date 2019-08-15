import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm'
import { UserEntity } from '../../user/data/UserEntity'

interface EventEntityConstructionObject {
  id: number
  name: string
  description: string
  user: UserEntity
}

@Entity()
export class EventEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 500 })
  name: string

  @Column('text')
  description: string

  @ManyToOne(type => UserEntity, user => user.events)
  user: UserEntity

  static fromObject(builder: EventEntityConstructionObject): EventEntity {
    const newEvent = new EventEntity()
    newEvent.id = builder.id
    newEvent.name = builder.name
    newEvent.description = builder.description
    newEvent.user = builder.user
    return newEvent
  }
}
