import { Module } from '@nestjs/common'
import { EventEntityConverter, EventEntityConverterType } from './services/converters/EventEntityConverter'
import { EventRepositoryAdapter } from './services/EventRepositoryAdapter'
import { EventRepositoryType } from '../../application/event/ports/EventRepository'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EventEntity } from './data/EventEntity'

@Module({
  imports: [TypeOrmModule.forFeature([EventEntity])],
  providers: [{
    provide: EventEntityConverterType,
    useClass: EventEntityConverter
  }, {
    provide: EventRepositoryType,
    useClass: EventRepositoryAdapter
  }]
})
export class EventPostgresModule {}
