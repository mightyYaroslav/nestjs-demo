import { Body, Controller, Delete, Get, Inject, Param, Post, Request } from '@nestjs/common'
import { ApiBearerAuth, ApiResponse, ApiUseTags } from '@nestjs/swagger'
import { EventResponse } from '../../../application/event/data/output/EventResponse'
import { EventCreationService, EventCreationServiceType } from '../../../application/event/services/EventCreationService'
import { EventQueryService, EventQueryServiceType } from '../../../application/event/services/EventQueryService'
import { EventRemovingService, EventRemovingServiceType } from '../../../application/event/services/EventRemovingService'
import { CreateEventInput } from '../../../application/event/data/input/CreateEventInput'

@ApiUseTags('event')
@ApiBearerAuth()
@Controller('event')
export class EventController {

  constructor(
    @Inject(EventCreationServiceType)
    private readonly eventCreationService: EventCreationService,
    @Inject(EventQueryServiceType)
    private readonly eventQueryService: EventQueryService,
    @Inject(EventRemovingServiceType)
    private readonly eventRemovingService: EventRemovingService
  ) {}

  @Post()
  @ApiResponse({ status: 200, type: EventResponse })
  async createEvent(
    @Request() req,
    @Body() input: CreateEventInput
  ): Promise<EventResponse> {
    return this.eventCreationService.createEvent(input, req.user.id)
  }

  @Get('all')
  @ApiResponse({ status: 200, type: EventResponse, isArray: true })
  async getAllEvents(@Request() req): Promise<EventResponse[]> {
    return this.eventQueryService.getByUser(req.user.id)
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: EventResponse })
  async getById(
    @Request() req,
    @Param('id') eventId: number
  ): Promise<EventResponse> {
    return this.eventQueryService.getById(eventId, req.user.id)
  }

  @Delete(':id')
  @ApiResponse({ status: 200, type: EventResponse })
  async deleteEvent(
    @Request() req,
    @Param('id') eventId: number
  ): Promise<EventResponse> {
    return await this.eventRemovingService.remove(eventId, req.user.id)
  }
}
