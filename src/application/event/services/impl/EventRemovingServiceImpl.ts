import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { EventRemovingService } from '../EventRemovingService'
import { EventRepository, EventRepositoryType } from '../../ports/EventRepository'
import { EventResponseConverterType } from '../converters/EventResponseConverter'
import { EventResponse } from '../../data/output/EventResponse'
import { Converter } from '../../../../configuration/Converter'
import { Event } from '../../../../domain/event/data/Event'

@Injectable()
export class EventRemovingServiceImpl implements EventRemovingService {

  constructor(
    @Inject(EventRepositoryType)
    private readonly eventRepository: EventRepository,
    @Inject(EventResponseConverterType)
    private readonly eventConverter: Converter<Event, EventResponse>
  ) {}

  async remove(eventId: number, actionUserId: number): Promise<EventResponse> {
    const eventToRemove = await this.eventRepository.findByIdAndUser(eventId, actionUserId)
    if (!eventToRemove) {
      throw new NotFoundException()
    }
    const removedEvent = await this.eventRepository.remove(eventToRemove)
    return this.eventConverter.to(removedEvent)
  }
}
