import { createConnection } from 'typeorm';
import { SnakeNamingStrategy } from '../snakeNamingStrategy';
// import { QueryLogger } from '../services/queryLogger';

export let connect = async () => {
  const connection = await createConnection({
    type: 'sqlite',
    database: 'database.db',
    name: 'default',
    namingStrategy: new SnakeNamingStrategy(),
    synchronize: false,
    logging: true,
    migrationsTableName: 'custom_migration_table',
    entities: [__dirname + '/models/*.ts'],
    migrations: [__dirname + '/migrations/*.ts'],
    cli: {
      entitiesDir: __dirname + '/models/',
      migrationsDir: __dirname + '/migrations/',
    },
  });
};
