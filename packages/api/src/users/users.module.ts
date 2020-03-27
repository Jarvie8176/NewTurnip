import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersEntity } from "./users.entity";
import { UsersService } from "./users.service";

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  controllers: [],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
