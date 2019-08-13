import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Recurr {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  date: Date

}
