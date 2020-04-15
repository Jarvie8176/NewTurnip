import { RoomQueue } from "./queue.class";

export class TurnipExchangeRoomAttributes {
  price!: string;
  dodoCode!: string;
  notes!: string | null;
  maxCapacity!: number;
}

export class TurnipExchangeRoom {
  id!: string;
  type!: string;
  attributes!: TurnipExchangeRoomAttributes;
  queueId!: string;
}

export class TurnipExchangeRoomInfo {
  id!: string;
  type!: string;
  attributes!: TurnipExchangeRoomAttributes;
  queue!: RoomQueue;
}
