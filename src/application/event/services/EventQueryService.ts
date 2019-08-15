import { EventResponse } from '../data/output/EventResponse'

export interface EventQueryService {
  getById(eventId: number, actionUserId: number): Promise<EventResponse>
  getByUser(userId: number): Promise<EventResponse[]>
}

const EventQueryServiceType = Symbol.for('EventQueryService')
export { EventQueryServiceType }
