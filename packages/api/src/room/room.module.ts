import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProfilesModule } from "../profiles/profiles.module";
import { ProfileJoinsRoomQueueEntity } from "./profileJoinsRoomQueue.entity";
import { QueueEntity } from "./queue.entity";
import { QueueService } from "./queue.service";
import { RoomController } from "./room.controller";
import { RoomEntity } from "./room.entity";
import { RoomService } from "./room.service";

@Module({
  imports: [ProfilesModule, TypeOrmModule.forFeature([RoomEntity, QueueEntity, ProfileJoinsRoomQueueEntity])],
  providers: [RoomService, QueueService],
  controllers: [RoomController],
  exports: [RoomService, QueueService],
})
export class RoomModule {}
