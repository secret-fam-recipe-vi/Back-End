// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './src/data/users.db3'
    },
    useNullAsDefault: true, 
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done);
      },
    },
    migrations: {
      directory: './src/data/migrations'
    },
    seeds: {
      directory: './src/data/seeds'
    },
  },

  // production: {
  //   client: 'sqlite3',
  //   connection: process.env.DATABASE_URL,
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   },
  //   migrations: {
  //     directory: './src/data/migrations'
  //   },
  //   seeds: {
  //     directory: './src/data/seeds'
  //   }
  // }
};
