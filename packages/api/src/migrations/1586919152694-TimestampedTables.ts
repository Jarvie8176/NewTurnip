import { MigrationInterface, QueryRunner } from "typeorm";

export class TimestampedTables1586919152694 implements MigrationInterface {
  name = "TimestampedTables1586919152694";

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "priceRecords" DROP CONSTRAINT "FK_f97cf944d504ad13553864a79d5"`, undefined);
    await queryRunner.query(`ALTER TABLE "priceRecords" DROP COLUMN "reportedByUser"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "profiles" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "profiles" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "priceRecords" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "priceRecords" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
      undefined
    );
    await queryRunner.query(`ALTER TABLE "profiles" DROP CONSTRAINT "FK_315ecd98bd1a42dcf2ec4e2e985"`, undefined);
    await queryRunner.query(`ALTER TABLE "profiles" DROP CONSTRAINT "PK_0d28f355dbc74ba11b28e08734e"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "profiles" ADD CONSTRAINT "PK_8e520eb4da7dc01d0e190447c8e" PRIMARY KEY ("id")`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "profiles" ADD CONSTRAINT "FK_315ecd98bd1a42dcf2ec4e2e985" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "priceRecords" ADD CONSTRAINT "FK_9d0b139ff1b6df7219a18eebf22" FOREIGN KEY ("reportedById") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
      undefined
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "priceRecords" DROP CONSTRAINT "FK_9d0b139ff1b6df7219a18eebf22"`, undefined);
    await queryRunner.query(`ALTER TABLE "profiles" DROP CONSTRAINT "FK_315ecd98bd1a42dcf2ec4e2e985"`, undefined);
    await queryRunner.query(`ALTER TABLE "profiles" DROP CONSTRAINT "PK_8e520eb4da7dc01d0e190447c8e"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "profiles" ADD CONSTRAINT "PK_0d28f355dbc74ba11b28e08734e" PRIMARY KEY ("id", "userId")`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "profiles" ADD CONSTRAINT "FK_315ecd98bd1a42dcf2ec4e2e985" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
      undefined
    );
    await queryRunner.query(`ALTER TABLE "priceRecords" DROP COLUMN "updatedAt"`, undefined);
    await queryRunner.query(`ALTER TABLE "priceRecords" DROP COLUMN "createdAt"`, undefined);
    await queryRunner.query(`ALTER TABLE "profiles" DROP COLUMN "updatedAt"`, undefined);
    await queryRunner.query(`ALTER TABLE "profiles" DROP COLUMN "createdAt"`, undefined);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updatedAt"`, undefined);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "createdAt"`, undefined);
    await queryRunner.query(`ALTER TABLE "priceRecords" ADD "reportedByUser" uuid`, undefined);
    await queryRunner.query(
      `ALTER TABLE "priceRecords" ADD CONSTRAINT "FK_f97cf944d504ad13553864a79d5" FOREIGN KEY ("reportedById", "reportedByUser") REFERENCES "profiles"("id","userId") ON DELETE SET NULL ON UPDATE CASCADE`,
      undefined
    );
  }
}
