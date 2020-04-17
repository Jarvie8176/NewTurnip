import { Injectable } from "@nestjs/common";
import { MakePredictionDto } from "./dtos/makePrediction.dto";
import { PredictionItem } from "./dtos/prediction.dto";

@Injectable()
export class PredictionsService {
  predict(_input: string[]): MakePredictionDto["data"] {
    // todo: replace with real predictions
    return {
      min: PredictionsService.MakeStubPrediction(),
      max: PredictionsService.MakeStubPrediction(),
      avg: PredictionsService.MakeStubPrediction(),
    };
  }

  private static GetRandomPrice(): string {
    return String(100 + Math.floor(Math.random() * 50));
  }

  private static MakeStubPrediction(): PredictionItem {
    return {
      pattern: "pattern stub",
      series: [
        { day: 0, am: true, price: PredictionsService.GetRandomPrice() },
        { day: 0, am: false, price: PredictionsService.GetRandomPrice() },
        { day: 1, am: true, price: PredictionsService.GetRandomPrice() },
        { day: 1, am: false, price: PredictionsService.GetRandomPrice() },
        { day: 2, am: true, price: PredictionsService.GetRandomPrice() },
        { day: 2, am: false, price: PredictionsService.GetRandomPrice() },
        { day: 3, am: true, price: PredictionsService.GetRandomPrice() },
        { day: 3, am: false, price: PredictionsService.GetRandomPrice() },
        { day: 4, am: true, price: PredictionsService.GetRandomPrice() },
        { day: 4, am: false, price: PredictionsService.GetRandomPrice() },
        { day: 5, am: true, price: PredictionsService.GetRandomPrice() },
        { day: 5, am: false, price: PredictionsService.GetRandomPrice() },
      ],
    };
  }
}
