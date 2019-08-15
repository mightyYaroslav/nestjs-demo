import { Inject, Injectable } from '@nestjs/common'
import { EventRepository } from '../../../application/event/ports/EventRepository'
import { InjectRepository } from '@nestjs/typeorm'
import { EventEntity } from '../data/EventEntity'
import { Repository } from 'typeorm'
import { EventEntityConverter } from './converters/EventEntityConverter'
import { Converter } from '../../../configuration/Converter'
import { Event } from '../../../domain/event/data/Event'

@Injectable()
export class EventRepositoryAdapter implements EventRepository {

  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
    @Inject(EventEntityConverter)
    private readonly converter: Converter<Event, EventEntity>
  ) {}

  async findByIdAndUser(id: number, actionUserId: number): Promise<Event | null> {
    const entity = await this.eventRepository.createQueryBuilder('event')
      .innerJoinAndSelect('event.user', 'user')
      .where('event.id = :id', { id })
      .andWhere('user.id = :actionUserId', { actionUserId })
      .getOne()
    return entity ? this.converter.to(entity) : null
  }

  async findByUser(userId: number): Promise<Event[]> {
    const entities = await this.eventRepository.createQueryBuilder('event')
      .innerJoinAndSelect('event.user', 'user')
      .where('user.id = :uesrId', { userId })
      .getMany()
    return entities.map(entity => this.converter.to(entity))
  }

  async save(event: Event): Promise<Event> {
    const entity = this.converter.from(event)
    const savedEntity = await this.eventRepository.save(entity)
    return this.converter.to(savedEntity)
  }

  async remove(event: Event): Promise<Event> {
    const entity = this.converter.from(event)
    const removedEntity = await this.eventRepository.remove(entity)
    return this.converter.to(removedEntity)
  }

}
