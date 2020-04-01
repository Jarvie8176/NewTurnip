import { ModuleMetadata } from "@nestjs/common/interfaces/modules/module-metadata.interface";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersEntity } from "../users/users.entity";
import { ProfilesController } from "./profiles.controller";
import { ProfilesEntity } from "./profiles.entity";
import { ProfilesService } from "./profiles.service";

export const ProfilesModuleMetadata: ModuleMetadata = {
  imports: [TypeOrmModule.forFeature([UsersEntity, ProfilesEntity])],
  providers: [ProfilesService],
  controllers: [ProfilesController],
};
