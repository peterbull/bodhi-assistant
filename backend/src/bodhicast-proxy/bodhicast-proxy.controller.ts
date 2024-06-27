import { Body, Controller, Get, Post } from "@nestjs/common";
import { BodhicastProxyService } from "./bodhicast-proxy.service";
import { Spot } from "src/common/interfaces/bodhicast-api.interface";
import { getCurrentDate } from "src/utils/utils";
import { ApiBody, ApiProperty } from "@nestjs/swagger";
import { CreateQueryDto, SpotDto } from "src/common/dto/bodhicast-api.dto";

@Controller("bodhicast-proxy")
export class BodhicastProxyController {
  constructor(private readonly bodhicastProxyService: BodhicastProxyService) {}

  @Get()
  getApiSpec() {
    return this.bodhicastProxyService.fetchBodhicastApiSpec();
  }

  @Get("spots")
  getSpots() {
    return this.bodhicastProxyService.getSpots();
  }

  @Post("forecast_by_spot")
  @ApiBody({ type: SpotDto })
  getForecastBySpot(@Body() spot: SpotDto) {
    return this.bodhicastProxyService.getForecastBySpot(
      spot.date,
      spot.latitude,
      spot.longitude,
    );
  }

  @Post("search_spots")
  @ApiBody({ type: CreateQueryDto })
  searchSpots(@Body("query") query: string) {
    return this.bodhicastProxyService.searchSpots(query);
  }
}
