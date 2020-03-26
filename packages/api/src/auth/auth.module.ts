import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeConfigModule } from "../config/typed-config-module";
import { TypedConfigService } from "../config/typed-config.service";
import { UsersModule } from "../users/users.module";
import { UsersService } from "../users/users.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { LocalAuthStrategy } from "./local-auth.strategy";

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [TypeConfigModule],
      useFactory: async (typeConfigService: TypedConfigService) => {
        const { config } = typeConfigService;
        return {
          secret: config.JWT_SECRET,
          signOptions: {
            expiresIn: config.JWT_EXPIRESIN,
          },
        };
      },
      inject: [TypedConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [UsersService, AuthService, LocalAuthStrategy],
})
export class AuthModule {}
