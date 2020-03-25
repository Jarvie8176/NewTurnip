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
  id!: string;

  @Column({ type: "text", nullable: false })
  name!: string;

  @Column({ type: "text", nullable: true })
  swCode?: string;

  @Column({ type: "numeric", nullable: false })
  price!: number;

  @Column({ type: "timestamp", nullable: false })
  reportedAt!: Date;
}
