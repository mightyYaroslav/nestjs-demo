import { EventEntity } from '../../data/EventEntity'
import { Converter } from '../../../../configuration/Converter'
import { Event } from '../../../../domain/event/data/Event'
import { Inject, Injectable } from '@nestjs/common'
import { UserEntityConverterType } from '../../../user/services/converters/UserEntityConverter'
import { UserEntity } from '../../../user/data/UserEntity'
import { User } from '../../../../domain/user/data/User'

@Injectable()
export class EventEntityConverter implements Converter<Event, EventEntity> {

  constructor(
    @Inject(UserEntityConverterType)
    private readonly userConverter: Converter<User, UserEntity>
  ) {}

  from(from: Event): EventEntity {
    return EventEntity.fromObject({ ...from, user: this.userConverter.from(from.user) })
  }

  to(to: EventEntity): Event {
    return Event.fromObject({ ...to })
  }

}

const EventEntityConverterType = Symbol.for('EventEntityConverter')
export { EventEntityConverterType }
