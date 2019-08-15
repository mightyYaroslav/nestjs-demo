import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { EventQueryService } from '../EventQueryService'
import { EventResponse } from '../../data/output/EventResponse'
import { EventResponseConverterType } from '../converters/EventResponseConverter'
import { Converter } from '../../../../configuration/Converter'
import { EventRepository, EventRepositoryType } from '../../ports/EventRepository'

@Injectable()
export class EventQueryServiceImpl implements EventQueryService {

  constructor(
    @Inject(EventResponseConverterType)
    private readonly responseConverter: Converter<Event, EventResponse>,
    @Inject(EventRepositoryType)
    private readonly eventRepository: EventRepository
  ) {}

  async getById(eventId: number, actionUserId: number): Promise<EventResponse> {
    const event = await this.eventRepository.findByIdAndUser(eventId, actionUserId)
    if (!event) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
    }
    return this.responseConverter.from(event)
  }

  async getByUser(userId: number): Promise<EventResponse[]> {
    const events = await this.eventRepository.findByUser(userId)
    return events.map(event => this.responseConverter.from(event))
  }

}
