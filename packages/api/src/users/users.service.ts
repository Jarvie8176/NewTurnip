import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUser } from "@turnip-market/dtos";
import { genSalt, hash } from "bcrypt";
import { Repository } from "typeorm";
import { EntityEnums } from "../utils/enums";
import { UsersEntity } from "./users.entity";
import _ = require("lodash");

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>
  ) {}

  async create(input: CreateUser.Request.Type): Promise<UsersEntity> {
    const { username, password, email } = input;
    const encryptedPassword = await UsersService.EncryptPassword(password);

    const user = this.usersRepository.create({ username, email, password: encryptedPassword });

    const duplicateRecordIndices = [EntityEnums.UsersEntityUniqueEmailIdx, EntityEnums.UsersEntityUniqueUsernameIdx];

    await this.usersRepository.save(user).catch((err) => {
      if (_.includes(duplicateRecordIndices, err.constraint))
        throw new ConflictException("username or email already exists");
      throw err;
    });

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
