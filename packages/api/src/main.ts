require("./init");
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as helmet from "helmet";
import { AppModule } from "./app.module";
import { TypedConfigService } from "./config/typed-config.service";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(helmet());

  const { PORT, API_DESCRIPTION } = app.get<TypedConfigService>(TypedConfigService).config;

  // api doc
  const options = new DocumentBuilder()
    .setTitle("TurnipMarket")
    .setDescription(API_DESCRIPTION)
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("/docs", app, document);

  const port = PORT;
  await app.listen(port);

  console.log(`server listening on ${port}`);
}

bootstrap().catch(console.error);
