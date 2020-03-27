import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export interface PriceRecordsDto {
  readonly id: string;
  readonly name: string;
  readonly swCode?: string;
  readonly price: number;
  readonly reportedAt: Date;
}

@Entity("priceRecords")
export class PriceRecordsEntity implements PriceRecordsDto {
  @PrimaryGeneratedColumn("uuid")
  id!: PriceRecordsDto["id"];

  @Column({ type: "text", nullable: false })
  name!: PriceRecordsDto["name"];

  @Column({ type: "text", nullable: true })
  swCode?: PriceRecordsDto["swCode"];

  @Column({ type: "numeric", nullable: false })
  price!: PriceRecordsDto["price"];

  @Column({ type: "timestamp", nullable: false })
  reportedAt!: Date;
}
