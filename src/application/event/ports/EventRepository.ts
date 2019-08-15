import { Event } from '../../../domain/event/data/Event'

export interface EventRepository {
  findByIdAndUser(id: number, actionUserId: number): Promise<Event | null>

  findByUser(userId: number): Promise<Event[]>

  save(event: Event): Promise<Event>

  remove(event: Event): Promise<Event>
}

const EventRepositoryType = Symbol.for('EventRepository')
export { EventRepositoryType }
