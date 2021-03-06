const db = require("../database/db-config");

module.exports = {
  add,
  getAll,
  getAllById,
  getById,
  update,
  remove,
};

function add(project) {
  return db("projects").insert(project, "id");
  // .then(() => getAll());
}

function getAll() {
  return db("projects")
    .select(
      "id",
      "project_name",
      "project_description",
      "project_funding",
      "funded",
      "user_id"
    )
    .orderBy("user_id");
}

function getAllById(user_id) {
  return db("projects")
    .select(
      "id",
      "project_name",
      "project_description",
      "project_funding",
      "funded",
      "user_id"
    )
    .where({ user_id });
}

function getById(id) {
  return db("projects").where({ id }).first();
}

function update(changes, id) {
  return db("projects")
    .where({ id })
    .update(changes)
    .then((count) => (count > 0 ? this.findById(id) : null));
}

function remove(id) {
  return db("projects")
    .where({ id })
    .del()
    .then(() => getAll());
}
