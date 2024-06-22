import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import OpenAI from 'openai';
import Instructor from '@instructor-ai/instructor';
import { z } from 'zod';
import { getCurrentDate } from 'src/utils/utils';
import { BodhicastProxyService } from 'src/bodhicast-proxy/bodhicast-proxy.service';
import { Forecast } from 'src/common/interfaces/bodhicast-api.interface';
import weaviate, { vectorizer, WeaviateClient } from 'weaviate-client';

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

  /**
   * Performs a chat completion using OpenAI's GPT-3.5 Turbo model.
   *
   * @param query - The user's query to be used for chat completion.
   * @returns A Promise that resolves to the completion response from OpenAI.
   */
  async chatCompletion(query: string) {
    const res = await AgentService.openai.chat.completions.create({
      messages: [{ role: 'user', content: query }],
      model: 'gpt-3.5-turbo-0125',
    });
    return res.choices[0];
  }

  /**
   * Extracts a target spot by sending a chat completion request to the AgentService client.
   * @param query - The query string to be included in the chat message.
   * @returns A Promise that resolves to the extracted TargetSpot.
   * @throws An error if the response does not match the TargetSpot schema.
   */
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
   * Retrieves the spot forecast based on the provided query.
   * @param query - The query string used to extract spot information.
   * @returns A promise that resolves to an array of Forecast objects.
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

  async connectToWeaviate(): Promise<WeaviateClient> {
    const weaviateClient = await weaviate.connectToWeaviateCloud(
      'http://weaviate:8080',
    );
    return weaviateClient;
  }
}
