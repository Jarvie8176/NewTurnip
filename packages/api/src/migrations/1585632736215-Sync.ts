import { MigrationInterface, QueryRunner } from "typeorm";

export class Sync1585632736215 implements MigrationInterface {
  name = "Sync1585632736215";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "priceRecords" ADD "playerName" text`);
    await queryRunner.query(`ALTER TABLE "priceRecords" ADD "islandName" text`);
    await queryRunner.query(`UPDATE "priceRecords" SET "playerName" = "name"`);
    await queryRunner.query(`UPDATE "priceRecords" SET "islandName" = ''`);
    await queryRunner.query(`ALTER TABLE "priceRecords" ALTER COLUMN "playerName" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "priceRecords" ALTER COLUMN "playerName" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "priceRecords" DROP COLUMN "name"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "priceRecords" ADD "name" text`, undefined);
    await queryRunner.query(`UPDATE "priceRecords" SET "name" = "playerName"`);
    await queryRunner.query(`ALTER TABLE "priceRecords" ALTER COLUMN "name" NOT NULL`);
    await queryRunner.query(`ALTER TABLE "priceRecords" DROP COLUMN "islandName"`, undefined);
    await queryRunner.query(`ALTER TABLE "priceRecords" DROP COLUMN "playerName"`, undefined);
  }
}
