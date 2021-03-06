import { Column, Entity, Index, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProfilesEntity } from "../profiles/profiles.entity";
import { EntityEnums } from "../utils/enums";
import { TimestampedEntity } from "../utils/timestampedEntity";

@Entity("users")
export class UsersEntity extends TimestampedEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "text", nullable: false })
  @Index(EntityEnums.UsersEntityUniqueUsernameIdx, { unique: true })
  username!: string;

  @Column({ type: "text", nullable: false })
  password!: string;

  @Column({ type: "text", nullable: false })
  @Index(EntityEnums.UsersEntityUniqueEmailIdx, { unique: true })
  email!: string;

  @OneToMany(() => ProfilesEntity, (profile) => profile.user)
  @JoinColumn()
  profiles?: ProfilesEntity[];
}
