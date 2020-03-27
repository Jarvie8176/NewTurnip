import { ProfileSettings } from "@turnip-market/dtos";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UsersDto, UsersEntity } from "../users/users.entity";

export interface ProfilesDto {
  readonly id: string;
  readonly userId: UsersDto["id"];
  readonly settings: ProfileSettings.Type;
}

@Entity("profiles")
export class ProfilesEntity implements ProfilesDto {
  @PrimaryGeneratedColumn("uuid")
  id!: ProfilesDto["id"];

  @OneToOne(() => UsersEntity, (user) => user.id, { primary: true, nullable: false })
  userId!: ProfilesDto["userId"];

  @Column({ type: "jsonb", nullable: false })
  settings!: ProfilesDto["settings"];
}
