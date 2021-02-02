import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersTable1611636352595 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "username",
            type: "varchar",
            isNullable: false,
            isUnique: true,
          },
          {
            name: "password",
            type: "varchar",
            isNullable: false,
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.dropTable("users");
  }
}
