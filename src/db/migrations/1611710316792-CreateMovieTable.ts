import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateMovieTable1611549039739 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: "movies",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "title",
            type: "varchar",
            isNullable: false,
            isUnique: true,
          },
          {
            name: "plot_summary",
            type: "text",
            isNullable: false,
          },
          {
            name: "duration",
            type: "integer",
            isNullable: false,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "last_updated",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "created_by_user_id",
            type: "integer",
            isNullable: false,
          },
          {
            name: "last_updated_user_id",
            type: "integer",
            isNullable: false,
          },
        ],
      }),
      true
    );

    await queryRunner.createForeignKey(
      "movies",
      new TableForeignKey({
        columnNames: ["created_by_user_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "CASCADE",
      })
    );

    await queryRunner.createForeignKey(
      "movies",
      new TableForeignKey({
        columnNames: ["last_updated_user_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    return await queryRunner.dropTable("movies");
  }
}
