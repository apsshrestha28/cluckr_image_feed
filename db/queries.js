const knex = require("./client")

module.exports = {

  index() {
    return knex.select().table('clucks').orderBy('created_at','desc')
  },

  create(cluck) {
    return knex("clucks").insert(cluck, "*")
  },

  
}