import { Controller, Get, Query } from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { MakePredictionDto } from "./dtos/makePrediction.dto";
import { PredictionsService } from "./predictions.service";

@Controller()
@ApiTags("Predictions")
export class PredictionsController {
  constructor(private readonly predictionsService: PredictionsService) {}

  @Get()
  @ApiQuery({
    name: "input",
    description:
      "a comma-separated string of prices from Sunday to Saturday PM (max 13 items). Use empty string if data is missing",
  })
  predict(@Query("input") input: string): MakePredictionDto {
    const data = this.predictionsService.predict(input.split(","));
    return { data };
  }
}
