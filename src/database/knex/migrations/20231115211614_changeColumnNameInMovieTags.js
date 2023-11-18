exports.up = function (knex) {
  return knex.schema.table("movie_tags", function (table) {
    table.renameColumn("note_id", "movie_note_id");
  });
};

exports.down = function (knex) {
  return knex.schema.table("movie_tags", function (table) {
    table.renameColumn("movie_note_id", "note_id");
  });
};
