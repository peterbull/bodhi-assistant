import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import OpenAI from 'openai';
import { Spot } from 'src/common/interfaces/bodhicast-api.interface';

dotenv.config();

@Injectable()
export class AgentService {
  static openai = new OpenAI();

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

  async getSpots(): Promise<Spot[]> {
    const res = await fetch('https://api.bodhicast.com/spots');
    const data: Spot[] = await res.json();
    return data;
  }
}
