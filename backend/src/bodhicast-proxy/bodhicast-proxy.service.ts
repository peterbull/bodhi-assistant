import { Injectable } from "@nestjs/common";
import fetch from "node-fetch";
import { Forecast, Spot } from "src/common/interfaces/bodhicast-api.interface";
import { BODHICAST_API_URL_BASE } from "src/config";

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

  async getForecastBySpot(date: number, lat: number, lon: number) {
    const res = await fetch(
      `${BODHICAST_API_URL_BASE}/forecasts/nearest/${date}/${lat}/${lon}`,
    );
    const data: Forecast[] = await res.json();
    return data;
  }

  async searchSpots(query: string): Promise<Spot[]> {
    const spots = await this.getSpots();
    const filteredSpots = spots.filter((spot: Spot) =>
      spot.spot_name.toLowerCase().includes(query) ||
      spot.street_address.toLowerCase().includes(query)
    );
    return filteredSpots;
  }
}
