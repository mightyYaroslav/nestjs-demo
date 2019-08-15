import { CreateEventInput } from '../data/input/CreateEventInput'
import { EventResponse } from '../data/output/EventResponse'

export interface EventCreationService {
  createEvent(input: CreateEventInput, actionUserId: number): Promise<EventResponse>;
}

const EventCreationServiceType = Symbol.for('EventCreationService')
export { EventCreationServiceType }
