import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUser } from "@turnip-market/dtos";
import { genSalt, hash } from "bcrypt";
import { Repository } from "typeorm";
import { UsersEntity } from "./users.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>
  ) {}

  async create(input: CreateUser.Request.Type): Promise<UsersEntity> {
    const { username, password, email } = input;

    const user = this.usersRepository.create({
      username,
      email,
      password: await UsersService.EncryptPassword(password),
    });

    await this.usersRepository.save(user);
    return user;
  }

  async findOne(username: string): Promise<UsersEntity | undefined> {
    return await this.usersRepository.findOne({
      where: { username },
    });
  }

  private static async EncryptPassword(plainPassword: string): Promise<string> {
    const saltRounds = 10;
    const salt = await genSalt(saltRounds);
    return await hash(plainPassword, salt);
  }
}
