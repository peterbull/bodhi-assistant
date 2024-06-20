import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';
import { Spot, Forecast } from 'src/common/interfaces/bodhicast-api.interface';
import { BODHICAST_API_URL_BASE } from 'src/config';

@Injectable()
export class BodhicastProxyService {
  async fetchBodhicastApiSpec() {
    const res = await fetch(`${BODHICAST_API_URL_BASE}/openapi.json`);
    const data = await res.json();
    return data;
  }

  async getSpots(): Promise<Spot[]> {
    const res = await fetch(`${BODHICAST_API_URL_BASE}/spots`);
    const data: Spot[] = await res.json();
    return data;
  }

  async getForecastBySpot(date: string, lat: number, lon: number) {
    const res = await fetch(
      `${BODHICAST_API_URL_BASE}/forecasts/nearest/${date}/${lat}/${lon}`,
    );
    const data: Forecast[] = await res.json();
    return data;
  }
}
