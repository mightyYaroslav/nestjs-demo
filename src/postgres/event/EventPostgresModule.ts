import { Module } from '@nestjs/common'
import { EventEntityConverter, EventEntityConverterType } from './services/converters/EventEntityConverter'
import { EventRepositoryAdapter } from './services/EventRepositoryAdapter'
import { EventRepositoryType } from '../../application/event/ports/EventRepository'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EventEntity } from './data/EventEntity'
import { UserPostgresModule } from '../user/UserPostgresModule'

@Module({
  imports: [TypeOrmModule.forFeature([EventEntity]), UserPostgresModule],
  providers: [{
    provide: EventEntityConverterType,
    useClass: EventEntityConverter
  }, {
    provide: EventRepositoryType,
    useClass: EventRepositoryAdapter
  }],
  exports: [EventEntityConverterType, EventRepositoryType]
})
export class EventPostgresModule {}
