import { EventResponse } from '../data/output/EventResponse'

export interface EventRemovingService {
  remove(eventId: number, actionUserId: number): Promise<EventResponse>
}

const EventRemovingServiceType = Symbol.for('EventRemovingService')
export { EventRemovingServiceType }
