import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypedConfigModule } from "../config/typed-config.module";
import { TypedConfigService } from "../config/typed-config.service";
import { ProfilesModule } from "../profiles/profiles.module";
import { UsersEntity } from "../users/users.entity";
import { UsersModule } from "../users/users.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt-auth.strategy";
import { LocalAuthStrategy } from "./local-auth.strategy";

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity]),
    UsersModule,
    PassportModule,
    ProfilesModule,
    TypedConfigModule,
    JwtModule.registerAsync({
      imports: [TypedConfigModule],
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
  providers: [AuthService, LocalAuthStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
