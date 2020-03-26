require("./init");
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const port = 4000;
  await app.listen(port);
  console.log(`server listening on ${port}`);
}

bootstrap().catch(console.error);
