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

  @Get('spots')
  getSpots() {
    return this.agentService.getSpots();
  }

  @Post('query')
  @ApiBody({ type: CreateQueryDto })
  getChatCompletion(@Body('query') query: string) {
    return this.agentService.chatCompletion(query);
  }
}
