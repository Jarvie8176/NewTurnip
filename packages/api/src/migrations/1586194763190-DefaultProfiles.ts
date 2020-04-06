import { MigrationInterface, QueryRunner } from "typeorm";

export class DefaultProfiles1586194763190 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `insert into profiles ("userId", settings) (select id as "userId", '{}' as settings from users where id not in (select "userId" from profiles))`
    );
  }

  public async down(_queryRunner: QueryRunner): Promise<any> {
    return;
  }
}
