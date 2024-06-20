import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiProperty } from '@nestjs/swagger';
import { AgentService } from './agent.service';

class CreateQueryDto {
  @ApiProperty()
  query: string;
}

@Controller('agent')
export class AgentController {
  constructor(private readonly agentService: AgentService) {}

  @Get()
  getBreakpoint() {
    return this.agentService.breakpoint();
  }

  @Post('query')
  @ApiBody({ type: CreateQueryDto })
  getChatCompletion(@Body('query') query: string) {
    return this.agentService.chatCompletion(query);
  }

  @Post('extract_spots')
  @ApiBody({ type: CreateQueryDto })
  extractSpot(@Body('query') query: string) {
    return this.agentService.extractSpot(query);
  }

  @Post('extract_and_fetch_forecast')
  @ApiBody({ type: CreateQueryDto })
  extractAndFetchForecast(@Body('query') query: string) {
    return this.agentService.getSpotForecast(query);
  }
}
