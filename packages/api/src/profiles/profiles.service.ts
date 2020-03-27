import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ValidatedUser } from "../users/users.entity";
import { ProfilesDto, ProfilesEntity } from "./profiles.entity";

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(ProfilesEntity)
    private readonly profilesRepository: Repository<ProfilesEntity>
  ) {}

  async getByUser(user: ValidatedUser.Type): Promise<ProfilesDto | undefined> {
    return this.profilesRepository.findOne({
      where: { userId: user.id },
    });
  }
}
