import { makeUuid } from "@ansik/sdk/lib/utils";
import { Injectable } from "@nestjs/common";
import { UsersEntity } from "./users.entity";

export type User = any;

@Injectable()
export class UsersService {
  private readonly users: UsersEntity[];

  constructor() {
    this.users = [
      {
        id: makeUuid(),
        email: "foo",
        username: "john",
        password: "changeme",
      },
      {
        id: makeUuid(),
        email: "foo",
        username: "chris",
        password: "secret",
      },
      {
        id: makeUuid(),
        email: "foo",
        username: "maria",
        password: "guess",
      },
    ];
  }

  async findOne(username: string): Promise<UsersEntity | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
