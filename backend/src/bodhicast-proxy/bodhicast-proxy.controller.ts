import { Body, Controller, Get, Post } from '@nestjs/common';
import { BodhicastProxyService } from './bodhicast-proxy.service';
import { Spot } from 'src/common/interfaces/bodhicast-api.interface';
import { ApiProperty, ApiBody } from '@nestjs/swagger';

const date = new Date();
const estDate = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  timeZone: 'America/New_York',
}).format(date);

const [month, day, year] = estDate.split('/');
const formattedDate = `${year}${month}${day}`;

class SpotDto implements Spot {
  @ApiProperty({
    description: 'The date of the forecast as `YYYYMMDD`',
    default: formattedDate,
  })
  date: string;

  @ApiProperty({ description: 'ID of the spot', default: 286 })
  id: number;

  @ApiProperty({
    description: 'Latitude of the spot',
    default: 36.83036135089083,
  })
  latitude: number;

  @ApiProperty({ description: 'Longitude of the spot', default: -75.96648 })
  longitude: number;

  @ApiProperty({ description: 'Name of the spot', default: '1st Street Jetty' })
  spot_name: string;

  @ApiProperty({
    description: 'Street address of the spot',
    default: 'Virginia Beach, Virginia',
  })
  street_address: string;
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
    const { date, ...Spot } = spot;
    return this.bodhicastProxyService.getForecastBySpot(date, Spot);
  }
}
