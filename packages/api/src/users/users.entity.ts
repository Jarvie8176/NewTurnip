import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import t = require("io-ts");

export interface UsersDto {
  id: string;
  username: string;
  password: string;
  email: string;
}

export namespace ValidatedUser {
  export const dto = t.interface({
    id: t.string,
  });
  export type Type = t.TypeOf<typeof dto>;
}

@Entity("users")
export class UsersEntity implements UsersDto {
  @PrimaryGeneratedColumn("uuid")
  id!: UsersDto["id"];

  @Column({ type: "text", nullable: false })
  username!: UsersDto["username"];

  @Column({ type: "text", nullable: false })
  password!: UsersDto["password"];

  @Column({ type: "text", nullable: false })
  email!: UsersDto["email"];
}
