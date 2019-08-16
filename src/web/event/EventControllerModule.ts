import { Module } from '@nestjs/common'
import { EventController } from './controllers/EventController'
import { EventApplicationModule } from '../../application/event/EventApplicationModule'

@Module({
  imports: [EventApplicationModule],
  controllers: [EventController]
})

export class EventControllerModule {}
