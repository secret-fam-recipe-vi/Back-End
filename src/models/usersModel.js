const db = require('../data/dbConfig.js');

// this file contains functions on how we interact with users table.

module.exports = {
    add, 
    findBy,
    findById
}


function findBy(filter) {
    return db("users").where(filter);
  }
  
  async function add(user) {
    const [id] = await db("users").insert(user, "id");
  
    return findById(id);
  }
  
  function findById(id) {
    return db("users").where({ id }).first();
  }

