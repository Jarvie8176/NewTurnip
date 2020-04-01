import { Module } from "@nestjs/common";
import { ProfilesModuleMetadata } from "./profiles.module.meta";

@Module(ProfilesModuleMetadata)
export class ProfilesModule {}
