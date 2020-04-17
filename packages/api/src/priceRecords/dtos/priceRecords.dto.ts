// fixme: type doesn't match actual entity?
export class PriceRecordsDto {
  id!: string;
  playerName!: string;
  islandName!: string;
  swCode!: string | null;
  price!: string;
  reportedAt!: Date;
  timeOffsetInMinutes!: string | null;
}
