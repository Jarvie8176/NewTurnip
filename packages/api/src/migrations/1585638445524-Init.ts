import {MigrationInterface, QueryRunner} from "typeorm";

export class Init1585638445524 implements MigrationInterface {
    name = 'Init1585638445524'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "profiles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "settings" jsonb NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "REL_315ecd98bd1a42dcf2ec4e2e98" UNIQUE ("userId"), CONSTRAINT "PK_0d28f355dbc74ba11b28e08734e" PRIMARY KEY ("id", "userId"))`, undefined);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" text NOT NULL, "password" text NOT NULL, "email" text NOT NULL, "profileId" uuid, "profileUser" uuid, CONSTRAINT "REL_042cb19f6833fd5543b161ffab" UNIQUE ("profileId", "profileUser"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "priceRecords" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "playerName" text NOT NULL, "islandName" text NOT NULL, "swCode" text, "price" numeric NOT NULL, "reportedAt" TIMESTAMP NOT NULL, "reportedById" uuid, CONSTRAINT "PK_3f2a07ec5c4ba2b439745e95755" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "profiles" ADD CONSTRAINT "FK_315ecd98bd1a42dcf2ec4e2e985" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_042cb19f6833fd5543b161ffab0" FOREIGN KEY ("profileId", "profileUser") REFERENCES "profiles"("id","userId") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "priceRecords" ADD CONSTRAINT "FK_9d0b139ff1b6df7219a18eebf22" FOREIGN KEY ("reportedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "priceRecords" DROP CONSTRAINT "FK_9d0b139ff1b6df7219a18eebf22"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_042cb19f6833fd5543b161ffab0"`, undefined);
        await queryRunner.query(`ALTER TABLE "profiles" DROP CONSTRAINT "FK_315ecd98bd1a42dcf2ec4e2e985"`, undefined);
        await queryRunner.query(`DROP TABLE "priceRecords"`, undefined);
        await queryRunner.query(`DROP TABLE "users"`, undefined);
        await queryRunner.query(`DROP TABLE "profiles"`, undefined);
    }

}
