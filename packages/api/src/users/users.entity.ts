import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UsersDto } from "./users.interface";

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
