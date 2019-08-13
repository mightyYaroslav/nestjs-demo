import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

enum IntervalType {
  DAY = 'DAY',
  WEEK = 'WEEK',
  MONTH = 'MONTH',
  YEAR = 'YEAR'
}

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 500 })
  name: string

  @Column('text')
  description: string

  @Column('array')
  dows: string[]

  @Column()
  intervalNum: number

  @Column()
  intervalType: IntervalType

}
