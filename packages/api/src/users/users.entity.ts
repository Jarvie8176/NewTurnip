import { User } from "@turnip-market/dtos";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

interface UsersDto extends User.Type {
  id: string;
  username: string;
  password: string;
  email: string;
}

export type ValidatedUser = Omit<UsersDto, "password">;

@Entity("users")
export class UsersEntity implements UsersDto {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "text", nullable: false })
  username!: string;

  @Column({ type: "text", nullable: false })
  password!: string;

  @Column({ type: "text", nullable: false })
  email!: string;
}
