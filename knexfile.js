module.exports = {

  development: {
    client: 'pg', 
    connection: {
      database: 'cluckr-lists',
      username: "aleena",
      password: "planet"
    },
    migrations: { 
      tableName: "knex-migrations",
      directory: 'db/migrations'
    }
  },
};
