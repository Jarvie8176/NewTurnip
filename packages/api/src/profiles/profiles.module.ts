import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "../auth/auth.module";
import { UsersEntity } from "../users/users.entity";
import { ProfilesController } from "./profiles.controller";
import { ProfilesEntity } from "./profiles.entity";
import { ProfilesService } from "./profiles.service";

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([UsersEntity, ProfilesEntity])],
  providers: [ProfilesService],
  controllers: [ProfilesController],
})
export class ProfilesModule {}
