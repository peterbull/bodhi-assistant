import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';

@Injectable()
export class BodhicastProxyService {
  async fetchBodhicastApiSpec() {
    const res = await fetch('https://api.bodhicast.com/openapi.json');
    const data = await res.json();
    return data;
  }
}
