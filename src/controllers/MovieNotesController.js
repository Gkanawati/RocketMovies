const AppError = require('../utils/AppError');

const knex = require("../database/knex");

class MovieNotesController {
  async index(req, res) {
    // lista de acordo com o filtro recebido, pode ser por title, user_id ou tags

    const { title, user_id, tags } = req.query;

    console.log(req.query);

    let movie_notes;

    if(tags) {
      const filterTags = tags.split(',').map(tag => tag.trim());

      movie_notes = await knex("movie_notes")
        .where("movie_notes.user_id", user_id)
        .whereLike("title", `%${title}%`)
        .whereIn("movie_tags.name", filterTags)
        .innerJoin("movie_tags", "movie_tags.movie_note_id", "movie_notes.id")
        .orderBy("title");
    } else {
      movie_notes = await knex("movie_notes")
        .where({ user_id })
        .whereLike("title", `%${title}%`)
        .orderBy("title");
    }

    const userTags = await knex("movie_tags").where({ user_id });

    const notesWithTags = movie_notes.map(movie_note => {
      const noteTags = userTags.filter(tag => tag.movie_note_id === movie_note.id);

      return {
        ...movie_note,
        tags: noteTags
      }
    });

    res.status(200).json(notesWithTags);
  }

  async show(req, res) {
    const { id } = req.params;

    const movie_note = await knex("movie_notes")
      .select("*")
      .where("id", id)
      .first();

    if (!movie_note) {
      throw new AppError("Nota não encontrada.");
    }

    const movie_tags = await knex("movie_tags")
      .where("movie_note_id", id)
      .orderBy("name");
     
    res.status(200).json({
      ...movie_note,
      movie_tags
    });
  }

  async create(req, res) {
    const { title, description, rating, tags } = req.body;

    const { user_id } = req.params;

    const [ movie_note_id ] = await knex("movie_notes")
      .insert({
        title, 
        description,
        rating,
        user_id
      });

    const tagsInsert = tags.map(name => {
      return {
        movie_note_id,
        name,
        user_id
      }
    });

    await knex("movie_tags").insert(tagsInsert);

    res.status(201).json();
  }

  async delete(req, res) {
    const { id } = req.params;

    await knex("movie_notes").where({ id }).delete();

    res.json();
  }
}

module.exports = MovieNotesController;
