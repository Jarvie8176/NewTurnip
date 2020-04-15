import { CreateDateColumn, UpdateDateColumn } from "typeorm";

export abstract class TimestampedEntity {
  @CreateDateColumn({
    type: "timestamp with time zone",
    nullable: false,
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: "timestamp with time zone",
    nullable: false,
  })
  updatedAt!: Date;
}
