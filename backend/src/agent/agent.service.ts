import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as path from 'path';
import OpenAI from 'openai';

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
}
