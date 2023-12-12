exports.up = knex => knex.schema.createTable("movie_tags", table => {
  table.increments("id");
  table.text("name");

  table.integer("note_id").references("movie_notes.id").notNullable().onDelete("CASCADE");
  table.integer("user_id").references("users.id").notNullable();
});

exports.down = knex => knex.schema.dropTable("movie_tags");