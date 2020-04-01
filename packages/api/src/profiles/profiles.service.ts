import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UsersEntity } from "../users/users.entity";
import { ValidatedUser } from "../users/users.interface";
import { UserProfile } from "./dtos/userProfiles.dto";
import { ProfilesEntity } from "./profiles.entity";

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(ProfilesEntity)
    private readonly profilesRepository: Repository<ProfilesEntity>,

    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>
  ) {}

  async getByUser(user: ValidatedUser.Type): Promise<UserProfile | undefined> {
    const data = await this.profilesRepository
      .createQueryBuilder("profile")
      .innerJoinAndSelect("profile.user", "users")
      .where("users.id = :id", { id: user.id })
      .getOne();

    if (!data) throw new NotFoundException();

    return {
      userId: data.user.id,
      profile: {
        id: data.id,
        settings: data.settings,
      },
    };
  }

  async replaceUserProfile(userIdentifier: ValidatedUser.Type, settings: ProfilesEntity["settings"]): Promise<void> {
    // fixme: should do a proper upsert, for now just select-then-update to keep things simple
    const existingProfile = await this.profilesRepository.findOne({ user: { id: userIdentifier.id } });

    if (existingProfile) {
      await this.profilesRepository.update({ id: existingProfile.id }, { settings });
      return;
    }

    const user = await this.usersRepository.findOne({ id: userIdentifier.id });
    if (!user) throw new BadRequestException("user not found");

    const newProfile = new ProfilesEntity();
    newProfile.user = user;
    newProfile.settings = settings;
    await this.profilesRepository.save(newProfile);
    return;
  }
}
