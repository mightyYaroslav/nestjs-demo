import { Inject, Injectable, NotImplementedException } from '@nestjs/common'
import { EventResponse } from '../../data/output/EventResponse'
import { Converter } from '../../../../configuration/Converter'
import { UserResponseConverterType } from '../../../user/services/converters/UserResponseConverter'
import { UserResponse } from '../../../user/data/output/UserResponse'
import { User } from '../../../../domain/user/data/User'
import { Event } from '../../../../domain/event/data/Event'

@Injectable()
export class EventResponseConverter implements Converter<Event, EventResponse> {

  constructor(
    @Inject(UserResponseConverterType)
    private readonly userResponseConverter: Converter<User, UserResponse>
  ) {}

  from(from: Event): EventResponse {
    return EventResponse.fromObject({ ...from, user: this.userResponseConverter.from(from.user) })
  }

  to(to: EventResponse): Event {
    throw new NotImplementedException('Cannot be implemented')
  }
}

const EventResponseConverterType = Symbol.for('EventResponseConverter')
export { EventResponseConverterType }
