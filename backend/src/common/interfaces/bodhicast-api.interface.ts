export interface Spot {
  id: number;
  latitude: number;
  longitude: number;
  spot_name: string;
  street_address: string;
}

export interface Forecast {
  id: number;
  location: string;
  time: string;
  valid_time: string;
  swh: number;
  perpw: number;
  dirpw: number;
  swell: number;
  swper: number;
  shww: number;
  mpww: number;
  wvdir: number;
  ws: number;
  wdir: number;
  distance: number;
}
