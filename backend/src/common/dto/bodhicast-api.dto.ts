import { ApiBody, ApiProperty } from "@nestjs/swagger";
import { getCurrentDate } from "src/utils/utils";

export class SpotDto {
  @ApiProperty({
    description: "The date of the forecast as `YYYYMMDD`",
    default: getCurrentDate(),
  })
  date: number;

  @ApiProperty({
    description: "Latitude of the spot",
    default: 36.83036135089083,
  })
  latitude: number;

  @ApiProperty({ description: "Longitude of the spot", default: -75.96648 })
  longitude: number;
}

export class CreateQueryDto {
  @ApiProperty()
  query: string;
}
