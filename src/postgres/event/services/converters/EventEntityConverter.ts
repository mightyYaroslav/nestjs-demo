import { EventEntity } from '../../data/EventEntity'
import { Converter } from '../../../../configuration/Converter'
import { Event } from '../../../../domain/event/data/Event'
import { Injectable } from '@nestjs/common'

@Injectable()
export class EventEntityConverter implements Converter<Event, EventEntity> {
  from(from: Event): EventEntity {
    return EventEntity.fromObject({ ...from })
  }

  to(to: EventEntity): Event {
    return Event.fromObject({ ...to })
  }

}

const EventEntityConverterType = Symbol.for('EventEntityConverter')
export { EventEntityConverterType }
