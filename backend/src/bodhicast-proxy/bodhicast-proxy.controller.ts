import { Body, Controller, Get, Post } from '@nestjs/common';
import { BodhicastProxyService } from './bodhicast-proxy.service';
import { Spot } from 'src/common/interfaces/bodhicast-api.interface';
import { ApiProperty, ApiBody } from '@nestjs/swagger';
import { getCurrentDate } from 'src/utils/utils';

class SpotDto {
  @ApiProperty({
    description: 'The date of the forecast as `YYYYMMDD`',
    default: getCurrentDate(),
  })
  date: string;

  @ApiProperty({
    description: 'Latitude of the spot',
    default: 36.83036135089083,
  })
  latitude: number;

  @ApiProperty({ description: 'Longitude of the spot', default: -75.96648 })
  longitude: number;
}

@Controller('bodhicast-proxy')
export class BodhicastProxyController {
  constructor(private readonly bodhicastProxyService: BodhicastProxyService) {}

  @Get()
  getApiSpec() {
    return this.bodhicastProxyService.fetchBodhicastApiSpec();
  }

  @Get('spots')
  getSpots() {
    return this.bodhicastProxyService.getSpots();
  }

  @Post('forecast_by_spot')
  @ApiBody({ type: SpotDto })
  getForecastBySpot(@Body() spot: SpotDto) {
    return this.bodhicastProxyService.getForecastBySpot(
      spot.date,
      spot.latitude,
      spot.longitude,
    );
  }
}
