import { Module } from "@nestjs/common";
import { PredictionsController } from "./predictions.controller";
import { PredictionsService } from "./predictions.service";

@Module({
  imports: [],
  controllers: [PredictionsController],
  providers: [PredictionsService],
  exports: [PredictionsService],
})
export class PredictionsModule {}
