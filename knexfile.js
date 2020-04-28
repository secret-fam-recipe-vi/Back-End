module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './src/data/users.db3'
    },
    useNullAsDefault: true, 
    migrations: {
      directory: './src/data/migrations'
    },
    seeds: {
      directory: './src/data/seeds'
    },
  },

  // db connection for testing
  testing: {
    client: "sqlite3",
    connection: {
      filename: './src/data/test.db3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './src/data/migrations',
    },
    seeds: {
      directory: './src/data/seeds',
    },
  },

  // Heroku will look for a 'production' configuration
  production: {
    client: "pg", // npm i pg
    connection: process.env.DATABASE_URL, // provided by Heroku
    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
  },

};
