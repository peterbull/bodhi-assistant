import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';
import { Spot, Forecast } from 'src/common/interfaces/bodhicast-api.interface';

@Injectable()
export class BodhicastProxyService {
  static bodhiApiUrlBase = 'https://api.bodhicast.com';

  async fetchBodhicastApiSpec() {
    const res = await fetch(
      `${BodhicastProxyService.bodhiApiUrlBase}/openapi.json`,
    );
    const data = await res.json();
    return data;
  }

  async getSpots(): Promise<Spot[]> {
    const res = await fetch(`${BodhicastProxyService.bodhiApiUrlBase}/spots`);
    const data: Spot[] = await res.json();
    return data;
  }

  async getForecastBySpot(date: string, spot: Spot) {
    const res = await fetch(
      `${BodhicastProxyService.bodhiApiUrlBase}/forecasts/nearest/${date}/${spot.latitude}/${spot.longitude}`,
    );
    const data: Forecast[] = await res.json();
    return data;
  }
}
