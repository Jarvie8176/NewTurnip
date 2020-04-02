import { MigrationInterface, QueryRunner } from "typeorm";

export class LocalTimeOffset1585793908874 implements MigrationInterface {
  name = "LocalTimeOffset1585793908874";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_042cb19f6833fd5543b161ffab0"`);
    await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "REL_042cb19f6833fd5543b161ffab"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "profileId"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "profileUser"`);
    await queryRunner.query(`ALTER TABLE "priceRecords" DROP COLUMN "playerName"`);
    await queryRunner.query(`ALTER TABLE "priceRecords" DROP COLUMN "islandName"`);
    await queryRunner.query(`ALTER TABLE "priceRecords" DROP COLUMN "swCode"`);
    await queryRunner.query(`ALTER TABLE "priceRecords" ADD "localTimeOffsetMinutes" text`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "priceRecords" DROP COLUMN "localTimeOffsetMinutes"`);
    await queryRunner.query(`ALTER TABLE "priceRecords" ADD "swCode" text`);
    await queryRunner.query(`ALTER TABLE "priceRecords" ADD "islandName" text NOT NULL`);
    await queryRunner.query(`ALTER TABLE "priceRecords" ADD "playerName" text NOT NULL`);
    await queryRunner.query(`ALTER TABLE "users" ADD "profileUser" uuid`);
    await queryRunner.query(`ALTER TABLE "users" ADD "profileId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "REL_042cb19f6833fd5543b161ffab" UNIQUE ("profileId", "profileUser")`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_042cb19f6833fd5543b161ffab0" FOREIGN KEY ("profileId", "profileUser") REFERENCES "profiles"("id","userId") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
