import { IsInt, Max, Min } from "class-validator";

export class SeriesDataItem {
  //  date!: Date;
  @IsInt()
  @Min(0)
  @Max(6)
  day!: number;

  am!: boolean;

  price!: string;
}

export class PredictionItem {
  pattern!: string;
  series!: SeriesDataItem[];
}

export class PredictionDto {
  min!: PredictionItem;
  max!: PredictionItem;
  avg!: PredictionItem;
}
