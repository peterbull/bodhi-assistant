import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import OpenAI from 'openai';
import Instructor from '@instructor-ai/instructor';
import { z } from 'zod';
import { getCurrentDate } from 'src/utils/utils';
import { BODHICAST_API_URL_BASE } from 'src/config';
import { BodhicastProxyService } from 'src/bodhicast-proxy/bodhicast-proxy.service';
import { Forecast } from 'src/common/interfaces/bodhicast-api.interface';

dotenv.config();

const TargetSpotSchema = z.object({
  date: z.number().describe('date formatted as YYYYMMDD'),
  lon: z.number(),
  lat: z.number(),
  _meta: z.any().optional(),
});

type TargetSpot = z.infer<typeof TargetSpotSchema>;

@Injectable()
export class AgentService {
  static openai = new OpenAI();
  static client = Instructor({ client: AgentService.openai, mode: 'TOOLS' });

  constructor(private bodhicastProxyService: BodhicastProxyService) {}

  breakpoint() {
    return 'break';
  }

  async chatCompletion(query: string) {
    const res = await AgentService.openai.chat.completions.create({
      messages: [{ role: 'user', content: query }],
      model: 'gpt-3.5-turbo-0125',
    });
    return res.choices[0];
  }

  async extractSpot(query: string): Promise<TargetSpot> {
    const res = await AgentService.client.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: `Today's date is ${getCurrentDate()}, ${query}`,
        },
      ],
      model: 'gpt-3.5-turbo-0125',
      response_model: {
        schema: TargetSpotSchema,
        name: 'Target',
      },
    });
    const parsed = await TargetSpotSchema.safeParseAsync(res);

    if (!parsed.success) {
      throw new Error('Response does not match TargetSpot schema');
    }

    return parsed.data;
  }
  /**
   *
   * @param query provide some of the json from extract spot along with a request `get me the 1st street jetty forecast`
   * @returns
   */
  async getSpotForecast(query: string): Promise<Forecast[]> {
    const { date, lat, lon } = await this.extractSpot(query);
    const forecast = await this.bodhicastProxyService.getForecastBySpot(
      date,
      lat,
      lon,
    );
    return forecast;
  }
}
