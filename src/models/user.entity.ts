import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 50 })
  name: string

  @Column({length: 50})
  surname: string

  @Column({length: 200})
  password: string

  @Column('array')
  email: string[]

}
