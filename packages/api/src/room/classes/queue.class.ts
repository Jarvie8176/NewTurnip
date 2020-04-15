export class RoomQueue {
  id!: string;
  population!: {
    max: number;
    waiting: number;
  };
  playersInQueue!: {
    profileId: string;
    playerName: string;
  }[];
}
