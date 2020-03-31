import { ApiExtraModels } from "@nestjs/swagger";
import { Login } from "@turnip-market/dtos";

@ApiExtraModels()
class LoginPayload {
  accessToken!: string;
}

@ApiExtraModels()
export class LoginDto implements Login.Response.Type {
  data!: LoginPayload;
}
