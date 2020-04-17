import { Login } from "@turnip-market/dtos";

class LoginPayload {
  accessToken!: string;
}

export class LoginDto implements Login.Response.Type {
  data!: LoginPayload;
}
