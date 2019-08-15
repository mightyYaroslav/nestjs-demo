import { Module } from '@nestjs/common'
import { EventResponseConverter, EventResponseConverterType } from './services/converters/EventResponseConverter'
import { EventQueryServiceType } from './services/EventQueryService'
import { EventQueryServiceImpl } from './services/impl/EventQueryServiceImpl'
import { EventPostgresModule } from '../../postgres/event/EventPostgresModule'
import { EventCreationServiceType } from './services/EventCreationService'
import { EventCreationServiceImpl } from './services/impl/EventCreationServiceImpl'
import { EventRemovingServiceType } from './services/EventRemovingService'
import { EventRemovingServiceImpl } from './services/impl/EventRemovingServiceImpl'

@Module({
  imports: [
    EventPostgresModule
  ],
  providers: [{
    provide: EventResponseConverterType,
    useClass: EventResponseConverter
  }, {
    provide: EventQueryServiceType,
    useClass: EventQueryServiceImpl
  }, {
    provide: EventCreationServiceType,
    useClass: EventCreationServiceImpl
  }, {
    provide: EventRemovingServiceType,
    useClass: EventRemovingServiceImpl
  }]
})
export class EventApplicationModule {}
