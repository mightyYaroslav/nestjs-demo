import { ForbiddenException, HttpException, Inject, Injectable } from '@nestjs/common'
import { EventCreationService } from '../EventCreationService'
import { EventResponse } from '../../data/output/EventResponse'
import { CreateEventInput } from '../../data/input/CreateEventInput'
import { EventResponseConverterType } from '../converters/EventResponseConverter'
import { Converter } from '../../../../configuration/Converter'
import { EventRepository, EventRepositoryType } from '../../ports/EventRepository'
import { Event } from '../../../../domain/event/data/Event'
import { UserRepository, UserRepositoryType } from '../../../user/ports/UserRepository'

@Injectable()
export class EventCreationServiceImpl implements EventCreationService {

  constructor(
    @Inject(EventResponseConverterType)
    private readonly eventConverter: Converter<Event, EventResponse>,
    @Inject(EventRepositoryType)
    private readonly eventRepository: EventRepository,
    @Inject(UserRepositoryType)
    private readonly userRepository: UserRepository
  ) {}

  async createEvent(input: CreateEventInput, actionUserId: number): Promise<EventResponse> {
    const user = await this.userRepository.findById(actionUserId)
    if (!user) {
      throw new ForbiddenException()
    }
    const event = Event.fromObject({
      name: input.name,
      description: input.description,
      user
    })
    const savedEvent = await this.eventRepository.save(event)
    return this.eventConverter.from(savedEvent)
  }
}
