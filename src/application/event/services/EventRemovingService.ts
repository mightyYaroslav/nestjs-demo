import { Event } from '../../../domain/event/data/Event'

export interface EventRemovingService {
  remove(eventId: number, actionUserId: number): Promise<Event>
}

const EventRemovingServiceType = Symbol.for('EventRemovingService')
export { EventRemovingServiceType }
