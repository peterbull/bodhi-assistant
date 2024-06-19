import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import OpenAI from 'openai';
import Instructor from '@instructor-ai/instructor';
import { z } from 'zod';

dotenv.config();
const TargetSpot = z.object({
  date: z.number().describe('date formatted as YYYYMMDD'),
  lon: z.number(),
  lat: z.number(),
});

@Injectable()
export class AgentService {
  static openai = new OpenAI();
  static client = Instructor({ client: AgentService.openai, mode: 'TOOLS' });

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

  async extractSpot(query: string) {
    const res = await AgentService.client.chat.completions.create({
      messages: [{ role: 'user', content: query }],
      model: 'gpt-3.5-turbo-0125',
      response_model: {
        schema: TargetSpot,
        name: 'Target',
      },
    });
    return res;
  }
}
